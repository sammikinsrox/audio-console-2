let ctx = null;
let chain = null;
const captured         = new WeakSet(); // successfully captured via createMediaElementSource
const capturedFallback = new WeakSet(); // successfully captured via captureStream
const hasPlayListener  = new WeakSet(); // play listener already attached
const observedRoots    = new WeakSet(); // shadow roots already being observed
let analyserTimer = null;

// Inject into page context to set crossOrigin='anonymous' before src is assigned.
// Firefox only — on Chrome/Edge, injector.js (world:"MAIN") already did this.
// getBrowserInfo is a Firefox-exclusive API; its absence means Chrome/Edge.
if (typeof browser.runtime.getBrowserInfo === 'function') {
  (function injectEarlyCapture() {
    try {
      const s = document.createElement('script');
      s.textContent = `(function(){
        const orig = Document.prototype.createElement;
        Document.prototype.createElement = function(tag, opts) {
          const el = orig.call(this, tag, opts);
          if (typeof tag === 'string' && /^(audio|video)$/i.test(tag)) {
            try { el.crossOrigin = 'anonymous'; } catch(_) {}
            window.dispatchEvent(new CustomEvent('__ffac_el'));
          }
          return el;
        };
      })();`;
      (document.head || document.documentElement).appendChild(s);
      s.remove();
    } catch(_) {}
  })();
}

const params = {
  fader: 1.0, pan: 0, mute: false,
  gate:         { enabled: false, threshold: -40,  attack: 0.001, hold: 0.05, release: 0.1 },
  expander:     { enabled: false, threshold: -40,  ratio: 2, attack: 0.001, release: 0.1 },
  compressor:   { enabled: false, threshold: -24,  knee: 30, ratio: 12, attack: 0.003, release: 0.25, makeupGain: 0 },
  tapeSat:      { enabled: false, drive: 2,         warmth: 0.5, mix: 0.5 },
  distortion:   { enabled: false, amount: 50,       mode: 0, mix: 1.0 },
  delay:        { enabled: false, time: 0.25,       feedback: 0.3, mix: 0.3 },
  reverb:       { enabled: false, size: 2,          decay: 0.5, mix: 0.3 },
  chorus:       { enabled: false, rate: 1.5,        depth: 3, mix: 0.5 },
  flanger:      { enabled: false, rate: 0.5,        depth: 3, feedback: 0.7, mix: 0.5 },
  phaser:       { enabled: false, rate: 0.5,        depth: 1.0, feedback: 0.5, mix: 0.5 },
  vibrato:      { enabled: false, rate: 5,          depth: 3 },
  tremolo:      { enabled: false, rate: 4,          depth: 0.8, shape: 0 },
  stereoImager: { enabled: false, width: 1.0 },
  limiter:      { enabled: false, threshold: -1, attack: 0.0001, release: 0.1 },
  eq: {
    enabled: false,
    bands: [
      { type: 'lowshelf',  freq: 100,   gain: 0, q: 0.707, enabled: true },
      { type: 'peaking',   freq: 500,   gain: 0, q: 1.4,   enabled: true },
      { type: 'peaking',   freq: 2000,  gain: 0, q: 1.4,   enabled: true },
      { type: 'peaking',   freq: 6000,  gain: 0, q: 1.4,   enabled: true },
      { type: 'highshelf', freq: 10000, gain: 0, q: 0.707, enabled: true },
    ]
  }
};

function generateIR(audioCtx, size, decay) {
  const len = Math.floor(audioCtx.sampleRate * size);
  const buf = audioCtx.createBuffer(2, len, audioCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay * 4 + 0.5);
    }
  }
  return buf;
}

async function init() {
  if (ctx) return;
  ctx = new AudioContext({ latencyHint: 'interactive' });
  // Chrome's autoplay policy keeps the context suspended until a user gesture.
  // Resume on any interaction so audio flows even if the video was already playing
  // when the content script connected it.
  const resumeCtx = () => { if (ctx.state === 'suspended') ctx.resume().catch(() => {}); };
  document.addEventListener('click',       resumeCtx, { capture: true });
  document.addEventListener('keydown',     resumeCtx, { capture: true });
  document.addEventListener('pointerdown', resumeCtx, { capture: true });

  const workletNames = ['gate','expander','tapeSat','distortion','chorus','flanger','phaser','vibrato','tremolo','stereoImager','limiter'];
  let workletsOk = false;
  try {
    await Promise.all(workletNames.map(n =>
      ctx.audioWorklet.addModule(browser.runtime.getURL(`worklets/${n}.js`))
    ));
    workletsOk = true;
  } catch (_) {
    // Page CSP may block moz-extension:// worker-src; fall back to GainNode
    // pass-throughs so fader/pan/EQ/dynamics still work without effects.
  }

  const mkWorklet = (name, opts) => workletsOk
    ? new AudioWorkletNode(ctx, `${name}-processor`, opts)
    : ctx.createGain();

  const inputGain     = ctx.createGain();
  const gate          = mkWorklet('gate');
  const expander      = mkWorklet('expander');
  const compressor    = ctx.createDynamicsCompressor();
  const compMakeup    = ctx.createGain();
  const tapeSat       = mkWorklet('tape-sat');
  const distortion    = mkWorklet('distortion');

  // Delay wet/dry
  const delayNode   = ctx.createDelay(5.0);
  const delayFB     = ctx.createGain();
  const delayWet    = ctx.createGain();
  const delayDry    = ctx.createGain();
  const delayBus    = ctx.createGain();
  delayDry.gain.value = 1; delayWet.gain.value = 0; delayFB.gain.value = 0;
  delayNode.delayTime.value = 0.25;

  // Reverb wet/dry
  const convolver  = ctx.createConvolver();
  const reverbWet  = ctx.createGain();
  const reverbDry  = ctx.createGain();
  const reverbBus  = ctx.createGain();
  convolver.buffer = generateIR(ctx, 2, 0.5);
  reverbDry.gain.value = 1; reverbWet.gain.value = 0;

  const chorus      = mkWorklet('chorus');
  const flanger     = mkWorklet('flanger');
  const phaser      = mkWorklet('phaser');
  const vibrato     = mkWorklet('vibrato');
  const tremolo     = mkWorklet('tremolo');
  const stereoImg   = mkWorklet('stereo-imager', {
    numberOfInputs: 1, numberOfOutputs: 1,
    outputChannelCount: [2], channelCount: 2, channelCountMode: 'explicit'
  });
  // Parametric EQ (5 bands)
  const eq0 = ctx.createBiquadFilter(); eq0.type = 'lowshelf';
  const eq1 = ctx.createBiquadFilter(); eq1.type = 'peaking';
  const eq2 = ctx.createBiquadFilter(); eq2.type = 'peaking';
  const eq3 = ctx.createBiquadFilter(); eq3.type = 'peaking';
  const eq4 = ctx.createBiquadFilter(); eq4.type = 'highshelf';
  [eq0,eq1,eq2,eq3,eq4].forEach(n => { n.gain.value = 0; });

  const panner      = ctx.createStereoPanner();
  const fader       = ctx.createGain();
  const limiter     = mkWorklet('limiter', {
    numberOfInputs: 1, numberOfOutputs: 1,
    outputChannelCount: [2], channelCount: 2, channelCountMode: 'explicit'
  });
  const analyser    = ctx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.8;

  const corrSplitter  = ctx.createChannelSplitter(2);
  const corrAnalyserL = ctx.createAnalyser();
  const corrAnalyserR = ctx.createAnalyser();
  corrAnalyserL.fftSize = corrAnalyserR.fftSize = 512;
  corrAnalyserL.smoothingTimeConstant = corrAnalyserR.smoothingTimeConstant = 0;

  // Wire chain
  inputGain.connect(gate);
  gate.connect(expander);
  expander.connect(compressor);
  compressor.connect(compMakeup);
  compMakeup.connect(tapeSat);
  tapeSat.connect(distortion);

  distortion.connect(eq0);
  eq0.connect(eq1); eq1.connect(eq2); eq2.connect(eq3); eq3.connect(eq4);
  eq4.connect(delayDry);
  eq4.connect(delayNode);
  delayNode.connect(delayFB);
  delayFB.connect(delayNode);
  delayNode.connect(delayWet);
  delayDry.connect(delayBus);
  delayWet.connect(delayBus);

  delayBus.connect(reverbDry);
  delayBus.connect(convolver);
  convolver.connect(reverbWet);
  reverbDry.connect(reverbBus);
  reverbWet.connect(reverbBus);

  reverbBus.connect(chorus);
  chorus.connect(flanger);
  flanger.connect(phaser);
  phaser.connect(vibrato);
  vibrato.connect(tremolo);
  tremolo.connect(stereoImg);
  stereoImg.connect(panner);
  panner.connect(fader);
  fader.connect(limiter);
  limiter.connect(analyser);
  analyser.connect(ctx.destination);

  limiter.connect(corrSplitter);
  corrSplitter.connect(corrAnalyserL, 0);
  corrSplitter.connect(corrAnalyserR, 1);

  chain = {
    inputGain, gate, expander, compressor, compMakeup, tapeSat, distortion,
    eq: [eq0, eq1, eq2, eq3, eq4],
    delayNode, delayFB, delayWet, delayDry, delayBus,
    convolver, reverbWet, reverbDry, reverbBus,
    chorus, flanger, phaser, vibrato, tremolo, stereoImg,
    panner, fader, limiter, analyser,
    corrAnalyserL, corrAnalyserR,
    gateGr: 1, expanderGr: 0, limiterGr: 0
  };

  if (workletsOk) {
    gate.port.onmessage     = e => { if (e.data.type === 'gr') chain.gateGr     = e.data.gain; };
    expander.port.onmessage = e => { if (e.data.type === 'gr') chain.expanderGr = e.data.gainDb; };
    limiter.port.onmessage  = e => { if (e.data.type === 'gr') chain.limiterGr  = e.data.gainDb; };
  }

  applyAll();

  const fftData  = new Float32Array(analyser.frequencyBinCount);
  const timeData = new Float32Array(analyser.fftSize);
  const corrBufL = new Float32Array(512);
  const corrBufR = new Float32Array(512);

  // BS.1770 K-weighting filter coefficients (sample-rate dependent)
  const sr = ctx.sampleRate;
  const A1 = Math.pow(10, 3.9993 / 40);
  const w1 = 2 * Math.PI * 1681.97 / sr, c1 = Math.cos(w1), s1 = Math.sin(w1);
  const al1 = s1 * Math.SQRT1_2, sq1 = 2 * Math.sqrt(A1) * al1, pa0 = (A1+1)-(A1-1)*c1+sq1;
  const kwPre = {
    b0: A1*((A1+1)+(A1-1)*c1+sq1)/pa0, b1: -2*A1*((A1-1)+(A1+1)*c1)/pa0,
    b2: A1*((A1+1)+(A1-1)*c1-sq1)/pa0, a1: 2*((A1-1)-(A1+1)*c1)/pa0,
    a2: ((A1+1)-(A1-1)*c1-sq1)/pa0
  };
  const w2 = 2 * Math.PI * 38.135 / sr, c2 = Math.cos(w2), s2 = Math.sin(w2);
  const al2 = s2 * Math.SQRT1_2, ra0 = 1 + al2;
  const kwRlb = {
    b0: (1+c2)/(2*ra0), b1: -(1+c2)/ra0, b2: (1+c2)/(2*ra0),
    a1: -2*c2/ra0, a2: (1-al2)/ra0
  };
  // Filter states and 3-second rolling LUFS window (~70 blocks at 50 ms each)
  let p1z1=0, p1z2=0, p2z1=0, p2z2=0;
  const LUFS_WINDOW = Math.round(3000 / 50); // 60 slots
  const lufsRing = new Float64Array(LUFS_WINDOW); // circular buffer of block mean-squares
  let lufsHead = 0, lufsFilled = 0;

  analyserTimer = setInterval(() => {
    analyser.getFloatFrequencyData(fftData);
    analyser.getFloatTimeDomainData(timeData);
    let peak = 0, truePeak = 0, rmsSum = 0, kwMs = 0;
    for (let i = 0; i < timeData.length; i++) {
      const a = Math.abs(timeData[i]);
      if (a > peak) peak = a;
      if (a > truePeak) truePeak = a;
      // 4× linear interpolation oversampling for inter-sample peak detection
      if (i < timeData.length - 1) {
        const s = timeData[i], e2 = timeData[i + 1];
        const t1 = Math.abs(s + (e2 - s) * 0.25);
        const t2 = Math.abs(s + (e2 - s) * 0.5);
        const t3 = Math.abs(s + (e2 - s) * 0.75);
        if (t1 > truePeak) truePeak = t1;
        if (t2 > truePeak) truePeak = t2;
        if (t3 > truePeak) truePeak = t3;
      }
      rmsSum += a * a;
      // K-weighting stage 1 (pre-filter)
      const x = timeData[i];
      const y1 = kwPre.b0*x + p1z1;
      p1z1 = kwPre.b1*x - kwPre.a1*y1 + p1z2;
      p1z2 = kwPre.b2*x - kwPre.a2*y1;
      // K-weighting stage 2 (RLB high-pass)
      const y2 = kwRlb.b0*y1 + p2z1;
      p2z1 = kwRlb.b1*y1 - kwRlb.a1*y2 + p2z2;
      p2z2 = kwRlb.b2*y1 - kwRlb.a2*y2;
      kwMs += y2 * y2;
    }
    kwMs /= timeData.length;
    const rms = Math.sqrt(rmsSum / timeData.length);

    // Phase correlation
    chain.corrAnalyserL.getFloatTimeDomainData(corrBufL);
    chain.corrAnalyserR.getFloatTimeDomainData(corrBufR);
    let sumLR = 0, sumL2 = 0, sumR2 = 0;
    for (let i = 0; i < corrBufL.length; i++) {
      sumLR += corrBufL[i] * corrBufR[i];
      sumL2 += corrBufL[i] * corrBufL[i];
      sumR2 += corrBufR[i] * corrBufR[i];
    }
    const corrDenom = Math.sqrt(sumL2 * sumR2);
    const correlation = corrDenom > 1e-10 ? Math.max(-1, Math.min(1, sumLR / corrDenom)) : 1;

    // Rolling 3-second window: store block ms, evict oldest slot
    lufsRing[lufsHead] = kwMs;
    lufsHead = (lufsHead + 1) % LUFS_WINDOW;
    if (lufsFilled < LUFS_WINDOW) lufsFilled++;

    // Gated average over window (-70 LUFS gate)
    let acc = 0, n = 0;
    for (let i = 0; i < lufsFilled; i++) {
      const ms = lufsRing[i];
      if (ms > 1e-10 && (-0.691 + 10 * Math.log10(ms)) > -70) { acc += ms; n++; }
    }
    const lufs = n > 0 ? Math.max(-60, -0.691 + 10 * Math.log10(acc / n)) : null;

    try {
      browser.runtime.sendMessage({
        type: 'ANALYSER_DATA',
        fft: Array.from(fftData), peak, truePeak, rms, lufs,
        hasAudio: true,
        ctxState: ctx.state,
        correlation,
        gateGr:     chain.gateGr,
        expanderGr: chain.expanderGr,
        compGr:     chain.compressor.reduction ?? 0,
        limiterGr:  chain.limiterGr ?? 0
      }).catch(() => {});
    } catch (_) {
      // Extension context invalidated (page still open after extension reload).
      // Stop the timer — a fresh content script will be injected on next navigation.
      clearInterval(analyserTimer);
      analyserTimer = null;
    }
  }, 50);
}

function setWParam(node, name, value) {
  const p = node.parameters?.get(name);
  if (p) p.value = value;
}

function applyAll() {
  if (!chain) return;
  const { gate, expander, compressor, compMakeup, tapeSat, distortion,
    delayNode, delayFB, delayWet, delayDry,
    convolver, reverbWet, reverbDry,
    chorus, flanger, phaser, vibrato, tremolo, stereoImg,
    panner, fader, limiter } = chain;

  const faderGain = v => v <= 1.0 ? v : Math.pow(10, (v - 1.0) * 2.4);
  fader.gain.value   = params.mute ? 0 : faderGain(params.fader) * faderGain(params.masterFader ?? 1.0);
  panner.pan.value   = params.pan;

  const e = v => v ? 1 : 0;

  // Gate
  setWParam(gate, 'enabled',   e(params.gate.enabled));
  setWParam(gate, 'threshold', params.gate.threshold);
  setWParam(gate, 'attack',    params.gate.attack);
  setWParam(gate, 'hold',      params.gate.hold);
  setWParam(gate, 'release',   params.gate.release);

  // Expander
  setWParam(expander, 'enabled',   e(params.expander.enabled));
  setWParam(expander, 'threshold', params.expander.threshold);
  setWParam(expander, 'ratio',     params.expander.ratio);
  setWParam(expander, 'attack',    params.expander.attack);
  setWParam(expander, 'release',   params.expander.release);

  // Compressor (DynamicsCompressorNode)
  if (params.compressor.enabled) {
    compressor.threshold.value = params.compressor.threshold;
    compressor.knee.value      = params.compressor.knee;
    compressor.ratio.value     = params.compressor.ratio;
    compressor.attack.value    = params.compressor.attack;
    compressor.release.value   = params.compressor.release;
    compMakeup.gain.value      = Math.pow(10, params.compressor.makeupGain / 20);
  } else {
    compressor.threshold.value = 0;
    compressor.ratio.value     = 1;
    compMakeup.gain.value      = 1;
  }

  // Tape Sat
  setWParam(tapeSat, 'enabled', e(params.tapeSat.enabled));
  setWParam(tapeSat, 'drive',   params.tapeSat.drive);
  setWParam(tapeSat, 'warmth',  params.tapeSat.warmth);
  setWParam(tapeSat, 'mix',     params.tapeSat.mix);

  // Distortion
  setWParam(distortion, 'enabled', e(params.distortion.enabled));
  setWParam(distortion, 'amount',  params.distortion.amount);
  setWParam(distortion, 'mode',    params.distortion.mode);
  setWParam(distortion, 'mix',     params.distortion.mix);

  // Delay
  delayNode.delayTime.value = params.delay.time;
  delayFB.gain.value        = params.delay.enabled ? params.delay.feedback : 0;
  delayWet.gain.value       = params.delay.enabled ? params.delay.mix : 0;
  delayDry.gain.value       = 1;

  // Reverb
  reverbWet.gain.value = params.reverb.enabled ? params.reverb.mix : 0;
  reverbDry.gain.value = 1;

  // Chorus
  setWParam(chorus, 'enabled', e(params.chorus.enabled));
  setWParam(chorus, 'rate',    params.chorus.rate);
  setWParam(chorus, 'depth',   params.chorus.depth);
  setWParam(chorus, 'mix',     params.chorus.mix);

  // Flanger
  setWParam(flanger, 'enabled',  e(params.flanger.enabled));
  setWParam(flanger, 'rate',     params.flanger.rate);
  setWParam(flanger, 'depth',    params.flanger.depth);
  setWParam(flanger, 'feedback', params.flanger.feedback);
  setWParam(flanger, 'mix',      params.flanger.mix);

  // Phaser
  setWParam(phaser, 'enabled',  e(params.phaser.enabled));
  setWParam(phaser, 'rate',     params.phaser.rate);
  setWParam(phaser, 'depth',    params.phaser.depth);
  setWParam(phaser, 'feedback', params.phaser.feedback);
  setWParam(phaser, 'mix',      params.phaser.mix);

  // Vibrato
  setWParam(vibrato, 'enabled', e(params.vibrato.enabled));
  setWParam(vibrato, 'rate',    params.vibrato.rate);
  setWParam(vibrato, 'depth',   params.vibrato.depth);

  // Tremolo
  setWParam(tremolo, 'enabled', e(params.tremolo.enabled));
  setWParam(tremolo, 'rate',    params.tremolo.rate);
  setWParam(tremolo, 'depth',   params.tremolo.depth);
  setWParam(tremolo, 'shape',   params.tremolo.shape);

  // Stereo Imager
  setWParam(stereoImg, 'enabled', e(params.stereoImager.enabled));
  setWParam(stereoImg, 'width',   params.stereoImager.width);

  // Limiter
  setWParam(limiter, 'enabled',   e(params.limiter.enabled));
  setWParam(limiter, 'threshold', params.limiter.threshold);
  setWParam(limiter, 'attack',    params.limiter.attack);
  setWParam(limiter, 'release',   params.limiter.release);

  // Parametric EQ
  if (chain.eq) {
    params.eq.bands.forEach((band, i) => {
      const node = chain.eq[i];
      if (!node) return;
      node.type            = band.type;
      node.frequency.value = Math.max(20, Math.min(ctx.sampleRate / 2 - 1, band.freq));
      node.Q.value         = Math.max(0.0001, band.q);
      node.gain.value      = (params.eq.enabled && band.enabled) ? band.gain : 0;
    });
  }
}

function setPath(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
  cur[parts[parts.length - 1]] = value;
}

// Attempt to route el through our chain. Never pre-marks as captured so a
// failed attempt is always retried (e.g. on the next play event).
function captureEl(el) {
  if (captured.has(el) || capturedFallback.has(el)) return;
  if (!ctx || !chain) return;

  // Only set crossOrigin before src is assigned. Setting it after src loads forces
  // a reload in CORS mode, which disrupts players like Jellyfin that manage their
  // own media lifecycle (direct-play HTTP src or MSE). Same-origin media works
  // with createMediaElementSource regardless of crossOrigin.
  if (!el.currentSrc) el.crossOrigin = 'anonymous';

  // Preferred: reroutes the element's output exclusively through Web Audio.
  try {
    const src = ctx.createMediaElementSource(el);
    src.connect(chain.inputGain);
    captured.add(el);
    try { ctx.resume().catch(() => {}); } catch (_) {}
    try { browser.runtime.sendMessage({ type: 'TAB_READY', hasMedia: true }).catch(() => {}); } catch (_) {}
    return;
  } catch (_) {}

  // Fallback: mirror output via captureStream and mute the element's direct
  // output so audio is only heard through our effects chain.
  try {
    const streamFn = el.captureStream?.bind(el) ?? el.mozCaptureStream?.bind(el);
    if (!streamFn) return;
    const stream = streamFn();
    const src = ctx.createMediaStreamSource(stream);
    src.connect(chain.inputGain);
    el.muted = true;
    capturedFallback.add(el);
    try { ctx.resume().catch(() => {}); } catch (_) {}
    try { browser.runtime.sendMessage({ type: 'TAB_READY', hasMedia: true }).catch(() => {}); } catch (_) {}
  } catch (_) {}
}

// Attach a play listener (once) and immediately attempt capture.
function processEl(el) {
  if (!hasPlayListener.has(el)) {
    hasPlayListener.add(el);
    el.addEventListener('play', () => {
      if (ctx?.state === 'suspended') ctx.resume();
      // Retry capture on every play in case earlier attempts failed.
      if (!captured.has(el) && !capturedFallback.has(el)) {
        init().then(() => captureEl(el));
      }
    });
  }
  if (ctx && chain) captureEl(el);
}

// Scan a root (document or shadow root) for media elements, then recurse into
// any shadow roots found, observing each one for future mutations.
function scanDeep(root) {
  root.querySelectorAll('audio, video').forEach(processEl);
  root.querySelectorAll('*').forEach(el => {
    if (el.shadowRoot && !observedRoots.has(el.shadowRoot)) {
      observedRoots.add(el.shadowRoot);
      observer.observe(el.shadowRoot, { childList: true, subtree: true });
      scanDeep(el.shadowRoot);
    }
  });
}

async function scan() {
  if (!document.querySelector('audio, video')) return;
  await init();
  scanDeep(document);
  browser.runtime.sendMessage({ type: 'TAB_READY', hasMedia: true }).catch(() => {});
}

function handleMutations(muts) {
  for (const m of muts) {
    for (const node of m.addedNodes) {
      if (node.nodeType !== 1) continue;
      if (node.matches?.('audio,video')) {
        init().then(() => processEl(node));
      }
      node.querySelectorAll?.('audio,video').forEach(el => {
        init().then(() => processEl(el));
      });
      // Watch any shadow roots that just appeared.
      const checkShadow = el => {
        if (el.shadowRoot && !observedRoots.has(el.shadowRoot)) {
          observedRoots.add(el.shadowRoot);
          observer.observe(el.shadowRoot, { childList: true, subtree: true });
          init().then(() => scanDeep(el.shadowRoot));
        }
      };
      checkShadow(node);
      node.querySelectorAll?.('*').forEach(checkShadow);
    }
  }
}

const observer = new MutationObserver(handleMutations);
observer.observe(document.documentElement, { childList: true, subtree: true });

// Re-scan when the page-context patcher reports a new media element was created.
// By the time this fires the element may already be in the DOM.
window.addEventListener('__ffac_el', () => {
  if (ctx && chain) scanDeep(document);
});

// Periodic safety net — catches anything missed by the above (e.g. elements
// injected by scripts that bypass createElement, or late-loading iframes).
setInterval(() => {
  if (ctx && chain) scanDeep(document);
}, 2000);

browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'SET_PARAM') {
    setPath(params, msg.path, msg.value);
    applyAll();
  }
  if (msg.type === 'SET_PARAMS') {
    Object.assign(params, msg.params);
    applyAll();
  }
  if (msg.type === 'UPDATE_REVERB_IR') {
    if (chain) chain.convolver.buffer = generateIR(ctx, msg.size, msg.decay);
  }
  if (msg.type === 'RESUME_CONTEXT') {
    ctx?.resume();
  }
  if (msg.type === 'GET_PARAMS') {
    return Promise.resolve(params);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scan);
} else {
  scan();
}
