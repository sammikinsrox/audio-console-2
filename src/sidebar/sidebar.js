// ── EFFECT DEFINITIONS ───────────────────────────────────────────────────────

const EFFECTS = {
  gate: {
    label: 'GATE',
    params: [
      { key: 'threshold', label: 'Threshold', min: -80,   max: 0,    step: 0.5,  unit: 'dB',  def: -40 },
      { key: 'attack',    label: 'Attack',    min: 0.1,   max: 500,  step: 0.1,  unit: 'ms',  def: 1,   scale: 'ms' },
      { key: 'hold',      label: 'Hold',      min: 0,     max: 1000, step: 1,    unit: 'ms',  def: 50,  scale: 'ms' },
      { key: 'release',   label: 'Release',   min: 1,     max: 2000, step: 1,    unit: 'ms',  def: 100, scale: 'ms' }
    ]
  },
  expander: {
    label: 'EXPANDER',
    params: [
      { key: 'threshold', label: 'Threshold', min: -80, max: 0,    step: 0.5, unit: 'dB',  def: -40 },
      { key: 'ratio',     label: 'Ratio',     min: 1,   max: 20,   step: 0.1, unit: ':1',  def: 2 },
      { key: 'attack',    label: 'Attack',    min: 0.1, max: 500,  step: 0.1, unit: 'ms',  def: 1,   scale: 'ms' },
      { key: 'release',   label: 'Release',   min: 1,   max: 2000, step: 1,   unit: 'ms',  def: 100, scale: 'ms' }
    ]
  },
  compressor: {
    label: 'COMPRESSOR',
    params: [
      { key: 'threshold',  label: 'Threshold',  min: -60, max: 0,    step: 0.5, unit: 'dB',  def: -24 },
      { key: 'knee',       label: 'Knee',       min: 0,   max: 40,   step: 0.5, unit: 'dB',  def: 30 },
      { key: 'ratio',      label: 'Ratio',      min: 1,   max: 20,   step: 0.1, unit: ':1',  def: 12 },
      { key: 'attack',     label: 'Attack',     min: 0.1, max: 500,  step: 0.1, unit: 'ms',  def: 3,   scale: 'ms' },
      { key: 'release',    label: 'Release',    min: 10,  max: 3000, step: 1,   unit: 'ms',  def: 250, scale: 'ms' },
      { key: 'makeupGain', label: 'Makeup',     min: 0,   max: 20,   step: 0.5, unit: 'dB',  def: 0 }
    ]
  },
  tapeSat: {
    label: 'TAPE SAT',
    params: [
      { key: 'drive',  label: 'Drive',  min: 1,   max: 10,  step: 0.1, unit: 'x',  def: 2 },
      { key: 'warmth', label: 'Warmth', min: 0,   max: 100, step: 1,   unit: '%',  def: 50, scale: 'pct' },
      { key: 'mix',    label: 'Mix',    min: 0,   max: 100, step: 1,   unit: '%',  def: 50, scale: 'pct' }
    ]
  },
  distortion: {
    label: 'DISTORTION',
    params: [
      { key: 'amount', label: 'Amount', min: 0,   max: 400, step: 1, unit: '',   def: 50 },
      { key: 'mix',    label: 'Mix',    min: 0,   max: 100, step: 1, unit: '%',  def: 100, scale: 'pct' },
      { key: 'mode',   label: 'Mode',   type: 'mode', options: ['OVERDRIVE','DISTORTION'], def: 0 }
    ]
  },
  delay: {
    label: 'DELAY',
    params: [
      { key: 'time',     label: 'Time',     min: 0,   max: 2000, step: 1,   unit: 'ms', def: 250, scale: 'ms' },
      { key: 'feedback', label: 'Feedback', min: 0,   max: 95,   step: 1,   unit: '%',  def: 30,  scale: 'pct' },
      { key: 'mix',      label: 'Mix',      min: 0,   max: 100,  step: 1,   unit: '%',  def: 30,  scale: 'pct' }
    ]
  },
  reverb: {
    label: 'REVERB',
    params: [
      { key: 'size',  label: 'Size',  min: 0.1, max: 10,  step: 0.1, unit: 's',  def: 2 },
      { key: 'decay', label: 'Decay', min: 0,   max: 100, step: 1,   unit: '%',  def: 50, scale: 'pct' },
      { key: 'mix',   label: 'Mix',   min: 0,   max: 100, step: 1,   unit: '%',  def: 30, scale: 'pct' }
    ]
  },
  chorus: {
    label: 'CHORUS',
    params: [
      { key: 'rate',  label: 'Rate',  min: 0.1, max: 10,  step: 0.1, unit: 'Hz', def: 1.5 },
      { key: 'depth', label: 'Depth', min: 0,   max: 20,  step: 0.1, unit: 'ms', def: 3 },
      { key: 'mix',   label: 'Mix',   min: 0,   max: 100, step: 1,   unit: '%',  def: 50, scale: 'pct' }
    ]
  },
  flanger: {
    label: 'FLANGER',
    params: [
      { key: 'rate',     label: 'Rate',     min: 0.01, max: 5,   step: 0.01, unit: 'Hz', def: 0.5 },
      { key: 'depth',    label: 'Depth',    min: 0,    max: 10,  step: 0.1,  unit: 'ms', def: 3 },
      { key: 'feedback', label: 'Feedback', min: -99,  max: 99,  step: 1,    unit: '%',  def: 70, scale: 'pct' },
      { key: 'mix',      label: 'Mix',      min: 0,    max: 100, step: 1,    unit: '%',  def: 50, scale: 'pct' }
    ]
  },
  phaser: {
    label: 'PHASER',
    params: [
      { key: 'rate',     label: 'Rate',     min: 0.01, max: 10,  step: 0.01, unit: 'Hz', def: 0.5 },
      { key: 'depth',    label: 'Depth',    min: 0,    max: 100, step: 1,    unit: '%',  def: 100, scale: 'pct' },
      { key: 'feedback', label: 'Feedback', min: 0,    max: 99,  step: 1,    unit: '%',  def: 50,  scale: 'pct' },
      { key: 'mix',      label: 'Mix',      min: 0,    max: 100, step: 1,    unit: '%',  def: 50,  scale: 'pct' }
    ]
  },
  vibrato: {
    label: 'VIBRATO',
    params: [
      { key: 'rate',  label: 'Rate',  min: 0.1, max: 20, step: 0.1, unit: 'Hz', def: 5 },
      { key: 'depth', label: 'Depth', min: 0,   max: 20, step: 0.1, unit: 'ms', def: 3 }
    ]
  },
  tremolo: {
    label: 'TREMOLO',
    params: [
      { key: 'rate',  label: 'Rate',  min: 0.1, max: 20,  step: 0.1, unit: 'Hz', def: 4 },
      { key: 'depth', label: 'Depth', min: 0,   max: 100, step: 1,   unit: '%',  def: 80, scale: 'pct' },
      { key: 'shape', label: 'Shape', type: 'mode', options: ['SINE','SQUARE'], def: 0 }
    ]
  },
  limiter: {
    label: 'LIMITER',
    params: [
      { key: 'threshold', label: 'Ceiling', min: -20,  max: 0,    step: 0.1,  unit: 'dB', def: -1 },
      { key: 'attack',    label: 'Attack',  min: 0.01, max: 5,    step: 0.01, unit: 'ms', def: 0.1, scale: 'ms' },
      { key: 'release',   label: 'Release', min: 10,   max: 2000, step: 1,    unit: 'ms', def: 100, scale: 'ms' }
    ]
  },
};
// stereoImager is controlled directly via the WIDTH slider on the channel strip

const DELAY_SUBDIVISIONS = [
  { label: '1/16', mult: 0.25 },
  { label: '1/8',  mult: 0.5  },
  { label: '1/8·', mult: 0.75 },
  { label: '1/4',  mult: 1.0  },
  { label: '1/4·', mult: 1.5  },
  { label: '1/2',  mult: 2.0  },
  { label: '1/1',  mult: 4.0  },
];

const EFFECT_ORDER = ['gate','expander','compressor','tapeSat','distortion','eq','delay','reverb','chorus','flanger','phaser','vibrato','tremolo','limiter'];

const EFFECT_SHORT = {
  gate: 'GATE', expander: 'EXP', compressor: 'COMP', tapeSat: 'TAPE',
  distortion: 'DIST', eq: 'EQ', delay: 'DLY', reverb: 'VERB', chorus: 'CHO',
  flanger: 'FLG', phaser: 'PHS', vibrato: 'VIB', tremolo: 'TRM',
  limiter: 'LMT'
};

// ── PRESETS ──────────────────────────────────────────────────────────────────

const PRESETS = {
  gate: [
    { name: 'Subtle',    params: { threshold: -55, attack: 0.005, hold: 0.1,  release: 0.3   } },
    { name: 'Moderate',  params: { threshold: -40, attack: 0.002, hold: 0.05, release: 0.15  } },
    { name: 'Tight',     params: { threshold: -30, attack: 0.001, hold: 0.02, release: 0.08  } },
    { name: 'Hard Gate', params: { threshold: -20, attack: 0.001, hold: 0.01, release: 0.04  } }
  ],
  expander: [
    { name: 'Gentle',   params: { threshold: -50, ratio: 1.5, attack: 0.005, release: 0.2  } },
    { name: 'Moderate', params: { threshold: -40, ratio: 2,   attack: 0.002, release: 0.15 } },
    { name: 'Strong',   params: { threshold: -35, ratio: 4,   attack: 0.001, release: 0.1  } }
  ],
  compressor: [
    { name: 'Gentle',   params: { threshold: -20, knee: 30, ratio: 2,  attack: 0.02,  release: 0.3,  makeupGain: 2  } },
    { name: 'Moderate', params: { threshold: -24, knee: 20, ratio: 4,  attack: 0.01,  release: 0.25, makeupGain: 4  } },
    { name: 'Heavy',    params: { threshold: -30, knee: 10, ratio: 8,  attack: 0.005, release: 0.2,  makeupGain: 8  } },
    { name: 'Limiter',  params: { threshold: -6,  knee: 0,  ratio: 20, attack: 0.001, release: 0.05, makeupGain: 0  } },
    { name: 'Vocal',    params: { threshold: -20, knee: 15, ratio: 3,  attack: 0.008, release: 0.2,  makeupGain: 3  } },
    { name: 'Drum Bus', params: { threshold: -18, knee: 5,  ratio: 6,  attack: 0.003, release: 0.12, makeupGain: 5  } }
  ],
  tapeSat: [
    { name: 'Subtle',   params: { drive: 1.5, warmth: 0.3, mix: 0.3  } },
    { name: 'Warm',     params: { drive: 3,   warmth: 0.6, mix: 0.5  } },
    { name: 'Hot',      params: { drive: 6,   warmth: 0.8, mix: 0.7  } },
    { name: 'Saturate', params: { drive: 10,  warmth: 1.0, mix: 0.9  } }
  ],
  distortion: [
    { name: 'Light OD',  params: { amount: 30,  mode: 0, mix: 0.6  } },
    { name: 'Heavy OD',  params: { amount: 120, mode: 0, mix: 1.0  } },
    { name: 'Crunch',    params: { amount: 160, mode: 1, mix: 0.85 } },
    { name: 'Fuzz',      params: { amount: 320, mode: 1, mix: 1.0  } }
  ],
  delay: [
    { name: 'Slapback',    params: { time: 0.08,  feedback: 0.1,  mix: 0.25 } },
    { name: 'Short Echo',  params: { time: 0.2,   feedback: 0.3,  mix: 0.3  } },
    { name: 'Medium Echo', params: { time: 0.375, feedback: 0.4,  mix: 0.35 } },
    { name: 'Long Echo',   params: { time: 0.75,  feedback: 0.5,  mix: 0.4  } },
    { name: 'Ambient',     params: { time: 1.0,   feedback: 0.65, mix: 0.45 } }
  ],
  reverb: [
    { name: 'Room',      params: { size: 0.5, decay: 0.3,  mix: 0.2  } },
    { name: 'Small Hall',params: { size: 1.5, decay: 0.5,  mix: 0.25 } },
    { name: 'Hall',      params: { size: 3,   decay: 0.6,  mix: 0.3  } },
    { name: 'Plate',     params: { size: 2,   decay: 0.7,  mix: 0.35 } },
    { name: 'Chamber',   params: { size: 1.2, decay: 0.45, mix: 0.25 } },
    { name: 'Cathedral', params: { size: 8,   decay: 0.8,  mix: 0.4  } }
  ],
  chorus: [
    { name: 'Subtle',  params: { rate: 0.8, depth: 1.5, mix: 0.3  } },
    { name: 'Classic', params: { rate: 1.5, depth: 3,   mix: 0.5  } },
    { name: 'Lush',    params: { rate: 2.5, depth: 5,   mix: 0.6  } },
    { name: 'Thick',   params: { rate: 0.5, depth: 8,   mix: 0.7  } }
  ],
  flanger: [
    { name: 'Gentle',  params: { rate: 0.3, depth: 1.5, feedback: 0.4,  mix: 0.4  } },
    { name: 'Classic', params: { rate: 0.5, depth: 3,   feedback: 0.7,  mix: 0.5  } },
    { name: 'Jet',     params: { rate: 1.0, depth: 6,   feedback: 0.85, mix: 0.6  } },
    { name: 'Extreme', params: { rate: 2.0, depth: 9,   feedback: 0.95, mix: 0.7  } }
  ],
  phaser: [
    { name: 'Slow',    params: { rate: 0.2,  depth: 0.7, feedback: 0.4, mix: 0.5 } },
    { name: 'Classic', params: { rate: 0.5,  depth: 1.0, feedback: 0.5, mix: 0.5 } },
    { name: 'Fast',    params: { rate: 2.0,  depth: 0.8, feedback: 0.6, mix: 0.5 } },
    { name: 'Vintage', params: { rate: 0.35, depth: 0.9, feedback: 0.7, mix: 0.6 } }
  ],
  vibrato: [
    { name: 'Subtle',   params: { rate: 3,  depth: 1  } },
    { name: 'Classic',  params: { rate: 5,  depth: 3  } },
    { name: 'Dramatic', params: { rate: 8,  depth: 8  } },
    { name: 'Seasick',  params: { rate: 2,  depth: 15 } }
  ],
  tremolo: [
    { name: 'Slow Sine',  params: { rate: 2,  depth: 0.6, shape: 0 } },
    { name: 'Fast Sine',  params: { rate: 8,  depth: 0.8, shape: 0 } },
    { name: 'Choppy',     params: { rate: 4,  depth: 0.9, shape: 1 } },
    { name: 'Stutter',    params: { rate: 12, depth: 1.0, shape: 1 } }
  ],
  limiter: [
    { name: 'Transparent', params: { threshold: -0.1, attack: 0.0001, release: 0.05  } },
    { name: 'Standard',    params: { threshold: -1,   attack: 0.0001, release: 0.1   } },
    { name: 'Hard',        params: { threshold: -3,   attack: 0.0001, release: 0.15  } },
    { name: 'Loud',        params: { threshold: -6,   attack: 0.0001, release: 0.2   } }
  ]
};

// ── HELPERS ──────────────────────────────────────────────────────────────────

function defaultParams() {
  return {
    fader: 1.0, pan: 0, mute: false, solo: false,
    gate:         { enabled: false, threshold: -40,  attack: 0.001, hold: 0.05,  release: 0.1   },
    expander:     { enabled: false, threshold: -40,  ratio: 2,      attack: 0.001, release: 0.1 },
    compressor:   { enabled: false, threshold: -24,  knee: 30,      ratio: 12, attack: 0.003, release: 0.25, makeupGain: 0 },
    tapeSat:      { enabled: false, drive: 2,        warmth: 0.5,   mix: 0.5 },
    distortion:   { enabled: false, amount: 50,      mode: 0,       mix: 1.0 },
    delay:        { enabled: false, time: 0.25,      feedback: 0.3, mix: 0.3 },
    reverb:       { enabled: false, size: 2,         decay: 0.5,    mix: 0.3 },
    chorus:       { enabled: false, rate: 1.5,       depth: 3,      mix: 0.5 },
    flanger:      { enabled: false, rate: 0.5,       depth: 3,      feedback: 0.7, mix: 0.5 },
    phaser:       { enabled: false, rate: 0.5,       depth: 1.0,    feedback: 0.5, mix: 0.5 },
    vibrato:      { enabled: false, rate: 5,         depth: 3 },
    tremolo:      { enabled: false, rate: 4,         depth: 0.8,    shape: 0 },
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
}

function toInternal(pd, uiVal) {
  if (pd.scale === 'ms')  return uiVal / 1000;
  if (pd.scale === 'pct') return uiVal / 100;
  return uiVal;
}
function toUI(pd, internalVal) {
  if (pd.scale === 'ms')  return internalVal * 1000;
  if (pd.scale === 'pct') return internalVal * 100;
  return internalVal;
}
function formatVal(pd, uiVal) {
  if (pd.type === 'mode') return pd.options[Math.round(uiVal)];
  const dp = pd.step < 1 ? String(pd.step).split('.')[1]?.length || 0 : 0;
  return `${uiVal.toFixed(dp)}${pd.unit}`;
}

// ── PARAMETRIC EQ ─────────────────────────────────────────────────────────────

const EQ_SR   = 48000;
const EQ_FMIN = 20;
const EQ_FMAX = 20000;
const EQ_GMIN = -18;
const EQ_GMAX = 18;
// Canvas geometry (must match #eq-canvas width/height attributes)
const EQ_CW = 620, EQ_CH = 220;
const EQ_ML = 36, EQ_MR = 10, EQ_MT = 10, EQ_MB = 26;
const EQ_DW = EQ_CW - EQ_ML - EQ_MR;   // 574
const EQ_DH = EQ_CH - EQ_MT - EQ_MB;   // 184

const EQ_COLORS     = ['#4488ff','#22ddaa','#d4870a','#ff8833','#cc44bb'];
const EQ_COLORS_RGB = [[68,136,255],[34,221,170],[212,135,10],[255,136,51],[204,68,187]];

// ── THEME ACCENT HELPERS ─────────────────────────────────────────────────────
let _accentHex = '#d4870a';
let _accentRgb = [212, 135, 10];
let _accentDimHex = '#7a4d08';
function accentHex()       { return _accentHex; }
function accentDimHex()    { return _accentDimHex; }
function accentRgba(a)     { const [r,g,b] = _accentRgb; return `rgba(${r},${g},${b},${a})`; }
function _setAccentGlobals(hex, dimHex) {
  _accentHex    = hex;
  _accentDimHex = dimHex;
  _accentRgb    = [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
}

// ── THEMES ───────────────────────────────────────────────────────────────────
const THEMES = {
  obsidian: {
    label: 'OBSIDIAN', swatch: '#d4870a',
    vars: {
      '--bg':'#07070a','--bg-deep':'#040406',
      '--surface':'#111116','--surface-dim':'#0c0c12','--surface-header':'#0d0d12',
      '--surface-raise':'#1a1a22','--surface-high':'#222230',
      '--border':'#30304a','--border-bright':'#505072',
      '--accent':'#d4870a','--accent-hi':'#f0a020','--accent-dim':'#7a4d08',
      '--text':'#eaeaf8','--text-dim':'#9090b8','--text-faint':'#5a5a82',
    }
  },
  slate: {
    label: 'SLATE', swatch: '#4488ff',
    vars: {
      '--bg':'#060a10','--bg-deep':'#040609',
      '--surface':'#0f1520','--surface-dim':'#0b1018','--surface-header':'#0c1219',
      '--surface-raise':'#162030','--surface-high':'#1d2d3f',
      '--border':'#223244','--border-bright':'#384e64',
      '--accent':'#4488ff','--accent-hi':'#6aaaff','--accent-dim':'#1a3d80',
      '--text':'#e8f0fc','--text-dim':'#7e96b8','--text-faint':'#466070',
    }
  },
  emerald: {
    label: 'EMERALD', swatch: '#00cc88',
    vars: {
      '--bg':'#060a08','--bg-deep':'#040705',
      '--surface':'#0e1511','--surface-dim':'#0a0f0d','--surface-header':'#0b1210',
      '--surface-raise':'#162019','--surface-high':'#1c2b21',
      '--border':'#213428','--border-bright':'#35503e',
      '--accent':'#00cc88','--accent-hi':'#22e8a4','--accent-dim':'#007048',
      '--text':'#e8f8f2','--text-dim':'#7eaa98','--text-faint':'#466055',
    }
  },
  crimson: {
    label: 'CRIMSON', swatch: '#e03050',
    vars: {
      '--bg':'#0a0707','--bg-deep':'#070404',
      '--surface':'#160d0e','--surface-dim':'#10090a','--surface-header':'#11090b',
      '--surface-raise':'#1e1214','--surface-high':'#271819',
      '--border':'#391e20','--border-bright':'#562c30',
      '--accent':'#e03050','--accent-hi':'#ff5070','--accent-dim':'#801828',
      '--text':'#f8eaec','--text-dim':'#b58890','--text-faint':'#784e55',
    }
  },
  amber: {
    label: 'AMBER', swatch: '#ffb020',
    vars: {
      '--bg':'#090800','--bg-deep':'#060500',
      '--surface':'#141000','--surface-dim':'#0e0b00','--surface-header':'#100e00',
      '--surface-raise':'#1e1a00','--surface-high':'#272000',
      '--border':'#3a2d00','--border-bright':'#564300',
      '--accent':'#ffb020','--accent-hi':'#ffd060','--accent-dim':'#8a5e00',
      '--text':'#f8f4e8','--text-dim':'#b5a878','--text-faint':'#786840',
    }
  },
  frost: {
    label: 'FROST', swatch: '#38c8e8',
    vars: {
      '--bg':'#06090e','--bg-deep':'#040609',
      '--surface':'#0e1620','--surface-dim':'#0a1018','--surface-header':'#0c1219',
      '--surface-raise':'#132030','--surface-high':'#192838',
      '--border':'#1e3040','--border-bright':'#2c4458',
      '--accent':'#38c8e8','--accent-hi':'#60e0ff','--accent-dim':'#186878',
      '--text':'#e8f4fc','--text-dim':'#7aabbd','--text-faint':'#426070',
    }
  },
  graphite: {
    label: 'GRAPHITE', swatch: '#b0b0b0',
    vars: {
      '--bg':'#080808','--bg-deep':'#050505',
      '--surface':'#101010','--surface-dim':'#0d0d0d','--surface-header':'#0f0f0f',
      '--surface-raise':'#191919','--surface-high':'#232323',
      '--border':'#2c2c2c','--border-bright':'#404040',
      '--accent':'#b0b0b0','--accent-hi':'#e8e8e8','--accent-dim':'#686868',
      '--text':'#f0f0f0','--text-dim':'#909090','--text-faint':'#565656',
    }
  },
  solar: {
    label: 'SOLAR', swatch: '#c86010',
    vars: {
      '--bg':'#ede9e2','--bg-deep':'#e2ddd5',
      '--surface':'#f8f5ef','--surface-dim':'#eee9e1','--surface-header':'#ece7df',
      '--surface-raise':'#ffffff','--surface-high':'#ffffff',
      '--border':'#cdc8be','--border-bright':'#b0aa9e',
      '--accent':'#c86010','--accent-hi':'#e87820','--accent-dim':'#7a3808',
      '--text':'#1a1814','--text-dim':'#5a5248','--text-faint':'#8e8880',
    }
  },
  joker: {
    label: 'JOKER', swatch: '#22e840',
    vars: {
      '--bg':'#080510','--bg-deep':'#050208',
      '--surface':'#100818','--surface-dim':'#0d0614','--surface-header':'#0e0716',
      '--surface-raise':'#180e28','--surface-high':'#201234',
      '--border':'#301848','--border-bright':'#482460',
      '--accent':'#22e840','--accent-hi':'#50ff60','--accent-dim':'#106820',
      '--text':'#ede8fc','--text-dim':'#9a88b8','--text-faint':'#5e4e78',
    }
  }
};
const EQ_BAND_LABELS = ['LF SHELF','LOW MID','MID','HI MID','HF SHELF'];

function fmtFreq(f) {
  if (f >= 1000) return (f / 1000).toFixed(f >= 10000 ? 0 : 1) + 'k';
  return Math.round(f) + '';
}
function fmtGain(g) { return (g >= 0 ? '+' : '') + g.toFixed(1); }
function fmtQ(q)     { return q.toFixed(2); }

function eqFreqToX(f) {
  return EQ_ML + EQ_DW * Math.log10(f / EQ_FMIN) / Math.log10(EQ_FMAX / EQ_FMIN);
}
function eqXToFreq(x) {
  return EQ_FMIN * Math.pow(EQ_FMAX / EQ_FMIN, Math.max(0, Math.min(1, (x - EQ_ML) / EQ_DW)));
}
function eqGainToY(g) {
  return EQ_MT + EQ_DH * (1 - (g - EQ_GMIN) / (EQ_GMAX - EQ_GMIN));
}

// Biquad filter magnitude response in dB (Audio EQ Cookbook, S=1 shelf slope)
function biquadMagDb(type, freq, gainDb, q, testFreq) {
  const f0  = Math.max(1, Math.min(EQ_SR / 2 - 1, freq));
  const w0  = 2 * Math.PI * f0 / EQ_SR;
  const A   = Math.pow(10, gainDb / 40);
  const cw0 = Math.cos(w0), sw0 = Math.sin(w0);
  let b0, b1, b2, a0, a1, a2;

  if (type === 'peaking') {
    const al = sw0 / (2 * Math.max(0.0001, q));
    b0=1+al*A; b1=-2*cw0; b2=1-al*A;
    a0=1+al/A; a1=-2*cw0; a2=1-al/A;
  } else if (type === 'lowshelf') {
    const al = sw0 * Math.SQRT1_2;           // sin(w0)/sqrt(2), shelf slope S=1
    const s2  = 2 * Math.sqrt(A) * al;
    b0=A*((A+1)-(A-1)*cw0+s2); b1=2*A*((A-1)-(A+1)*cw0); b2=A*((A+1)-(A-1)*cw0-s2);
    a0=(A+1)+(A-1)*cw0+s2;     a1=-2*((A-1)+(A+1)*cw0);   a2=(A+1)+(A-1)*cw0-s2;
  } else if (type === 'highshelf') {
    const al = sw0 * Math.SQRT1_2;
    const s2  = 2 * Math.sqrt(A) * al;
    b0=A*((A+1)+(A-1)*cw0+s2); b1=-2*A*((A-1)+(A+1)*cw0); b2=A*((A+1)+(A-1)*cw0-s2);
    a0=(A+1)-(A-1)*cw0+s2;     a1=2*((A-1)-(A+1)*cw0);     a2=(A+1)-(A-1)*cw0-s2;
  } else { return 0; }

  b0/=a0; b1/=a0; b2/=a0; a1/=a0; a2/=a0;
  const w  = 2 * Math.PI * Math.max(1, testFreq) / EQ_SR;
  const cw = Math.cos(w), sw = Math.sin(w);
  const c2w = 2*cw*cw-1, s2w = 2*sw*cw;
  const reN=b0+b1*cw+b2*c2w, imN=-(b1*sw+b2*s2w);
  const reD=1+a1*cw+a2*c2w,  imD=-(a1*sw+a2*s2w);
  const mag = Math.sqrt((reN*reN+imN*imN) / Math.max(1e-20, reD*reD+imD*imD));
  return 20 * Math.log10(Math.max(1e-10, mag));
}

// Draggable/scrollable parameter display widget
function bindDragVal(el, getVal, setVal, opts) {
  let sy, sv;
  const onMove = e2 => {
    const dy = sy - e2.clientY;
    const nv = opts.log
      ? sv * Math.pow(10, dy * Math.log10(opts.max / opts.min) / 180)
      : sv + dy * (opts.max - opts.min) / 120;
    const c = Math.max(opts.min, Math.min(opts.max, nv));
    setVal(c); el.textContent = opts.fmt(c);
  };
  const onUp = () => {
    el.classList.remove('dragging');
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  };
  el.addEventListener('mousedown', e => {
    sy = e.clientY; sv = getVal();
    el.classList.add('dragging');
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    e.preventDefault(); e.stopPropagation();
  });
  el.addEventListener('wheel', e => {
    const cv = getVal();
    const nv = opts.log
      ? cv * Math.pow(10, -e.deltaY * Math.log10(opts.max / opts.min) / 800)
      : cv - e.deltaY * (opts.max - opts.min) / 400;
    const c = Math.max(opts.min, Math.min(opts.max, nv));
    setVal(c); el.textContent = opts.fmt(c);
    e.preventDefault();
  }, { passive: false });
}

class ParametricEQ {
  constructor(canvas, bands, onChange, isLight = () => false) {
    this.canvas       = canvas;
    this.bands        = bands;
    this.onChange     = onChange;
    this.isLight      = isLight;
    this.g            = canvas.getContext('2d');
    this.hovered      = -1;
    this.dragging     = -1;
    this.spectrumData = null;
    this._sx = 0; this._sy = 0; this._sf = 0; this._sg = 0;
    this._bindEvents();
    this.draw();
  }

  setSpectrum(fft) { this.spectrumData = fft; }

  draw() {
    const { g, canvas } = this;
    const W = canvas.width, H = canvas.height;
    g.clearRect(0, 0, W, H);
    this._drawBg(g, W, H);
    this._drawGrid(g);
    this._drawSpectrum(g);
    this._drawBandCurves(g);
    this._drawCombinedCurve(g);
    this._drawNodes(g);
    this._drawLabels(g);
    const tip = this.dragging >= 0 ? this.dragging : this.hovered;
    if (tip >= 0) this._drawTooltip(g, tip);
  }

  _drawBg(g, W, H) {
    if (this.isLight()) {
      const bg = g.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#f0ebe3'); bg.addColorStop(1, '#e8e3db');
      g.fillStyle = bg; g.fillRect(0, 0, W, H);
      g.fillStyle = 'rgba(0,0,0,0.025)';
    } else {
      const bg = g.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#07070f'); bg.addColorStop(1, '#040409');
      g.fillStyle = bg; g.fillRect(0, 0, W, H);
      g.fillStyle = 'rgba(0,0,0,0.06)';
    }
    for (let y = EQ_MT; y < EQ_MT + EQ_DH; y += 4) g.fillRect(EQ_ML, y, EQ_DW, 2);
  }

  _drawGrid(g) {
    const light = this.isLight();
    const dBs   = [-18,-12,-9,-6,-3,0,3,6,9,12,18];
    const freqs = [20,50,100,200,500,1000,2000,5000,10000,20000];
    for (const db of dBs) {
      const y = eqGainToY(db);
      if (y < EQ_MT - 1 || y > EQ_MT + EQ_DH + 1) continue;
      g.beginPath(); g.moveTo(EQ_ML, y); g.lineTo(EQ_ML + EQ_DW, y);
      g.strokeStyle = db === 0 ? (light ? '#b0a898' : '#28285a') : (light ? '#d4cfc6' : '#131328');
      g.lineWidth   = db === 0 ? 1.5 : 1;
      g.stroke();
    }
    for (const f of freqs) {
      const x = eqFreqToX(f);
      if (x < EQ_ML || x > EQ_ML + EQ_DW) continue;
      g.beginPath(); g.moveTo(x, EQ_MT); g.lineTo(x, EQ_MT + EQ_DH);
      g.strokeStyle = light ? '#d4cfc6' : '#131328'; g.lineWidth = 1; g.stroke();
    }
    g.strokeStyle = light ? '#c4bfb6' : '#1e1e3c'; g.lineWidth = 1;
    g.strokeRect(EQ_ML, EQ_MT, EQ_DW, EQ_DH);
  }

  _drawSpectrum(g) {
    if (!this.spectrumData) return;
    const fft   = this.spectrumData;
    const len   = fft.length;
    const nyq   = EQ_SR / 2;
    const floor = EQ_MT + EQ_DH;
    const light = this.isLight();

    // Build one y value per pixel column using the EQ's log frequency scale
    const pts = [];
    for (let xi = 0; xi <= EQ_DW; xi++) {
      const f   = eqXToFreq(EQ_ML + xi);
      const bin = Math.max(0, Math.min(len - 1, Math.round((f / nyq) * len)));
      const db  = fft[bin];
      if (db < -130) { pts.push(null); continue; }
      const norm = Math.max(0, Math.min(1, (db + 90) / 80));
      pts.push(EQ_MT + EQ_DH - norm * EQ_DH);
    }

    // Filled area beneath the signal curve
    g.beginPath();
    g.moveTo(EQ_ML, floor);
    for (let i = 0; i <= EQ_DW; i++)
      g.lineTo(EQ_ML + i, pts[i] !== null ? pts[i] : floor);
    g.lineTo(EQ_ML + EQ_DW, floor);
    g.closePath();
    const grad = g.createLinearGradient(0, EQ_MT, 0, floor);
    grad.addColorStop(0,   light ? 'rgba(31,184,106,0.12)' : 'rgba(31,184,106,0.20)');
    grad.addColorStop(0.7, light ? 'rgba(31,184,106,0.04)' : 'rgba(31,184,106,0.06)');
    grad.addColorStop(1,   'rgba(31,184,106,0.0)');
    g.fillStyle = grad;
    g.fill();

    // Crisp edge line along the top of the signal
    g.beginPath();
    let first = true;
    for (let i = 0; i <= EQ_DW; i++) {
      const y = pts[i];
      if (y === null) { first = true; continue; }
      if (first) { g.moveTo(EQ_ML + i, y); first = false; } else g.lineTo(EQ_ML + i, y);
    }
    g.strokeStyle = light ? 'rgba(20,150,80,0.28)' : 'rgba(31,184,106,0.50)';
    g.lineWidth = 1;
    g.stroke();
  }

  _drawBandCurves(g) {
    for (let bi = 0; bi < this.bands.length; bi++) {
      const band = this.bands[bi];
      if (!band.enabled || Math.abs(band.gain) < 0.05) continue;
      const [r, gv, b] = EQ_COLORS_RGB[bi];
      g.beginPath();
      let first = true;
      for (let xi = 0; xi <= EQ_DW; xi++) {
        const db = biquadMagDb(band.type, band.freq, band.gain, band.q, eqXToFreq(EQ_ML + xi));
        const y  = Math.max(EQ_MT, Math.min(EQ_MT + EQ_DH, eqGainToY(db)));
        if (first) { g.moveTo(EQ_ML + xi, y); first = false; } else g.lineTo(EQ_ML + xi, y);
      }
      g.strokeStyle = `rgba(${r},${gv},${b},0.22)`; g.lineWidth = 1; g.stroke();
    }
  }

  _drawCombinedCurve(g) {
    const pts = [];
    for (let xi = 0; xi <= EQ_DW; xi++) {
      const f = eqXToFreq(EQ_ML + xi);
      let totalDb = 0;
      for (const band of this.bands)
        if (band.enabled) totalDb += biquadMagDb(band.type, band.freq, band.gain, band.q, f);
      pts.push({ x: EQ_ML + xi, y: Math.max(EQ_MT, Math.min(EQ_MT + EQ_DH, eqGainToY(totalDb))) });
    }
    if (pts.length < 2) return;

    const zY = Math.max(EQ_MT, Math.min(EQ_MT + EQ_DH, eqGainToY(0)));
    // Fill
    g.beginPath();
    g.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) g.lineTo(pts[i].x, pts[i].y);
    g.lineTo(pts[pts.length-1].x, zY); g.lineTo(pts[0].x, zY); g.closePath();
    const fg = g.createLinearGradient(0, EQ_MT, 0, EQ_MT + EQ_DH);
    fg.addColorStop(0,   accentRgba(0.2));
    fg.addColorStop(0.5, accentRgba(0.05));
    fg.addColorStop(1,   accentRgba(0.0));
    g.fillStyle = fg; g.fill();
    // Line
    g.beginPath();
    g.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) g.lineTo(pts[i].x, pts[i].y);
    g.strokeStyle = accentHex(); g.lineWidth = 2;
    g.shadowColor = accentHex(); g.shadowBlur = 10; g.stroke(); g.shadowBlur = 0;
  }

  _drawNodes(g) {
    for (let bi = 0; bi < this.bands.length; bi++) {
      const band  = this.bands[bi];
      const x     = eqFreqToX(band.freq);
      const y     = eqGainToY(band.gain);
      const [r, gv, b] = EQ_COLORS_RGB[bi];
      const color = EQ_COLORS[bi];
      const isHov  = this.hovered  === bi;
      const isDrag = this.dragging === bi;
      const rad    = isDrag ? 9 : isHov ? 8 : 7;

      if (band.enabled) {
        g.beginPath(); g.arc(x, y, rad + 7, 0, Math.PI * 2);
        g.fillStyle = `rgba(${r},${gv},${b},0.09)`; g.fill();
      }

      g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2);
      const light = this.isLight();
      if (band.enabled) {
        const rg = g.createRadialGradient(x - rad*0.3, y - rad*0.4, 0, x, y, rad);
        rg.addColorStop(0, `rgba(${Math.min(255,r+80)},${Math.min(255,gv+80)},${Math.min(255,b+80)},1)`);
        rg.addColorStop(1, `rgba(${Math.round(r*0.55)},${Math.round(gv*0.55)},${Math.round(b*0.55)},1)`);
        g.fillStyle    = rg;
        g.shadowColor  = color;
        g.shadowBlur   = isDrag ? 20 : isHov ? 14 : 8;
      } else {
        g.fillStyle = light ? '#ccc8c0' : '#232338'; g.shadowBlur = 0;
      }
      g.fill(); g.shadowBlur = 0;

      g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2);
      g.strokeStyle = band.enabled ? 'rgba(255,255,255,0.35)' : (light ? '#b0a898' : '#303050');
      g.lineWidth = 1; g.stroke();

      g.fillStyle = band.enabled ? (isDrag || isHov ? '#fff' : 'rgba(0,0,0,0.82)') : (light ? '#a09890' : '#484870');
      g.font = 'bold 7px "JetBrains Mono",monospace';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(bi + 1, x, y + 0.5);
      g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    }
  }

  _drawLabels(g) {
    const light  = this.isLight();
    const dBs    = [-18,-12,-6,0,6,12,18];
    const flbls  = [[20,'20'],[50,'50'],[100,'100'],[200,'200'],[500,'500'],
                    [1000,'1k'],[2000,'2k'],[5000,'5k'],[10000,'10k'],[20000,'20k']];
    g.font = '8px "JetBrains Mono",monospace';
    g.textAlign = 'right';
    for (const db of dBs) {
      const y = eqGainToY(db);
      if (y < EQ_MT || y > EQ_MT + EQ_DH) continue;
      g.fillStyle = db === 0 ? (light ? '#8e8880' : '#48489a') : (light ? '#a8a098' : '#28285a');
      g.fillText((db > 0 ? '+' : '') + db, EQ_ML - 4, y + 3);
    }
    g.textAlign = 'center'; g.fillStyle = light ? '#a8a098' : '#2a2a5e';
    for (const [f, lbl] of flbls) {
      const x = eqFreqToX(f);
      if (x < EQ_ML + 8 || x > EQ_ML + EQ_DW - 8) continue;
      g.fillText(lbl, x, EQ_MT + EQ_DH + 17);
    }
    g.textAlign = 'left';
  }

  _drawTooltip(g, bi) {
    const band  = this.bands[bi];
    const nx    = eqFreqToX(band.freq);
    const ny    = eqGainToY(band.gain);
    const color = EQ_COLORS[bi];
    const hasQ  = band.type === 'peaking';
    const W = 72, H = hasQ ? 40 : 30;
    let tx = nx + 13, ty = ny - H - 8;
    if (tx + W > EQ_ML + EQ_DW - 4) tx = nx - W - 13;
    if (ty < EQ_MT + 4) ty = ny + 13;
    const light = this.isLight();
    g.fillStyle = light ? 'rgba(248,244,238,0.97)' : 'rgba(5,5,14,0.95)';
    g.strokeStyle = color; g.lineWidth = 1;
    g.beginPath();
    if (g.roundRect) g.roundRect(tx, ty, W, H, 3); else g.rect(tx, ty, W, H);
    g.fill(); g.stroke();
    g.font = 'bold 8px "JetBrains Mono",monospace'; g.fillStyle = color;
    g.fillText(fmtFreq(band.freq) + ' Hz', tx + 5, ty + 11);
    g.font = '8px "JetBrains Mono",monospace'; g.fillStyle = light ? '#7a7268' : '#8888c0';
    g.fillText(fmtGain(band.gain) + ' dB', tx + 5, ty + 22);
    if (hasQ) g.fillText('Q ' + fmtQ(band.q), tx + 5, ty + 33);
  }

  _hitTest(x, y) {
    for (let bi = 0; bi < this.bands.length; bi++) {
      const nx = eqFreqToX(this.bands[bi].freq);
      const ny = eqGainToY(this.bands[bi].gain);
      if (Math.hypot(x - nx, y - ny) <= 11) return bi;
    }
    return -1;
  }

  _canvasXY(e) {
    const r  = this.canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (this.canvas.width  / r.width),
             y: (e.clientY - r.top)  * (this.canvas.height / r.height) };
  }

  _bindEvents() {
    const c = this.canvas;
    c.addEventListener('mousemove', e => {
      const { x, y } = this._canvasXY(e);
      if (this.dragging >= 0) {
        const dx = x - this._sx, dy = y - this._sy;
        const band = this.bands[this.dragging];
        const t = Math.max(0, Math.min(1, (eqFreqToX(this._sf) + dx - EQ_ML) / EQ_DW));
        band.freq = EQ_FMIN * Math.pow(EQ_FMAX / EQ_FMIN, t);
        band.gain = Math.max(EQ_GMIN, Math.min(EQ_GMAX, this._sg - dy * (EQ_GMAX - EQ_GMIN) / EQ_DH));
        this.onChange(this.dragging, band); this.draw();
      } else {
        const hit = this._hitTest(x, y);
        if (hit !== this.hovered) {
          this.hovered = hit;
          c.style.cursor = hit >= 0 ? 'grab' : 'crosshair';
          this.draw();
        }
      }
    });
    c.addEventListener('mousedown', e => {
      const { x, y } = this._canvasXY(e);
      const hit = this._hitTest(x, y);
      if (hit >= 0) {
        this.dragging = hit; this._sx = x; this._sy = y;
        this._sf = this.bands[hit].freq; this._sg = this.bands[hit].gain;
        c.style.cursor = 'grabbing'; e.preventDefault();
      }
    });
    document.addEventListener('mouseup', () => {
      if (this.dragging >= 0) {
        this.dragging = -1;
        this.canvas.style.cursor = this.hovered >= 0 ? 'grab' : 'crosshair';
        this.draw();
      }
    });
    c.addEventListener('wheel', e => {
      const { x, y } = this._canvasXY(e);
      const hit = this._hitTest(x, y);
      if (hit >= 0 && this.bands[hit].type === 'peaking') {
        const band = this.bands[hit];
        band.q = Math.max(0.1, Math.min(10, band.q * (e.deltaY > 0 ? 1.1 : 0.91)));
        this.onChange(hit, band); this.draw(); e.preventDefault();
      }
    }, { passive: false });
    c.addEventListener('dblclick', e => {
      const { x, y } = this._canvasXY(e);
      const hit = this._hitTest(x, y);
      if (hit >= 0) { this.bands[hit].gain = 0; this.onChange(hit, this.bands[hit]); this.draw(); }
    });
  }
}

// ── KNOB ─────────────────────────────────────────────────────────────────────

class Knob {
  constructor(canvas, opts) {
    this.canvas   = canvas;
    this.ctx2d    = canvas.getContext('2d');
    this.min      = opts.min ?? -1;
    this.max      = opts.max ?? 1;
    this.value    = opts.def ?? 0;
    this.onChange = opts.onChange ?? (() => {});
    this.startA   = Math.PI * 0.75;
    this.endA     = Math.PI * 2.25;
    this._bindEvents();
    this.draw();
  }

  setValue(v) {
    this.value = Math.max(this.min, Math.min(this.max, v));
    this.draw();
  }

  draw() {
    const { ctx2d: g, canvas, min, max, value, startA, endA } = this;
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2, r = Math.min(cx, cy) - 3;
    g.clearRect(0, 0, w, h);

    // Background ring
    g.beginPath(); g.arc(cx, cy, r, startA, endA);
    g.strokeStyle = '#28283c'; g.lineWidth = 3; g.stroke();

    // Center tick
    const midA = (startA + endA) / 2;
    g.beginPath();
    g.moveTo(cx + (r - 5) * Math.cos(midA), cy + (r - 5) * Math.sin(midA));
    g.lineTo(cx + (r + 1) * Math.cos(midA), cy + (r + 1) * Math.sin(midA));
    g.strokeStyle = '#404060'; g.lineWidth = 1; g.stroke();

    // Value arc
    const t  = (value - min) / (max - min);
    const vA = startA + t * (endA - startA);
    g.beginPath(); g.arc(cx, cy, r, startA, vA);
    g.strokeStyle = accentHex(); g.lineWidth = 3; g.stroke();

    // Pointer
    g.beginPath();
    g.moveTo(cx, cy);
    g.lineTo(cx + (r - 4) * Math.cos(vA), cy + (r - 4) * Math.sin(vA));
    g.strokeStyle = '#eaeaf8'; g.lineWidth = 1.5; g.stroke();

    // Hub
    g.beginPath(); g.arc(cx, cy, 4, 0, Math.PI * 2);
    g.fillStyle = '#28283c'; g.fill();
  }

  _bindEvents() {
    let sy, sv;
    this.canvas.addEventListener('mousedown', e => {
      sy = e.clientY; sv = this.value;
      const onMove = e2 => {
        const norm = (this.max - this.min) / 160;
        this.value = Math.max(this.min, Math.min(this.max, sv + (sy - e2.clientY) * norm));
        this.draw(); this.onChange(this.value);
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      e.preventDefault();
    });
    this.canvas.addEventListener('dblclick', () => {
      this.value = (this.min + this.max) / 2;
      this.draw(); this.onChange(this.value);
    });
    this.canvas.addEventListener('wheel', e => {
      this.value = Math.max(this.min, Math.min(this.max, this.value - e.deltaY * (this.max - this.min) * 0.005));
      this.draw(); this.onChange(this.value);
      e.preventDefault();
    }, { passive: false });
  }
}

// ── AUDIO CONSOLE ─────────────────────────────────────────────────────────────

class AudioConsole {
  constructor() {
    this.port         = null;
    this.channels     = new Map();    // tabId -> { info, params, el, knob }
    this.analyserData = new Map();    // tabId -> { fft, peak, rms }
    this.selectedTab  = null;
    this.editorState  = null;         // { tabId, effectKey }
    this.editorCtrls  = new Map();    // paramKey -> { slider, valEl, resetBtn }
    this.soloedTabs   = new Set();
    this.masterFader  = 1.0;
    this.masterPan    = 0;
    this.masterMuted  = false;
    this.specCanvas   = null;
    this.raf          = null;
    this.peakHoldsL    = new Map();   // tabId -> { level, frames } (left)
    this.peakHoldsR    = new Map();   // tabId -> { level, frames } (right)
    this.truePeakHolds = new Map();   // tabId -> { level, frames }
    this._paramMenuState = null;       // { onCommit }
    this.eqTabId  = null;
    this.eqEditor = null;
    this.eqValEls = [];
    this.vizLfoPhase     = 0;         // shared LFO phase for animated effects
    this.vizCanvas       = null;      // ref to #effect-viz-canvas
    this._currentThemeKey = 'obsidian';
    this.channelOrder    = [];        // tabId[] — user-defined display order
    this._dragTabId      = null;      // tabId being dragged
    this.groupData       = {};        // groupId → { name, color }
    this.urlPresets      = {};        // normalizedUrl → params snapshot
    this.customNames     = {};        // normalizedUrl → custom label string
    this.collapsedUrls   = new Set(); // normalizedUrl → collapsed preference
    this._presetTimers   = new Map(); // tabId → debounce timer
    this._irTimers       = new Map(); // tabId → reverb IR regen debounce timer
    this.paramsFetched   = new Set(); // tabIds that have received PARAMS_RESPONSE
    this.clippedChannels = new Set(); // tabIds that have hit 0 dBFS
    this.masterClipped   = false;
    this._dirtyData      = new Set(); // tabIds with fresh analyser data since last frame
    this._masterDirty    = true;      // master meter/spectrum/correlation need redraw
  }

  init() {
    this._connect();
    this._initStorage();
  }

  _connect() {
    this.port = browser.runtime.connect({ name: 'sidebar' });
    this.port.onMessage.addListener(msg => this._onMessage(msg));
    this.port.onDisconnect.addListener(() => {
      // Service worker was killed (Chrome MV3) or extension reloaded.
      // Reconnect after a short delay so the sidebar keeps working.
      this.port = null;
      setTimeout(() => this._connect(), 1000);
    });
  }

  // Safe postMessage — silently drops messages if the port is temporarily down.
  _post(msg) {
    try { this.port?.postMessage(msg); } catch (_) {}
  }

  _initStorage() {
    browser.storage.local.get(['channelOrder', 'urlPresets', 'customNames', 'collapsedUrls']).then(r => {
      if (Array.isArray(r.channelOrder)) {
        // Merge: keep stored relative order only for channels already present, append the rest.
        // Tab IDs are ephemeral (change every session) so stored IDs rarely match current ones;
        // this merge ensures existing channels are never dropped from the order.
        const stored = r.channelOrder;
        const currentIds = new Set(this.channels.keys());
        this.channelOrder = [
          ...stored.filter(id => currentIds.has(id)),
          ...[...currentIds].filter(id => !stored.includes(id))
        ];
        // Re-number any channels that were already rendered before storage resolved
        let n = 1;
        for (const id of this.channelOrder) {
          const ch = this.channels.get(id);
          if (ch) ch.el.querySelector('.ch-num').textContent = n++;
        }
      }
      if (r.urlPresets) {
        this.urlPresets = r.urlPresets;
        // Migrate presets saved by older versions that captured session state.
        for (const p of Object.values(this.urlPresets)) {
          delete p.masterFader; delete p.soloMute; delete p.solo;
        }
        // If _restoreChannelParams already ran (PARAMS_RESPONSE arrived before storage
        // resolved), urlPresets was empty at that point so no preset was applied.
        // Re-apply now for any channel whose URL has a stored preset.
        for (const [tabId, ch] of this.channels) {
          const url = this._normalizeUrl(ch.info.url);
          const preset = url && this.urlPresets[url];
          if (preset) {
            Object.assign(ch.params, preset);
            this._post({ type: 'SET_PARAMS', tabId, params: ch.params });
            ch.el.querySelector('.ch-preset-dot')?.classList.add('has-preset');
            this._syncChannelUi(tabId);
          }
        }
      }
      if (r.customNames)                  this.customNames   = r.customNames;
      if (Array.isArray(r.collapsedUrls)) this.collapsedUrls = new Set(r.collapsedUrls);
    });

    this.vizCanvas  = document.getElementById('effect-viz-canvas');
    this.specCanvas = document.getElementById('spectrum-canvas');
    this._resizeSpectrum();
    window.addEventListener('resize', () => this._resizeSpectrum());

    document.getElementById('btn-activate').addEventListener('click', () => {
      if (this.selectedTab != null) {
        this._post({ type: 'RESUME_CONTEXT', tabId: this.selectedTab });
        this._updateUnlockButton('running'); // optimistic hide
      }
    });

    this._setupMasterStrip();
    this._initEditor();
    this._initEqEditor();
    this._initTheme();
    this._initAbout();
    this._initZoom();
    this._initParamMenu();
    this._loadThemePrefs();
    this._startRaf();
  }

  _initAbout() {
    const logo  = document.getElementById('logo');
    const panel = document.getElementById('about-panel');
    if (!logo || !panel) return;
    try {
      document.getElementById('about-version').textContent =
        'v' + browser.runtime.getManifest().version;
    } catch (_) {}
    logo.addEventListener('click', () => panel.classList.toggle('hidden'));
    logo.title = 'About Audio Console';
    document.getElementById('btn-about-close').addEventListener('click', () => {
      panel.classList.add('hidden');
    });
    // Close on outside click (same pattern as the theme panel)
    document.addEventListener('click', e => {
      if (!panel.contains(e.target) && e.target !== logo)
        panel.classList.add('hidden');
    }, true);
  }

  _setupMasterStrip() {
    const el = document.getElementById('master-strip');
    this._bindFader(el.querySelector('.fader'), null);
    this.masterKnob = null;
    const masterKnob = this._bindKnob(el.querySelector('.pan-knob'), null, v => {
      this.masterPan = v;
      this._applyMasterPan();
    });
    this.masterKnob = masterKnob;
    el.querySelector('.btn-reset-pan').addEventListener('click', e => {
      e.stopPropagation();
      masterKnob?.setValue(0);
      this.masterPan = 0;
      this._applyMasterPan();
    });
    el.querySelector('.btn-reset-fader').addEventListener('click', () => {
      const inp = el.querySelector('.fader');
      inp.value = '1';
      this.masterFader = 1.0;
      this._applyMasterFader();
    });
    el.querySelector('.btn-mute').addEventListener('click', e => {
      this.masterMuted = !this.masterMuted;
      e.currentTarget.classList.toggle('active', this.masterMuted);
      this._applyMasterMute();
    });
    el.addEventListener('click', () => {
      this.selectedTab = null;
      this._masterDirty = true; // master spectrum/correlation source changed
      document.querySelectorAll('.channel-strip').forEach(s => s.classList.remove('selected'));
      el.classList.add('selected');
      this._updateUnlockButton(null);
    });

    const clipLed = el.querySelector('.clip-led');
    if (clipLed) {
      clipLed.addEventListener('click', e => {
        e.stopPropagation();
        clipLed.classList.remove('clipped');
        this.masterClipped = false;
      });
    }

    // Sync master meter canvas buffer height to CSS-rendered height
    const masterMeter = el.querySelector('.meter-canvas');
    if (masterMeter) {
      const ro = new ResizeObserver(() => {
        const h = Math.round(masterMeter.clientHeight);
        if (h > 0 && masterMeter.height !== h) { masterMeter.height = h; this._masterDirty = true; }
      });
      ro.observe(masterMeter);
    }
  }

  _onMessage(msg) {
    if (msg.type === 'TAB_LIST')     this._reconcileTabs(msg.tabs, msg.groups || {});
    if (msg.type === 'PARAMS_RESPONSE') this._restoreChannelParams(msg.tabId, msg.params);
    if (msg.type === 'ANALYSER_DATA') {
      const peakL = msg.peakL ?? msg.peak;
      const peakR = msg.peakR ?? msg.peak;
      this.analyserData.set(msg.tabId, { fft: msg.fft, peak: msg.peak, rms: msg.rms, lufs: msg.lufs ?? null,
        peakL, peakR,
        truePeak: msg.truePeak ?? msg.peak, correlation: msg.correlation ?? 1,
        ctxState: msg.ctxState, gateGr: msg.gateGr ?? 1, expanderGr: msg.expanderGr ?? 0, compGr: msg.compGr ?? 0,
        limiterGr: msg.limiterGr ?? 0 });
      this._updatePeakHolds(msg.tabId, peakL, peakR);
      this._updateTruePeakHold(msg.tabId, msg.truePeak ?? msg.peak);
      this._dirtyData.add(msg.tabId);
      this._masterDirty = true;
      // Clip LED — latch here (not in the draw) so clips on collapsed strips
      // still register; cleared only by user click.
      if (Math.max(msg.peak, peakL, peakR) >= 1.0) {
        this.clippedChannels.add(msg.tabId);
        this.channels.get(msg.tabId)?.el.querySelector('.clip-led')?.classList.add('clipped');
      }
      if (msg.tabId === this.selectedTab) this._updateUnlockButton(msg.ctxState);
    }
  }

  _markAllDirty() {
    for (const tabId of this.channels.keys()) this._dirtyData.add(tabId);
    this._masterDirty = true;
  }

  _reconcileTabs(tabs, groups = {}) {
    this.groupData = groups;
    const rack = document.getElementById('channel-rack');
    const seen = new Set();
    for (const info of tabs) {
      seen.add(info.tabId);
      if (!this.channels.has(info.tabId)) {
        const params = defaultParams();
        const el = this._createChannelStrip(info, params, this.channels.size + 1);
        rack.appendChild(el);
        this.channels.set(info.tabId, { info, params, el, knob: null });
        this._post({ type: 'GET_PARAMS', tabId: info.tabId });
        if (!this.channelOrder.includes(info.tabId)) this.channelOrder.push(info.tabId);
        // Apply collapse preference
        const url = this._normalizeUrl(info.url);
        if (url && this.collapsedUrls.has(url)) {
          el.classList.add('collapsed');
          const btn = el.querySelector('.btn-collapse');
          if (btn) btn.textContent = '›';
        }
        this._updateGroupBar(el, info.groupId);
      } else {
        const ch = this.channels.get(info.tabId);
        const prevUrl = this._normalizeUrl(ch.info.url);
        const nextUrl = this._normalizeUrl(info.url);
        ch.info = info;
        this._updateStripHeader(ch.el, info);
        this._updateGroupBar(ch.el, info.groupId);
        // Retry GET_PARAMS if the initial attempt failed (content script not ready at tab creation).
        // broadcastTabList fires on every onUpdated, so this retries until the content script responds.
        if (!this.paramsFetched.has(info.tabId)) {
          this._post({ type: 'GET_PARAMS', tabId: info.tabId });
        }
        // SPA navigation: URL changed without a page reload. If the new URL has a stored
        // preset, apply it now - the content script is still running the old audio context
        // so _restoreChannelParams won't fire again on its own.
        if (nextUrl && nextUrl !== prevUrl) {
          const preset = this.urlPresets[nextUrl];
          if (preset) {
            Object.assign(ch.params, preset);
            this._post({ type: 'SET_PARAMS', tabId: info.tabId, params: ch.params });
          }
          // Update collapse preference for the new URL.
          if (this.collapsedUrls.has(nextUrl) && !ch.el.classList.contains('collapsed')) {
            ch.el.classList.add('collapsed');
            const btn = ch.el.querySelector('.btn-collapse');
            if (btn) btn.textContent = '›';
          } else if (!this.collapsedUrls.has(nextUrl) && ch.el.classList.contains('collapsed')) {
            ch.el.classList.remove('collapsed');
            const btn = ch.el.querySelector('.btn-collapse');
            if (btn) btn.textContent = '‹';
          }
          // Update preset dot visibility for the new URL.
          const dot = ch.el.querySelector('.ch-preset-dot');
          if (dot) dot.classList.toggle('has-preset', !!(nextUrl && this.urlPresets[nextUrl]));
        }
      }
    }
    for (const [tabId, ch] of this.channels) {
      if (!seen.has(tabId)) {
        // Flush any pending debounced save before the channel disappears.
        // Without this, changes made in the last 1.2s before close are lost.
        clearTimeout(this._presetTimers.get(tabId));
        this._presetTimers.delete(tabId);
        const closeUrl = this._normalizeUrl(ch.info.url);
        if (closeUrl) {
          this.urlPresets[closeUrl] = this._presetSnapshot(ch.params);
          browser.storage.local.set({ urlPresets: this.urlPresets });
        }

        ch.el.remove();
        this.channels.delete(tabId);
        this.analyserData.delete(tabId);
        this.peakHoldsL.delete(tabId);
        this.peakHoldsR.delete(tabId);
        this.truePeakHolds.delete(tabId);
        this.soloedTabs.delete(tabId);
        this.paramsFetched.delete(tabId);
        this.channelOrder = this.channelOrder.filter(id => id !== tabId);
      }
    }
    // Rebuild channelOrder: strip stale/deleted IDs, preserve relative order,
    // then append any current channels not yet in the list (e.g. after a storage overwrite).
    const currentIds = new Set(this.channels.keys());
    const cleanOrder = this.channelOrder.filter(id => currentIds.has(id));
    for (const id of currentIds) {
      if (!cleanOrder.includes(id)) cleanOrder.push(id);
    }
    this.channelOrder = cleanOrder;

    // Re-order DOM and renumber to match authoritative channelOrder
    for (const tabId of this.channelOrder) {
      const ch = this.channels.get(tabId);
      if (ch) rack.appendChild(ch.el);
    }
    let n = 1;
    for (const tabId of this.channelOrder) {
      const ch = this.channels.get(tabId);
      if (ch) ch.el.querySelector('.ch-num').textContent = n++;
    }

    // New channels must inherit any active solo/master-mute silencing.
    if (this.masterMuted || this.soloedTabs.size) this._applyMuteStates();
    this._markAllDirty();
  }

  _saveChannelOrder() {
    browser.storage.local.set({ channelOrder: this.channelOrder });
  }

  // ── URL normalization ─────────────────────────────────────────────────────
  _normalizeUrl(url) {
    try {
      const u = new URL(url);
      if (u.protocol === 'http:' || u.protocol === 'https:')
        return u.origin + u.pathname + u.search;
    } catch (_) {}
    return null;
  }

  // ── URL presets ───────────────────────────────────────────────────────────
  // Strip session-only state before persisting: masterFader is global, and
  // solo/soloMute describe the current mix session, not the URL's settings.
  _presetSnapshot(params) {
    const snap = JSON.parse(JSON.stringify(params));
    delete snap.masterFader;
    delete snap.soloMute;
    delete snap.solo;
    return snap;
  }

  _schedulePresetSave(tabId) {
    clearTimeout(this._presetTimers.get(tabId));
    this._presetTimers.set(tabId, setTimeout(() => this._saveUrlPreset(tabId), 1200));
  }

  _saveUrlPreset(tabId) {
    const ch = this.channels.get(tabId);
    if (!ch) return;
    const url = this._normalizeUrl(ch.info.url);
    if (!url) return;
    this.urlPresets[url] = this._presetSnapshot(ch.params);
    browser.storage.local.set({ urlPresets: this.urlPresets });
    const dot = ch.el.querySelector('.ch-preset-dot');
    if (dot) dot.classList.add('has-preset');
  }

  // ── Channel rename ────────────────────────────────────────────────────────
  _startRename(tabId, nameSpan) {
    if (nameSpan.querySelector('.ch-name-input')) return;
    const ch = this.channels.get(tabId);
    if (!ch) return;
    const url = this._normalizeUrl(ch.info.url);
    const current = (url && this.customNames[url]) || '';

    const input = document.createElement('input');
    input.className = 'ch-name-input';
    input.value = current;
    input.placeholder = ch.info.title.slice(0, 14);
    input.maxLength = 24;
    nameSpan.textContent = '';
    nameSpan.appendChild(input);

    requestAnimationFrame(() => { input.focus(); input.select(); });

    const commit = () => this._commitRename(tabId, nameSpan, input.value.trim());
    input.addEventListener('blur',   commit);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter')  { e.preventDefault(); input.blur(); }
      if (e.key === 'Escape') { input.value = current; input.blur(); }
    });
  }

  _commitRename(tabId, nameSpan, value) {
    const ch = this.channels.get(tabId);
    if (!ch) return;
    const url = this._normalizeUrl(ch.info.url);
    nameSpan.textContent = value || ch.info.title;
    nameSpan.title = value ? `${value} (${ch.info.title})` : ch.info.title;
    if (url) {
      if (value) this.customNames[url] = value;
      else delete this.customNames[url];
      browser.storage.local.set({ customNames: this.customNames });
    }
  }

  // ── Collapse ──────────────────────────────────────────────────────────────
  _toggleCollapse(tabId) {
    const ch = this.channels.get(tabId);
    if (!ch) return;
    const collapsed = ch.el.classList.toggle('collapsed');
    const btn = ch.el.querySelector('.btn-collapse');
    if (btn) btn.textContent = collapsed ? '›' : '‹';
    if (!collapsed) this._dirtyData.add(tabId); // repaint canvases skipped while hidden
    const url = this._normalizeUrl(ch.info.url);
    if (url) {
      if (collapsed) this.collapsedUrls.add(url);
      else           this.collapsedUrls.delete(url);
      browser.storage.local.set({ collapsedUrls: [...this.collapsedUrls] });
    }
  }

  // ── Group bar ─────────────────────────────────────────────────────────────
  _updateGroupBar(el, groupId) {
    const bar = el.querySelector('.ch-group-bar');
    if (!bar) return;
    const group = groupId != null && groupId !== -1 ? this.groupData[groupId] : null;
    if (group?.color) {
      bar.dataset.color = group.color;
      bar.classList.add('visible');
      bar.title = group.name || group.color;
    } else {
      bar.classList.remove('visible');
      delete bar.dataset.color;
    }
  }

  _applyDrop(targetTabId, insertBefore) {
    const dragId = this._dragTabId;
    if (!dragId || dragId === targetTabId) return;
    this.channelOrder = this.channelOrder.filter(id => id !== dragId);
    const idx = this.channelOrder.indexOf(targetTabId);
    if (idx === -1) return;
    this.channelOrder.splice(insertBefore ? idx : idx + 1, 0, dragId);
    const rack = document.getElementById('channel-rack');
    for (const tabId of this.channelOrder) {
      const ch = this.channels.get(tabId);
      if (ch) rack.appendChild(ch.el);
    }
    let n = 1;
    for (const tabId of this.channelOrder) {
      const ch = this.channels.get(tabId);
      if (ch) ch.el.querySelector('.ch-num').textContent = n++;
    }
    this._saveChannelOrder();
  }

  // Sync all channel strip UI elements from ch.params (the authoritative merged state).
  // Call this any time ch.params changes — after preset merge, after storage load, etc.
  _syncChannelUi(tabId) {
    const ch = this.channels.get(tabId);
    if (!ch) return;
    const p = ch.params;

    const faderEl = ch.el.querySelector('.fader');
    if (faderEl) faderEl.value = String(p.fader ?? 1.0);

    if (ch.knob) ch.knob.setValue(p.pan ?? 0);

    const muteBtn = ch.el.querySelector('.btn-mute');
    if (muteBtn) muteBtn.classList.toggle('active', !!p.mute);
    ch.el.classList.toggle('muted', !!p.mute);

    const widthSliderEl = ch.el.querySelector('.width-slider');
    const widthValEl    = ch.el.querySelector('.width-val');
    if (widthSliderEl && widthValEl) {
      const w = Math.round((p.stereoImager?.width ?? 1.0) * 100);
      widthSliderEl.value    = String(w);
      widthValEl.textContent = `${w}%`;
      const stereoVizEl = ch.el.querySelector('.stereo-viz-canvas');
      if (stereoVizEl) this._drawStereoViz(stereoVizEl, p.stereoImager?.width ?? 1.0);
    }

    for (const effectKey of EFFECT_ORDER) {
      const ep = effectKey === 'eq' ? p.eq : p[effectKey];
      if (ep) this._updateInsertSlot(ch.el, effectKey, ep);
    }
  }

  _restoreChannelParams(tabId, params) {
    const ch = this.channels.get(tabId);
    if (!ch || !params) return;

    this.paramsFetched.add(tabId); // stop retrying GET_PARAMS for this tab

    // Start from content-script state, then overlay URL preset (if loaded yet).
    Object.assign(ch.params, params);

    const url = this._normalizeUrl(ch.info.url);
    const preset = url && this.urlPresets[url];
    if (preset) {
      Object.assign(ch.params, preset);
      this._post({ type: 'SET_PARAMS', tabId, params: ch.params });
    }

    const dot = ch.el.querySelector('.ch-preset-dot');
    if (dot) dot.classList.toggle('has-preset', !!preset);

    // masterFader is global — read it from the content script's response, not the preset.
    if (params.masterFader != null) {
      this.masterFader = params.masterFader;
      const masterFaderEl = document.querySelector('#master-strip .fader');
      if (masterFaderEl) masterFaderEl.value = String(this.masterFader);
    } else {
      this._sendParam(tabId, 'masterFader', this.masterFader);
    }
    // Don't keep session-only fields in ch.params — they'd leak into the
    // SET_PARAMS sent on preset apply and into future preset saves.
    delete ch.params.masterFader;
    delete ch.params.soloMute;

    // Sync all strip UI from ch.params (preset already merged in above).
    this._syncChannelUi(tabId);
  }

  _createChannelStrip(info, params, num) {
    const el = document.createElement('div');
    el.className = 'channel-strip';
    el.setAttribute('role', 'listitem');
    el.dataset.tabId = info.tabId;

    // ch-header
    const header = document.createElement('div');
    header.className = 'ch-header';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'ch-icon';
    const favicon = document.createElement('img');
    favicon.src = info.favicon || '';
    favicon.addEventListener('error', () => { favicon.style.display = 'none'; });
    iconSpan.appendChild(favicon);

    const nameSpan = document.createElement('span');
    nameSpan.className = 'ch-name';
    nameSpan.title = info.title;
    const url0 = this._normalizeUrl(info.url);
    nameSpan.textContent = (url0 && this.customNames[url0]) || info.title;
    nameSpan.addEventListener('dblclick', e => {
      e.stopPropagation();
      this._startRename(info.tabId, nameSpan);
    });

    // Row 1: favicon + name
    const nameRow = document.createElement('div');
    nameRow.className = 'ch-name-row';
    nameRow.append(iconSpan, nameSpan);

    const dragHandle = document.createElement('div');
    dragHandle.className = 'drag-handle';
    dragHandle.title = 'Drag to reorder';
    for (let i = 0; i < 3; i++) dragHandle.appendChild(document.createElement('span'));

    const presetDot = document.createElement('span');
    presetDot.className = 'ch-preset-dot';
    presetDot.title = 'Settings saved for this URL';
    presetDot.textContent = 'PRESET';
    if (url0 && this.urlPresets[url0]) presetDot.classList.add('has-preset');

    const btnCollapse = document.createElement('button');
    btnCollapse.className = 'btn-collapse';
    btnCollapse.title = 'Collapse strip';
    btnCollapse.textContent = '‹';
    btnCollapse.addEventListener('click', e => {
      e.stopPropagation();
      this._toggleCollapse(info.tabId);
    });

    // Row 2: drag handle | preset dot | collapse button
    const widgetRow = document.createElement('div');
    widgetRow.className = 'ch-widget-row';
    widgetRow.append(dragHandle, presetDot, btnCollapse);

    // Group color bar (bottom of header)
    const groupBar = document.createElement('div');
    groupBar.className = 'ch-group-bar';

    header.append(nameRow, widgetRow);
    header.appendChild(groupBar);

    // Drag events
    el.draggable = false; // only drag via handle
    dragHandle.addEventListener('mousedown', () => { el.draggable = true; });
    dragHandle.addEventListener('mouseup',   () => { el.draggable = false; });

    el.addEventListener('dragstart', e => {
      this._dragTabId = tabId;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(tabId));
      requestAnimationFrame(() => el.classList.add('dragging'));
    });
    el.addEventListener('dragend', () => {
      el.draggable = false;
      el.classList.remove('dragging');
      document.querySelectorAll('.channel-strip.drag-over').forEach(s => s.classList.remove('drag-over'));
      this._dragTabId = null;
    });
    el.addEventListener('dragover', e => {
      if (this._dragTabId == null || this._dragTabId === tabId) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const rect = el.getBoundingClientRect();
      const before = e.clientX < rect.left + rect.width / 2;
      document.querySelectorAll('.channel-strip.drag-over').forEach(s => {
        s.classList.remove('drag-over', 'drag-over-after');
      });
      el.classList.add('drag-over');
      if (!before) el.classList.add('drag-over-after');
    });
    el.addEventListener('dragleave', e => {
      if (!el.contains(e.relatedTarget)) {
        el.classList.remove('drag-over', 'drag-over-after');
      }
    });
    el.addEventListener('drop', e => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const insertBefore = e.clientX < rect.left + rect.width / 2;
      el.classList.remove('drag-over', 'drag-over-after');
      this._applyDrop(tabId, insertBefore);
    });

    // inserts
    const inserts = document.createElement('div');
    inserts.className = 'inserts';
    for (const k of EFFECT_ORDER) inserts.appendChild(this._insertSlotHtml(k, params[k]));

    // spectrum canvas
    const specCanvas = document.createElement('canvas');
    specCanvas.className = 'ch-spectrum-canvas';
    specCanvas.width = 82;
    specCanvas.height = 42;

    // pan row
    const panRow = document.createElement('div');
    panRow.className = 'pan-row';
    const panHeader = document.createElement('div');
    panHeader.className = 'pan-header';
    const panLabel = document.createElement('span');
    panLabel.className = 'pan-label';
    panLabel.textContent = 'PAN';
    const btnResetPan = document.createElement('button');
    btnResetPan.className = 'btn-reset-pan';
    btnResetPan.title = 'Reset pan to center';
    btnResetPan.textContent = '↺';
    panHeader.append(panLabel, btnResetPan);
    const panKnob = document.createElement('canvas');
    panKnob.className = 'pan-knob';
    panKnob.width = 58;
    panKnob.height = 58;
    panRow.append(panHeader, panKnob);

    // width row
    const widthRow = document.createElement('div');
    widthRow.className = 'width-row';
    const widthHeader = document.createElement('div');
    widthHeader.className = 'width-header';
    const widthLabel = document.createElement('span');
    widthLabel.className = 'width-label';
    widthLabel.textContent = 'WIDTH';
    const widthValEl = document.createElement('span');
    widthValEl.className = 'width-val';
    widthValEl.textContent = '100%';
    const btnResetWidth = document.createElement('button');
    btnResetWidth.className = 'btn-reset-width';
    btnResetWidth.title = 'Reset width to 100%';
    btnResetWidth.textContent = '↺';
    widthHeader.append(widthLabel, widthValEl, btnResetWidth);
    const widthSlider = document.createElement('input');
    widthSlider.type = 'range';
    widthSlider.className = 'width-slider';
    widthSlider.min = '0';
    widthSlider.max = '200';
    widthSlider.step = '1';
    widthSlider.value = '100';
    const stereoVizCanvas = document.createElement('canvas');
    stereoVizCanvas.className = 'stereo-viz-canvas';
    stereoVizCanvas.width = 108;
    stereoVizCanvas.height = 58;
    widthRow.append(widthHeader, widthSlider, stereoVizCanvas);

    // fader row
    const faderRow = document.createElement('div');
    faderRow.className = 'fader-row';
    const meterCanvas = document.createElement('canvas');
    meterCanvas.className = 'meter-canvas';
    meterCanvas.width = 36;
    meterCanvas.height = 220;
    const faderWrap = document.createElement('div');
    faderWrap.className = 'fader-wrap';
    const faderInput = document.createElement('input');
    faderInput.type = 'range';
    faderInput.className = 'fader';
    faderInput.setAttribute('orient', 'vertical');
    faderInput.min = '0';
    faderInput.max = '1.25';
    faderInput.step = '0.001';
    faderInput.value = '1';
    faderWrap.appendChild(faderInput);
    // Fractions = gain_value / fader_max (1.25). The thumb center travels from 32px
    // above the scale bottom to 32px below the top (8px wrap padding + 1px border +
    // 23px half-thumb), so each pip uses calc() to land on the thumb center.
    const pip = (frac) => `calc(${(frac * 100).toFixed(2)}% + ${(32 - frac * 64).toFixed(2)}px)`;

    const faderTicks = document.createElement('div');
    faderTicks.className = 'fader-ticks';
    for (const [frac, cls] of [
      [1.0000, 'tick-major'],
      [0.9500, 'tick-minor'],
      [0.9000, 'tick-major'],
      [0.8500, 'tick-minor'],
      [0.8000, 'tick-unity'],
      [0.6730, 'tick-minor'],
      [0.5663, 'tick-major'],
      [0.4770, 'tick-minor'],
      [0.4010, 'tick-major'],
      [0.3180, 'tick-minor'],
      [0.2530, 'tick-major'],
      [0.1420, 'tick-minor'],
      [0.0800, 'tick-major'],
      [0.0000, 'tick-major'],
    ]) {
      const s = document.createElement('span');
      s.className = cls;
      s.style.bottom = pip(frac);
      faderTicks.appendChild(s);
    }

    const faderScale = document.createElement('div');
    faderScale.className = 'fader-scale';
    for (const [text, frac, cls] of [
      ['+12', 1.0000, null],
      ['+6',  0.9000, null],
      ['0',   0.8000, 'pip-unity'],
      ['-3',  0.5663, null],
      ['-6',  0.4010, null],
      ['-10', 0.2530, null],
      ['-20', 0.0800, null],
      ['-∞',  0.0000, null]
    ]) {
      const s = document.createElement('span');
      s.style.bottom = pip(frac);
      s.textContent = text;
      if (cls) s.className = cls;
      faderScale.appendChild(s);
    }
    // Clip LED — sits above the meter, latches red on 0 dBFS, click to reset
    const clipLed = document.createElement('div');
    clipLed.className = 'clip-led';
    clipLed.title = 'CLIP — click to reset';
    clipLed.addEventListener('click', e => {
      e.stopPropagation();
      this.clippedChannels.delete(tabId);
      clipLed.classList.remove('clipped');
    });
    const meterCol = document.createElement('div');
    meterCol.className = 'meter-col';
    meterCol.append(clipLed, meterCanvas);
    faderRow.append(meterCol, faderTicks, faderWrap, faderScale);

    // fader reset row
    const faderResetRow = document.createElement('div');
    faderResetRow.className = 'fader-reset-row';
    const btnResetFader = document.createElement('button');
    btnResetFader.className = 'btn-reset-fader';
    btnResetFader.title = 'Reset fader to 0 dB';
    btnResetFader.textContent = '↺ 0dB';
    faderResetRow.appendChild(btnResetFader);

    // LUFS integrated loudness display
    const lufsRow = document.createElement('div');
    lufsRow.className = 'lufs-row';
    const lufsValEl = document.createElement('span');
    lufsValEl.className = 'lufs-val';
    lufsValEl.textContent = '---';
    const lufsLabelEl = document.createElement('span');
    lufsLabelEl.className = 'lufs-label';
    lufsLabelEl.textContent = 'LUFS';
    lufsRow.append(lufsValEl, lufsLabelEl);

    // ch-buttons
    const chButtons = document.createElement('div');
    chButtons.className = 'ch-buttons';
    const btnMute = document.createElement('button');
    btnMute.className = 'btn-mute';
    btnMute.textContent = 'M';
    const btnSolo = document.createElement('button');
    btnSolo.className = 'btn-solo';
    btnSolo.textContent = 'S';
    chButtons.append(btnMute, btnSolo);

    // ch-num
    const chNum = document.createElement('div');
    chNum.className = 'ch-num';
    chNum.textContent = num;

    el.append(header, inserts, specCanvas, panRow, widthRow, faderRow, faderResetRow, lufsRow, chButtons, chNum);

    const tabId = info.tabId;

    el.addEventListener('click', () => {
      this.selectedTab = tabId;
      this._masterDirty = true; // master spectrum/correlation source changed
      document.querySelectorAll('.channel-strip').forEach(s => s.classList.remove('selected'));
      el.classList.add('selected');
      const data = this.analyserData.get(tabId);
      this._updateUnlockButton(data?.ctxState);
    });

    el.querySelectorAll('.insert-slot').forEach(slot => {
      slot.addEventListener('click', e => {
        e.stopPropagation();
        if (slot.dataset.effect === 'eq') this._openEqEditor(tabId);
        else this._openEditor(tabId, slot.dataset.effect);
      });
    });

    this._bindFader(el.querySelector('.fader'), tabId);
    el.querySelector('.btn-reset-fader').addEventListener('click', e => {
      e.stopPropagation();
      const inp = el.querySelector('.fader');
      inp.value = '1';
      const ch = this.channels.get(tabId);
      if (ch) { ch.params.fader = 1.0; this._sendParam(tabId, 'fader', 1.0); }
    });

    const knob = this._bindKnob(el.querySelector('.pan-knob'), tabId, null);
    el.querySelector('.btn-reset-pan').addEventListener('click', e => {
      e.stopPropagation();
      knob?.setValue(0);
      const ch = this.channels.get(tabId);
      if (ch) { ch.params.pan = 0; this._sendParam(tabId, 'pan', 0); }
    });

    el.querySelector('.width-slider').addEventListener('input', e => {
      e.stopPropagation();
      const uiVal = parseInt(e.target.value, 10);
      el.querySelector('.width-val').textContent = `${uiVal}%`;
      const internal = uiVal / 100;
      const ch = this.channels.get(tabId);
      if (ch) {
        ch.params.stereoImager.width   = internal;
        ch.params.stereoImager.enabled = internal !== 1.0;
        this._sendParam(tabId, 'stereoImager.width',   internal);
        this._sendParam(tabId, 'stereoImager.enabled', internal !== 1.0);
        this._drawStereoViz(el.querySelector('.stereo-viz-canvas'), internal);
      }
    });

    el.querySelector('.width-slider').addEventListener('contextmenu', e => {
      e.preventDefault(); e.stopPropagation();
      const cur = parseInt(el.querySelector('.width-slider').value);
      this._showParamMenu(e, {
        name: 'WIDTH', unit: '%', value: cur, min: 0, max: 200, step: 1,
        onCommit: v => {
          const uiVal = Math.max(0, Math.min(200, Math.round(v)));
          el.querySelector('.width-slider').value = String(uiVal);
          el.querySelector('.width-val').textContent = `${uiVal}%`;
          const internal = uiVal / 100;
          const ch = this.channels.get(tabId);
          if (ch) {
            ch.params.stereoImager.width   = internal;
            ch.params.stereoImager.enabled = internal !== 1.0;
            this._sendParam(tabId, 'stereoImager.width',   internal);
            this._sendParam(tabId, 'stereoImager.enabled', internal !== 1.0);
            this._drawStereoViz(el.querySelector('.stereo-viz-canvas'), internal);
          }
        }
      });
    });

    el.querySelector('.btn-reset-width').addEventListener('click', e => {
      e.stopPropagation();
      el.querySelector('.width-slider').value = '100';
      el.querySelector('.width-val').textContent = '100%';
      const ch = this.channels.get(tabId);
      if (ch) {
        ch.params.stereoImager.width   = 1.0;
        ch.params.stereoImager.enabled = false;
        this._sendParam(tabId, 'stereoImager.width',   1.0);
        this._sendParam(tabId, 'stereoImager.enabled', false);
        this._drawStereoViz(el.querySelector('.stereo-viz-canvas'), 1.0);
      }
    });

    el.querySelector('.btn-mute').addEventListener('click', e => {
      e.stopPropagation();
      params.mute = !params.mute;
      e.currentTarget.classList.toggle('active', params.mute);
      el.classList.toggle('muted', params.mute);
      this._sendParam(tabId, 'mute', params.mute);
    });

    el.querySelector('.btn-solo').addEventListener('click', e => {
      e.stopPropagation();
      params.solo = !params.solo;
      e.currentTarget.classList.toggle('active', params.solo);
      if (params.solo) this.soloedTabs.add(tabId);
      else             this.soloedTabs.delete(tabId);
      this._applySolo();
    });


    // Sync meter canvas buffer height to CSS-rendered height
    const meterRO = new ResizeObserver(() => {
      const h = Math.round(meterCanvas.clientHeight);
      if (h > 0 && meterCanvas.height !== h) { meterCanvas.height = h; this._dirtyData.add(tabId); }
    });
    meterRO.observe(meterCanvas);

    // Store knob ref after creation
    setTimeout(() => {
      const ch = this.channels.get(tabId);
      if (ch) ch.knob = knob;
    }, 0);

    this._drawStereoViz(stereoVizCanvas, params.stereoImager?.width ?? 1.0);

    return el;
  }

  _insertSlotHtml(effectKey, effectParams) {
    const enabled = effectParams.enabled;
    const val = this._insertDisplayVal(effectKey, effectParams);
    const slot = document.createElement('div');
    slot.className = 'insert-slot' + (enabled ? ' enabled' : '');
    slot.dataset.effect = effectKey;
    const led = document.createElement('span');
    led.className = 'insert-led';
    const name = document.createElement('span');
    name.className = 'insert-name';
    name.textContent = EFFECT_SHORT[effectKey];
    const valEl = document.createElement('span');
    valEl.className = 'insert-val';
    valEl.textContent = val;
    slot.append(led, name, valEl);
    if (['gate','expander','compressor','limiter'].includes(effectKey)) {
      const grBar = document.createElement('div');
      grBar.className = 'gr-bar';
      const grFill = document.createElement('div');
      grFill.className = 'gr-bar-fill';
      grBar.appendChild(grFill);
      slot.appendChild(grBar);
    }
    return slot;
  }

  _insertDisplayVal(effectKey, ep) {
    if (!ep.enabled) return '';
    switch (effectKey) {
      case 'gate':         return `${ep.threshold}`;
      case 'expander':     return `${ep.ratio}:1`;
      case 'compressor':   return `${ep.ratio}:1`;
      case 'tapeSat':      return `${ep.drive}x`;
      case 'distortion':   return ep.mode === 0 ? 'OD' : 'DIST';
      case 'eq': { const active = (ep.bands ?? []).filter(b => b.enabled && Math.abs(b.gain) >= 0.05).length; return active ? `${active}/5` : ''; }
      case 'delay':        return `${Math.round(ep.time * 1000)}ms`;
      case 'reverb':       return `${ep.size}s`;
      case 'chorus':       return `${ep.rate}Hz`;
      case 'flanger':      return `${ep.rate}Hz`;
      case 'phaser':       return `${ep.rate}Hz`;
      case 'vibrato':      return `${ep.rate}Hz`;
      case 'tremolo':      return `${ep.rate}Hz`;
      case 'limiter':      return `${ep.threshold}dB`;
      default: return '';
    }
  }

  _updateInsertSlot(el, effectKey, effectParams) {
    const slot = el.querySelector(`.insert-slot[data-effect="${effectKey}"]`);
    if (!slot) return;
    slot.classList.toggle('enabled', !!effectParams.enabled);
    slot.querySelector('.insert-val').textContent = this._insertDisplayVal(effectKey, effectParams);
  }

  _updateStripHeader(el, info) {
    const img = el.querySelector('.ch-icon img');
    if (img) img.src = info.favicon || '';
    const name = el.querySelector('.ch-name');
    if (name && !el.querySelector('.ch-name-input')) {
      const url = this._normalizeUrl(info.url);
      const custom = url && this.customNames[url];
      name.textContent = custom || info.title;
      name.title = custom ? `${custom} (${info.title})` : info.title;
    }
  }

  _bindFader(input, tabId) {
    if (!input) return;
    input.addEventListener('input', () => {
      const v = parseFloat(input.value);
      if (tabId == null) {
        this.masterFader = v;
        this._applyMasterFader();
      } else {
        const ch = this.channels.get(tabId);
        if (ch) { ch.params.fader = v; this._sendParam(tabId, 'fader', v); }
      }
    });
    input.addEventListener('contextmenu', e => {
      e.preventDefault(); e.stopPropagation();
      const fv  = tabId == null ? this.masterFader : (this.channels.get(tabId)?.params.fader ?? 1.0);
      const dB  = fv <= 0 ? -80 : fv <= 1.0 ? 20 * Math.log10(fv) : 48 * (fv - 1.0);
      this._showParamMenu(e, {
        name: 'LEVEL', unit: 'dB', value: dB > -80 ? dB : -80,
        min: -80, max: 12, step: 0.1,
        onCommit: v => {
          const c   = Math.max(-80, Math.min(12, v));
          const fv2 = c <= -80 ? 0 : c <= 0 ? Math.pow(10, c / 20) : Math.min(1.25, c / 48 + 1.0);
          if (tabId == null) {
            const el = document.querySelector('#master-strip .fader');
            if (el) el.value = String(fv2);
            this.masterFader = fv2; this._applyMasterFader();
          } else {
            const ch = this.channels.get(tabId);
            const el = ch?.el.querySelector('.fader');
            if (ch && el) { ch.params.fader = fv2; el.value = String(fv2); this._sendParam(tabId, 'fader', fv2); }
          }
        }
      });
    });
  }

  _bindKnob(canvas, tabId, onChangeCb) {
    if (!canvas) return null;
    const knob = new Knob(canvas, {
      min: -1, max: 1, def: 0,
      onChange: v => {
        if (onChangeCb) { onChangeCb(v); return; }
        if (tabId == null) return;
        const ch = this.channels.get(tabId);
        if (ch) { ch.params.pan = v; this._sendParam(tabId, 'pan', v); }
      }
    });
    canvas.addEventListener('contextmenu', e => {
      e.preventDefault(); e.stopPropagation();
      this._showParamMenu(e, {
        name: 'PAN', unit: '', value: Math.round(knob.value * 100),
        min: -100, max: 100, step: 1,
        onCommit: pct => {
          const pan = Math.max(-1, Math.min(1, pct / 100));
          knob.setValue(pan);
          if (onChangeCb) { onChangeCb(pan); return; }
          if (tabId == null) { this.masterPan = pan; this._applyMasterPan(); return; }
          const ch = this.channels.get(tabId);
          if (ch) { ch.params.pan = pan; this._sendParam(tabId, 'pan', pan); }
        }
      });
    });
    return knob;
  }

  _initParamMenu() {
    document.getElementById('param-set-ok').addEventListener('click', () => this._commitParamMenu());
    document.getElementById('param-set-cancel').addEventListener('click', () => this._closeParamMenu());
    document.getElementById('param-set-val').addEventListener('keydown', e => {
      if (e.key === 'Enter')  { e.preventDefault(); this._commitParamMenu(); }
      if (e.key === 'Escape') this._closeParamMenu();
      e.stopPropagation();
    });
    document.addEventListener('mousedown', e => {
      const menu = document.getElementById('param-set-menu');
      if (!menu.classList.contains('hidden') && !menu.contains(e.target))
        this._closeParamMenu();
    }, true);
  }

  // opts: { name, unit, value, min, max, step, onCommit }
  _showParamMenu(e, opts) {
    const inp  = document.getElementById('param-set-val');
    const menu = document.getElementById('param-set-menu');
    document.querySelector('.param-set-name').textContent = opts.name;
    document.querySelector('.param-set-unit').textContent = opts.unit ?? '';
    inp.min  = opts.min  ?? '';
    inp.max  = opts.max  ?? '';
    inp.step = opts.step ?? 'any';
    inp.value = typeof opts.value === 'number' ? opts.value.toFixed(
      opts.step != null && opts.step < 1 ? String(opts.step).split('.')[1]?.length ?? 1 : 1
    ) : String(opts.value ?? '');
    this._paramMenuState = { onCommit: opts.onCommit };
    menu.style.left = `${e.clientX}px`;
    menu.style.top  = `${e.clientY}px`;
    menu.classList.remove('hidden');
    requestAnimationFrame(() => {
      const r = menu.getBoundingClientRect();
      if (r.right  > window.innerWidth)  menu.style.left = `${window.innerWidth  - r.width  - 4}px`;
      if (r.bottom > window.innerHeight) menu.style.top  = `${window.innerHeight - r.height - 4}px`;
      inp.focus(); inp.select();
    });
  }

  _commitParamMenu() {
    if (!this._paramMenuState) return;
    const v = parseFloat(document.getElementById('param-set-val').value);
    if (!isNaN(v)) this._paramMenuState.onCommit(v);
    this._closeParamMenu();
  }

  _closeParamMenu() {
    document.getElementById('param-set-menu').classList.add('hidden');
    this._paramMenuState = null;
  }

  _sendParam(tabId, path, value) {
    this._post({ type: 'SET_PARAM', tabId, path, value });
    if (tabId != null && path !== 'masterFader') this._schedulePresetSave(tabId);
  }

  _sendEffectParam(tabId, effectKey, paramKey, value) {
    this._sendParam(tabId, `${effectKey}.${paramKey}`, value);
    if (effectKey === 'reverb' && (paramKey === 'size' || paramKey === 'decay')) {
      // Debounce: regenerating the IR allocates/fills up to 10s of stereo audio,
      // so do it once after the slider settles instead of on every input tick.
      clearTimeout(this._irTimers.get(tabId));
      this._irTimers.set(tabId, setTimeout(() => {
        this._irTimers.delete(tabId);
        const ch = this.channels.get(tabId);
        if (ch) {
          const { size, decay } = ch.params.reverb;
          this._post({ type: 'UPDATE_REVERB_IR', tabId, size, decay });
        }
      }, 150));
    }
  }

  // Session-level silencing (solo elsewhere / master mute) goes through the
  // separate soloMute param so it never overwrites a channel's own mute state
  // or leaks into URL presets.
  _applyMuteStates() {
    const anySolo = this.soloedTabs.size > 0;
    for (const tabId of this.channels.keys()) {
      const eff = this.masterMuted || (anySolo && !this.soloedTabs.has(tabId));
      this._post({ type: 'SET_PARAM', tabId, path: 'soloMute', value: eff });
    }
  }

  _applySolo()      { this._applyMuteStates(); }

  _applyMasterMute() { this._applyMuteStates(); }

  _updateUnlockButton(ctxState) {
    const btn = document.getElementById('btn-activate');
    btn.style.display = ctxState === 'suspended' ? '' : 'none';
  }

  _applyMasterFader() {
    for (const [tabId] of this.channels)
      this._post({ type: 'SET_PARAM', tabId, path: 'masterFader', value: this.masterFader });
  }

  _applyMasterPan() {
    for (const [tabId, ch] of this.channels) {
      const pan = Math.max(-1, Math.min(1, ch.params.pan + this.masterPan));
      this._post({ type: 'SET_PARAM', tabId, path: 'pan', value: pan });
    }
  }

  // ── EFFECT EDITOR ──────────────────────────────────────────────────────────

  _initEditor() {
    document.getElementById('effect-editor-close').addEventListener('click', () => this._closeEditor());
    document.getElementById('effect-bypass').addEventListener('change', e => {
      if (!this.editorState) return;
      const { tabId, effectKey } = this.editorState;
      const ch = this.channels.get(tabId);
      if (!ch) return;
      ch.params[effectKey].enabled = e.target.checked;
      this._sendParam(tabId, `${effectKey}.enabled`, e.target.checked);
      this._updateInsertSlot(ch.el, effectKey, ch.params[effectKey]);
    });

    // Draggable
    let ox = 0, oy = 0, dragging = false;
    const ed  = document.getElementById('effect-editor');
    const hdr = document.getElementById('effect-editor-header');
    hdr.addEventListener('mousedown', e => {
      if (e.target.closest('button, input, select, label')) return;
      dragging = true;
      const rect = ed.getBoundingClientRect();
      ox = e.clientX - rect.left; oy = e.clientY - rect.top;
      ed.style.transform = 'none';
    });
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      ed.style.left = (e.clientX - ox) + 'px';
      ed.style.top  = (e.clientY - oy) + 'px';
    });
    document.addEventListener('mouseup', () => { dragging = false; });
  }

  _openEditor(tabId, effectKey) {
    if (this.editorState?.tabId === tabId && this.editorState?.effectKey === effectKey) {
      this._closeEditor(); return;
    }
    this.editorState = { tabId, effectKey };
    const ch = this.channels.get(tabId);
    if (!ch) return;

    const effectDef    = EFFECTS[effectKey];
    const effectParams = ch.params[effectKey];
    const presets      = PRESETS[effectKey] || [];

    document.getElementById('effect-editor-title').textContent = effectDef.label;
    document.getElementById('effect-bypass').checked = !!effectParams.enabled;

    // Preset row
    const presetSel = document.getElementById('preset-select');
    presetSel.replaceChildren();
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '— Preset —';
    presetSel.appendChild(placeholder);
    presets.forEach((p, i) => {
      const opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = p.name;
      presetSel.appendChild(opt);
    });
    presetSel.value = '';
    presetSel.onchange = () => {
      const idx = parseInt(presetSel.value);
      if (isNaN(idx)) return;
      this._applyPreset(tabId, effectKey, presets[idx]);
      presetSel.value = '';
    };

    // Reset All button
    document.getElementById('btn-reset-all').onclick = () => {
      this._resetEffect(tabId, effectKey);
    };

    // Build param controls
    const paramsEl = document.getElementById('effect-editor-params');
    paramsEl.innerHTML = '';
    this.editorCtrls.clear();

    for (const pd of effectDef.params) {

      // ── Special case: delay time with ms / BPM toggle ──
      if (effectKey === 'delay' && pd.key === 'time') {
        effectParams._tempoSubdiv = effectParams._tempoSubdiv || '1/4';
        const isTempoMode = !!effectParams._tempoMode;
        const uiCur = toUI(pd, effectParams[pd.key] ?? toInternal(pd, pd.def));
        const curSub = DELAY_SUBDIVISIONS.find(s => s.label === effectParams._tempoSubdiv) || DELAY_SUBDIVISIONS[3];
        const initBpm = Math.round((60000 * curSub.mult) / Math.max(1, uiCur));

        const section = document.createElement('div');
        section.className = 'delay-time-section';

        // ── Inner param row ──
        const innerRow = document.createElement('div');
        innerRow.className = 'param-row';

        const labelWrap = document.createElement('div');
        labelWrap.className = 'delay-time-label-wrap';
        const lbl = document.createElement('span');
        lbl.className = 'param-label'; lbl.textContent = 'Time';
        const modePill = document.createElement('button');
        modePill.className = 'delay-mode-pill' + (isTempoMode ? ' active' : '');
        modePill.textContent = isTempoMode ? 'BPM' : 'ms';
        labelWrap.appendChild(lbl); labelWrap.appendChild(modePill);

        const slider = document.createElement('input');
        slider.type = 'range'; slider.className = 'param-slider';
        slider.min = pd.min; slider.max = pd.max; slider.step = pd.step;
        slider.value = uiCur;
        slider.style.display = isTempoMode ? 'none' : '';

        const bpmInput = document.createElement('input');
        bpmInput.type = 'number'; bpmInput.className = 'delay-bpm-input';
        bpmInput.min = 20; bpmInput.max = 300; bpmInput.step = 1;
        bpmInput.value = String(Math.max(20, Math.min(300, initBpm)));
        bpmInput.style.display = isTempoMode ? '' : 'none';

        const valEl = document.createElement('span');
        valEl.className = 'param-value';
        valEl.textContent = isTempoMode ? `${bpmInput.value}BPM` : formatVal(pd, uiCur);

        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn-reset-param'; resetBtn.textContent = '↺';
        resetBtn.title = `Reset to default (${formatVal(pd, pd.def)})`;

        innerRow.appendChild(labelWrap);
        innerRow.appendChild(slider);
        innerRow.appendChild(bpmInput);
        innerRow.appendChild(valEl);
        innerRow.appendChild(resetBtn);

        // ── Subdivision row ──
        const subdivRow = document.createElement('div');
        subdivRow.className = 'delay-subdiv-row' + (isTempoMode ? '' : ' hidden');
        DELAY_SUBDIVISIONS.forEach(sub => {
          const btn = document.createElement('button');
          btn.className = 'delay-subdiv-btn' + (sub.label === effectParams._tempoSubdiv ? ' active' : '');
          btn.textContent = sub.label;
          btn.addEventListener('click', () => {
            effectParams._tempoSubdiv = sub.label;
            subdivRow.querySelectorAll('.delay-subdiv-btn').forEach(b => b.classList.toggle('active', b === btn));
            const bpm = parseInt(bpmInput.value) || 120;
            const ms = Math.max(pd.min, Math.min(pd.max, (60000 * sub.mult) / bpm));
            effectParams[pd.key] = ms / 1000;
            slider.value = String(ms);
            this._sendEffectParam(tabId, effectKey, pd.key, ms / 1000);
            this._updateInsertSlot(ch.el, effectKey, effectParams);
          });
          subdivRow.appendChild(btn);
        });

        // ── Event handlers ──
        slider.addEventListener('input', () => {
          const uiVal  = parseFloat(slider.value);
          const intVal = toInternal(pd, uiVal);
          effectParams[pd.key] = intVal;
          valEl.textContent = formatVal(pd, uiVal);
          this._sendEffectParam(tabId, effectKey, pd.key, intVal);
          this._updateInsertSlot(ch.el, effectKey, effectParams);
        });

        bpmInput.addEventListener('input', () => {
          const bpm = Math.max(20, Math.min(300, parseInt(bpmInput.value) || 120));
          const sub = DELAY_SUBDIVISIONS.find(s => s.label === effectParams._tempoSubdiv) || DELAY_SUBDIVISIONS[3];
          const ms = Math.max(pd.min, Math.min(pd.max, (60000 * sub.mult) / bpm));
          effectParams[pd.key] = ms / 1000;
          slider.value = String(ms);
          valEl.textContent = `${bpm}BPM`;
          this._sendEffectParam(tabId, effectKey, pd.key, ms / 1000);
          this._updateInsertSlot(ch.el, effectKey, effectParams);
        });

        resetBtn.addEventListener('click', () => {
          const intVal = toInternal(pd, pd.def);
          effectParams[pd.key] = intVal;
          slider.value = String(pd.def);
          if (effectParams._tempoMode) {
            const sub = DELAY_SUBDIVISIONS.find(s => s.label === effectParams._tempoSubdiv) || DELAY_SUBDIVISIONS[3];
            const bpm = Math.max(20, Math.min(300, Math.round((60000 * sub.mult) / pd.def)));
            bpmInput.value = String(bpm);
            valEl.textContent = `${bpm}BPM`;
          } else {
            valEl.textContent = formatVal(pd, pd.def);
          }
          this._sendEffectParam(tabId, effectKey, pd.key, intVal);
          this._updateInsertSlot(ch.el, effectKey, effectParams);
        });

        modePill.addEventListener('click', () => {
          const newMode = !effectParams._tempoMode;
          effectParams._tempoMode = newMode;
          modePill.textContent = newMode ? 'BPM' : 'ms';
          modePill.classList.toggle('active', newMode);
          slider.style.display = newMode ? 'none' : '';
          bpmInput.style.display = newMode ? '' : 'none';
          subdivRow.classList.toggle('hidden', !newMode);
          if (newMode) {
            const currentMs = toUI(pd, effectParams[pd.key]);
            const sub = DELAY_SUBDIVISIONS.find(s => s.label === effectParams._tempoSubdiv) || DELAY_SUBDIVISIONS[3];
            const bpm = Math.max(20, Math.min(300, Math.round((60000 * sub.mult) / Math.max(1, currentMs))));
            bpmInput.value = String(bpm);
            valEl.textContent = `${bpm}BPM`;
          } else {
            const currentMs = toUI(pd, effectParams[pd.key]);
            valEl.textContent = formatVal(pd, currentMs);
            slider.value = String(currentMs);
          }
        });

        section.appendChild(innerRow);
        section.appendChild(subdivRow);
        paramsEl.appendChild(section);
        this.editorCtrls.set(pd.key, { type: 'delay-time', slider, bpmInput, valEl, subdivRow, resetBtn, pd, effectParams });
        continue;
      }

      const row = document.createElement('div');
      row.className = 'param-row';

      const label = document.createElement('span');
      label.className = 'param-label';
      label.textContent = pd.label;
      row.appendChild(label);

      if (pd.type === 'mode') {
        const wrap = document.createElement('div');
        wrap.className = 'mode-toggle';
        let current = effectParams[pd.key] ?? pd.def;
        pd.options.forEach((opt, idx) => {
          const btn = document.createElement('button');
          btn.className = 'mode-btn' + (Math.round(current) === idx ? ' active' : '');
          btn.textContent = opt;
          btn.addEventListener('click', () => {
            wrap.querySelectorAll('.mode-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
            effectParams[pd.key] = idx;
            this._sendEffectParam(tabId, effectKey, pd.key, idx);
            this._updateInsertSlot(ch.el, effectKey, effectParams);
          });
          wrap.appendChild(btn);
        });
        row.appendChild(wrap);
        this.editorCtrls.set(pd.key, { type: 'mode', wrap, pd });
      } else {
        const uiCur = toUI(pd, effectParams[pd.key] ?? toInternal(pd, pd.def));

        const slider = document.createElement('input');
        slider.type = 'range'; slider.className = 'param-slider';
        slider.min = pd.min; slider.max = pd.max; slider.step = pd.step;
        slider.value = uiCur;

        const valEl = document.createElement('span');
        valEl.className = 'param-value';
        valEl.textContent = formatVal(pd, uiCur);

        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn-reset-param';
        resetBtn.textContent = '↺';
        resetBtn.title = `Reset to default (${formatVal(pd, pd.def)})`;

        slider.addEventListener('input', () => {
          const uiVal  = parseFloat(slider.value);
          const intVal = toInternal(pd, uiVal);
          effectParams[pd.key] = intVal;
          valEl.textContent = formatVal(pd, uiVal);
          this._sendEffectParam(tabId, effectKey, pd.key, intVal);
          this._updateInsertSlot(ch.el, effectKey, effectParams);
        });

        resetBtn.addEventListener('click', () => {
          const intVal = toInternal(pd, pd.def);
          effectParams[pd.key] = intVal;
          slider.value = String(pd.def);
          valEl.textContent = formatVal(pd, pd.def);
          this._sendEffectParam(tabId, effectKey, pd.key, intVal);
          this._updateInsertSlot(ch.el, effectKey, effectParams);
        });

        slider.addEventListener('contextmenu', e => {
          e.preventDefault(); e.stopPropagation();
          this._showParamMenu(e, {
            name: pd.label.toUpperCase(), unit: pd.unit,
            value: parseFloat(slider.value), min: pd.min, max: pd.max, step: pd.step,
            onCommit: v => {
              const uiVal  = Math.max(pd.min, Math.min(pd.max, v));
              const intVal = toInternal(pd, uiVal);
              effectParams[pd.key] = intVal;
              slider.value = String(uiVal);
              valEl.textContent = formatVal(pd, uiVal);
              this._sendEffectParam(tabId, effectKey, pd.key, intVal);
              this._updateInsertSlot(ch.el, effectKey, effectParams);
            }
          });
        });

        row.appendChild(slider);
        row.appendChild(valEl);
        row.appendChild(resetBtn);
        this.editorCtrls.set(pd.key, { type: 'slider', slider, valEl, resetBtn, pd });
      }

      paramsEl.appendChild(row);
    }

    this._setupEffectViz(effectKey);
    document.getElementById('effect-editor').classList.remove('hidden');
  }

  _closeEditor() {
    document.getElementById('effect-editor').classList.add('hidden');
    if (this.vizCanvas) this.vizCanvas.style.display = 'none';
    this.editorState = null;
    this.editorCtrls.clear();
  }

  _applyPreset(tabId, effectKey, preset) {
    const ch = this.channels.get(tabId);
    if (!ch) return;
    const ep = ch.params[effectKey];
    Object.assign(ep, preset.params);

    for (const [key, val] of Object.entries(preset.params))
      this._sendEffectParam(tabId, effectKey, key, val);

    // Update editor controls in place
    for (const [pKey, ctrl] of this.editorCtrls) {
      if (!(pKey in preset.params)) continue;
      const pd  = ctrl.pd;
      const intVal = preset.params[pKey];
      if (ctrl.type === 'slider') {
        const uiVal = toUI(pd, intVal);
        ctrl.slider.value = String(uiVal);
        ctrl.valEl.textContent = formatVal(pd, uiVal);
      } else if (ctrl.type === 'mode') {
        ctrl.wrap.querySelectorAll('.mode-btn').forEach((b, i) => b.classList.toggle('active', i === Math.round(intVal)));
      } else if (ctrl.type === 'delay-time') {
        const uiVal = toUI(pd, intVal);
        ctrl.slider.value = String(uiVal);
        if (ctrl.effectParams._tempoMode) {
          const sub = DELAY_SUBDIVISIONS.find(s => s.label === ctrl.effectParams._tempoSubdiv) || DELAY_SUBDIVISIONS[3];
          const bpm = Math.max(20, Math.min(300, Math.round((60000 * sub.mult) / Math.max(1, uiVal))));
          ctrl.bpmInput.value = String(bpm);
          ctrl.valEl.textContent = `${bpm}BPM`;
        } else {
          ctrl.valEl.textContent = formatVal(pd, uiVal);
        }
      }
    }
    this._updateInsertSlot(ch.el, effectKey, ep);
  }

  _resetEffect(tabId, effectKey) {
    const effectDef = EFFECTS[effectKey];
    const resetVals = {};
    for (const pd of effectDef.params) {
      if (pd.type === 'mode') {
        resetVals[pd.key] = pd.def;
      } else {
        resetVals[pd.key] = toInternal(pd, pd.def);
      }
    }
    this._applyPreset(tabId, effectKey, { params: resetVals });
  }

  // ── METERING / ANIMATION ──────────────────────────────────────────────────

  _updateHold(map, key, level, frames, decay) {
    const cur = map.get(key) || { level: 0, frames: 0 };
    if (level >= cur.level) { cur.level = level; cur.frames = frames; }
    else { cur.frames--; if (cur.frames <= 0) cur.level *= decay; }
    map.set(key, cur);
  }

  _updatePeakHolds(key, peakL, peakR) {
    this._updateHold(this.peakHoldsL, key, peakL, 80, 0.94);
    this._updateHold(this.peakHoldsR, key, peakR, 80, 0.94);
  }

  _updateTruePeakHold(key, tp) {
    this._updateHold(this.truePeakHolds, key, tp, 180, 0.97);
  }

  _isLightTheme() { return this._currentThemeKey === 'solar'; }

  _startRaf() {
    // Analyser data arrives at 20 Hz; everything except the animated effect viz
    // is gated on dirty flags so canvases redraw only when their data changed.
    const tick = () => {
      this._drawMeters();
      this._updateLufsDisplays();
      this._drawChannelSpectrums();
      this._drawMasterSpectrum();
      this._tickEffectViz();
      this._updateGrBars();
      this._updateCorrelationMeter();
      this._updateEqSpectrum();
      this._dirtyData.clear();
      this._masterDirty = false;
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  _updateEqSpectrum() {
    if (!this.eqEditor || this.eqTabId == null) return;
    const fft = this.analyserData.get(this.eqTabId)?.fft ?? null;
    // Each ANALYSER_DATA message carries a new fft array, so a reference compare
    // detects fresh data. Interaction (drag/scroll) calls eqEditor.draw() itself.
    if (fft === this._lastEqFft) return;
    this._lastEqFft = fft;
    this.eqEditor.setSpectrum(fft);
    this.eqEditor.draw();
  }

  _updateLufsDisplays() {
    for (const [tabId, ch] of this.channels) {
      if (!this._dirtyData.has(tabId)) continue;
      const el = ch.el.querySelector('.lufs-val');
      if (!el) continue;
      const lufs = this.analyserData.get(tabId)?.lufs;
      if (lufs != null) {
        el.textContent = lufs.toFixed(1);
        el.classList.add('active');
      } else {
        el.textContent = '---';
        el.classList.remove('active');
      }
    }
  }

  _updateGrBars() {
    for (const [tabId, ch] of this.channels) {
      if (!this._dirtyData.has(tabId)) continue;
      const data = this.analyserData.get(tabId);
      if (!data) continue;
      const p = ch.params;
      this._setInsertGrBar(ch.el, 'gate',       p.gate?.enabled       ? Math.min(1, Math.max(0, 1 - (data.gateGr ?? 1))) : 0);
      this._setInsertGrBar(ch.el, 'expander',   p.expander?.enabled   ? Math.min(1, -(data.expanderGr ?? 0) / 20)        : 0);
      this._setInsertGrBar(ch.el, 'compressor', p.compressor?.enabled ? Math.min(1, -(data.compGr ?? 0) / 20)            : 0);
      this._setInsertGrBar(ch.el, 'limiter',    p.limiter?.enabled    ? Math.min(1, -(data.limiterGr ?? 0) / 10)         : 0);
    }
  }

  _setInsertGrBar(el, effectKey, grFrac) {
    const fill = el.querySelector(`.insert-slot[data-effect="${effectKey}"] .gr-bar-fill`);
    if (!fill) return;
    if (grFrac < 0.01) { fill.style.width = '0'; return; }
    const g = Math.round(200 * (1 - grFrac));
    fill.style.width = `${Math.round(grFrac * 100)}%`;
    fill.style.background = `rgb(255,${g},0)`;
  }

  _updateCorrelationMeter() {
    if (!this._masterDirty) return;
    const masterEl = document.getElementById('master-strip');
    const canvas = masterEl?.querySelector('.corr-meter');
    if (!canvas) return;
    const g = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    let corr = 1;
    if (this.selectedTab != null && this.analyserData.has(this.selectedTab)) {
      corr = this.analyserData.get(this.selectedTab)?.correlation ?? 1;
    } else {
      let maxPeak = 0;
      for (const data of this.analyserData.values()) {
        if ((data.peak ?? 0) > maxPeak) { maxPeak = data.peak; corr = data.correlation ?? 1; }
      }
    }

    const light = this._isLightTheme();
    g.fillStyle = light ? '#ddd7cf' : '#08080d';
    g.fillRect(0, 0, W, H);

    const cX = Math.round(W / 2);
    const x  = Math.max(0, Math.min(W, Math.round((corr + 1) / 2 * W)));

    if (corr >= 0) {
      const grad = g.createLinearGradient(cX, 0, W, 0);
      grad.addColorStop(0, light ? '#a8d4bc' : '#1a3a28');
      grad.addColorStop(1, '#1fb86a');
      g.fillStyle = grad;
      g.fillRect(cX, 1, Math.max(0, x - cX), H - 2);
    } else {
      const grad = g.createLinearGradient(0, 0, cX, 0);
      grad.addColorStop(0, '#ff3355');
      grad.addColorStop(1, light ? '#f4b8c0' : '#3a1020');
      g.fillStyle = grad;
      g.fillRect(x, 1, Math.max(0, cX - x), H - 2);
    }

    g.fillStyle = light ? '#9e9890' : '#303050';
    g.fillRect(cX, 0, 1, H);

    g.fillStyle = corr >= 0 ? '#1fb86a' : '#ff3355';
    g.fillRect(Math.max(0, Math.min(W - 2, x)), 0, 2, H);

    g.strokeStyle = light ? '#bdb7ae' : '#1e1e3a'; g.lineWidth = 1;
    g.strokeRect(0.5, 0.5, W - 1, H - 1);
  }

  // Stereo L/R meter renderer shared by channel strips and the master strip.
  // Bar zone is BAR_W px wide: L bar x1-4, 1px gap, R bar x6-9. Each side has
  // its own peak hold line; the numeric readout shows the higher of the two.
  _renderMeter(g, W, H, holdKey, peakL, peakR) {
    const BAR_W = 10;
    const DB_SCALE = [[0, '0'], [-6, '-6'], [-12, '-12'], [-20, '-20'], [-40, '-40']];
    const light = this._isLightTheme();
    const dbToY = p => {
      const db = p > 0 ? 20 * Math.log10(p) : -80;
      return H - Math.max(0, Math.min(H, ((db + 60) / 66) * H));
    };

    g.fillStyle = light ? '#ddd7cf' : '#08080d';
    g.fillRect(0, 0, W, H);

    // Level bars
    const yL = dbToY(peakL), yR = dbToY(peakR);
    if (yL < H || yR < H) {
      const grad = g.createLinearGradient(0, H, 0, 0);
      grad.addColorStop(0,     '#1fb86a');  // green  (−60 dB)
      grad.addColorStop(0.636, '#1fb86a');  // green  (−18 dB)
      grad.addColorStop(0.773, '#f5c542');  // yellow ( −9 dB)
      grad.addColorStop(0.864, '#ff8c00');  // orange ( −3 dB)
      grad.addColorStop(0.909, '#ff3355');  // red    (  0 dB)
      grad.addColorStop(1.0,   '#ff3355');  // red    ( +6 dB)
      g.fillStyle = grad;
      if (yL < H) g.fillRect(1, yL, 4, H - yL);
      if (yR < H) g.fillRect(6, yR, 4, H - yR);
    }

    // Independent L/R peak hold lines; track the higher one for the readout
    let labelDb = null, labelHoldY = null;
    const drawHold = (map, x) => {
      const hold = map.get(holdKey);
      if (!(hold?.level > 0)) return;
      const holdDb = 20 * Math.log10(hold.level);
      const y = dbToY(hold.level);
      g.fillStyle = holdDb >= 0 ? '#ff3355' : '#c8c8e8';
      g.fillRect(x, y, 4, 1);
      if (labelDb === null || holdDb > labelDb) { labelDb = holdDb; labelHoldY = y; }
    };
    drawHold(this.peakHoldsL, 1);
    drawHold(this.peakHoldsR, 6);

    if (labelDb !== null) {
      const holdInt  = Math.round(labelDb);
      const holdText = holdInt >= 0 ? `+${holdInt}` : `${holdInt}`;
      g.font = 'bold 9px "JetBrains Mono", monospace';
      g.fillStyle = labelDb >= 0 ? '#ff3355' : '#c8c8e8';
      g.textAlign = 'left';
      g.fillText(holdText, BAR_W + 2, Math.max(labelHoldY + 7, 10));
    }

    // True-peak hold — faint full-width line tracking inter-sample peaks
    const tpHold = this.truePeakHolds.get(holdKey);
    if (tpHold?.level > 0) {
      const tpDb = 20 * Math.log10(tpHold.level);
      g.fillStyle = tpDb >= 0 ? 'rgba(255,51,85,0.7)' : 'rgba(200,200,232,0.45)';
      g.fillRect(1, dbToY(tpHold.level), BAR_W - 1, 1);
    }

    // Segment dividers on bar zone only
    g.fillStyle = light ? '#ddd7cf' : '#08080d';
    for (let i = 1; i < 12; i++) g.fillRect(0, Math.round(H * i / 12), BAR_W, 1);

    // Static dB scale labels (right zone) — skip any that would overlap hold readout
    g.font = '9px "JetBrains Mono", monospace';
    g.textAlign = 'left';
    for (const [db, text] of DB_SCALE) {
      const y = H - ((db + 60) / 66) * H;
      if (labelHoldY !== null && Math.abs(y - labelHoldY) < 12) continue;
      g.fillStyle = light ? '#b0a898' : '#252545';
      g.fillRect(BAR_W, y, 3, 1);
      g.fillStyle = light ? (db >= -6 ? '#5a5248' : '#8e8880') : (db >= -6 ? '#585880' : '#333352');
      g.fillText(text, BAR_W + 4, y + 4);
    }
  }

  _drawMeters() {
    for (const [tabId, ch] of this.channels) {
      if (!this._dirtyData.has(tabId)) continue;
      if (ch.el.classList.contains('collapsed')) continue; // canvas hidden
      const canvas = ch.el.querySelector('.meter-canvas');
      if (!canvas) continue;
      const g = canvas.getContext('2d');
      const data = this.analyserData.get(tabId);
      const peakL = data?.peakL ?? data?.peak ?? 0;
      const peakR = data?.peakR ?? data?.peak ?? 0;
      this._renderMeter(g, canvas.width, canvas.height, tabId, peakL, peakR);
    }

    // Master meter — per-side max across all channels (master fader already baked in)
    const masterEl = document.getElementById('master-strip');
    const masterCanvas = masterEl?.querySelector('.meter-canvas');
    if (masterCanvas && this._masterDirty) {
      let masterPeakL = 0, masterPeakR = 0, masterTruePeak = 0;
      if (!this.masterMuted) {
        for (const data of this.analyserData.values()) {
          const pl = data.peakL ?? data.peak ?? 0;
          const pr = data.peakR ?? data.peak ?? 0;
          if (pl > masterPeakL) masterPeakL = pl;
          if (pr > masterPeakR) masterPeakR = pr;
          const tp = data.truePeak ?? data.peak ?? 0;
          if (tp > masterTruePeak) masterTruePeak = tp;
        }
      }

      this._updatePeakHolds('master', masterPeakL, masterPeakR);
      this._updateTruePeakHold('master', masterTruePeak);

      const g = masterCanvas.getContext('2d');
      this._renderMeter(g, masterCanvas.width, masterCanvas.height, 'master', masterPeakL, masterPeakR);

      if (Math.max(masterPeakL, masterPeakR) >= 1.0) {
        this.masterClipped = true;
        const led = masterEl.querySelector('.clip-led');
        if (led) led.classList.add('clipped');
      }
    }
  }

  _drawChannelSpectrums() {
    for (const [tabId, ch] of this.channels) {
      if (!this._dirtyData.has(tabId)) continue;
      if (ch.el.classList.contains('collapsed')) continue; // canvas hidden
      const canvas = ch.el.querySelector('.ch-spectrum-canvas');
      if (!canvas) continue;

      const W = canvas.width, H = canvas.height;
      const g = canvas.getContext('2d');
      const light = this._isLightTheme();
      g.fillStyle = light ? '#ddd7cf' : '#09090e';
      g.fillRect(0, 0, W, H);

      const data = this.analyserData.get(tabId);
      if (!data?.fft) continue;

      const fft = data.fft;
      const len = fft.length;
      const bars = 28;
      const barW = Math.floor(W / bars);
      const gap  = 1;

      // Gradient for bars
      const grad = g.createLinearGradient(0, H, 0, 0);
      grad.addColorStop(0,   '#1a6040');
      grad.addColorStop(0.6, '#1fb86a');
      grad.addColorStop(0.82,'#f5c542');
      grad.addColorStop(1.0, '#ff3355');

      for (let i = 0; i < bars; i++) {
        // Log-scale bin mapping
        const fLow  = 20 * Math.pow(20000 / 20, i / bars);
        const fHigh = 20 * Math.pow(20000 / 20, (i + 1) / bars);
        const binLo = Math.floor((fLow  / 24000) * len);
        const binHi = Math.ceil((fHigh / 24000) * len);
        let maxDb = -120;
        for (let b = binLo; b <= Math.min(binHi, len - 1); b++)
          if (fft[b] > maxDb) maxDb = fft[b];

        const norm  = Math.max(0, Math.min(1, (maxDb + 80) / 70));
        const barH  = Math.round(norm * (H - 2));
        const x     = i * (barW + gap);

        if (barH > 0) {
          g.fillStyle = grad;
          g.fillRect(x, H - barH, barW, barH);
        }
      }

      // Subtle bottom line
      g.fillStyle = light ? '#b0a898' : '#20204a';
      g.fillRect(0, H - 1, W, 1);
    }
  }

  _resizeSpectrum() {
    const canvas = this.specCanvas;
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = Math.round(rect.width);
    canvas.height = Math.round(rect.height);
    this._masterDirty = true;
  }

  _drawMasterSpectrum() {
    if (!this._masterDirty) return;
    const canvas = this.specCanvas;
    if (!canvas) return;
    const g = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const light = this._isLightTheme();
    g.fillStyle = light ? '#d4cec6' : '#040407';
    g.fillRect(0, 0, W, H);

    // Aggregate FFT data from all tabs or just selected
    let fft = null;
    if (this.selectedTab && this.analyserData.has(this.selectedTab)) {
      fft = this.analyserData.get(this.selectedTab).fft;
    } else {
      // Combine all active tabs
      for (const data of this.analyserData.values()) {
        if (!data.fft) continue;
        if (!fft) {
          fft = data.fft.slice();
        } else {
          for (let i = 0; i < fft.length; i++)
            fft[i] = Math.max(fft[i], data.fft[i]);
        }
      }
    }

    if (fft) this._drawFFTLine(g, W, H, fft);

    // Frequency labels
    const labels = ['20','50','100','200','500','1k','2k','5k','10k','20k'];
    const freqs  = [20,   50,  100,  200,  500, 1000,2000,5000,10000,20000];
    const nyq    = 24000;
    freqs.forEach((f, i) => {
      const x = Math.round((Math.log10(f / 20) / Math.log10(nyq / 20)) * W);
      if (x > 0 && x < W - 12) {
        g.fillStyle = light ? '#bdb7ae' : '#1e1e34';
        g.fillRect(x, 0, 1, H - 12);
        g.fillStyle = light ? '#7a7268' : '#3a3a58';
        g.font = '8px JetBrains Mono, monospace';
        g.fillText(labels[i], x + 2, H - 2);
      }
    });
  }

  _drawFFTLine(g, W, H, fft) {
    const len = fft.length;
    const pts = [];
    for (let i = 0; i < W; i++) {
      const freq = 20 * Math.pow(24000 / 20, i / W);
      const bin  = Math.max(0, Math.min(len - 1, Math.round((freq / 24000) * len)));
      const db   = fft[bin];
      if (db < -130) continue;
      const norm = Math.max(0, (db + 100) / 80);
      pts.push({ x: i, y: H - norm * (H - 12) - 8 });
    }
    if (pts.length < 2) return;

    g.beginPath();
    g.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) g.lineTo(pts[i].x, pts[i].y);
    g.strokeStyle = accentHex();
    g.lineWidth = 1.5;
    g.shadowColor = accentHex();
    g.shadowBlur = 5;
    g.stroke();
    g.shadowBlur = 0;

    g.beginPath();
    g.moveTo(pts[0].x, H);
    for (const pt of pts) g.lineTo(pt.x, pt.y);
    g.lineTo(pts[pts.length - 1].x, H);
    g.closePath();
    const grad = g.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   accentRgba(0.3));
    grad.addColorStop(1,   accentRgba(0.01));
    g.fillStyle = grad;
    g.fill();
  }

  // ── PARAMETRIC EQ ────────────────────────────────────────────────────────

  _initEqEditor() {
    document.getElementById('eq-close').addEventListener('click', () => this._closeEqEditor());

    document.getElementById('eq-bypass').addEventListener('change', e => {
      if (this.eqTabId == null) return;
      const ch = this.channels.get(this.eqTabId);
      if (!ch) return;
      ch.params.eq.enabled = e.target.checked;
      this._sendParam(this.eqTabId, 'eq.enabled', e.target.checked);
      this._updateInsertSlot(ch.el, 'eq', ch.params.eq);
      this.eqEditor?.draw();
    });

    let ox = 0, oy = 0, eqDrag = false;
    const ed  = document.getElementById('eq-editor');
    const hdr = document.getElementById('eq-header');
    hdr.addEventListener('mousedown', e => {
      if (e.target.closest('button, input, select, label')) return;
      eqDrag = true;
      const r = ed.getBoundingClientRect();
      ox = e.clientX - r.left; oy = e.clientY - r.top;
      ed.style.transform = 'none';
    });
    document.addEventListener('mousemove', e => {
      if (!eqDrag) return;
      ed.style.left = (e.clientX - ox) + 'px';
      ed.style.top  = (e.clientY - oy) + 'px';
    });
    document.addEventListener('mouseup', () => { eqDrag = false; });
  }

  _openEqEditor(tabId) {
    if (this.eqTabId === tabId) { this._closeEqEditor(); return; }
    this._closeEqEditor();
    const ch = this.channels.get(tabId);
    if (!ch) return;
    this.eqTabId = tabId;

    const orderIdx = this.channelOrder.indexOf(tabId);
    const n = (orderIdx !== -1 ? orderIdx : [...this.channels.keys()].indexOf(tabId)) + 1;
    document.getElementById('eq-chan-label').textContent = `CH ${n}`;
    document.getElementById('eq-bypass').checked = ch.params.eq.enabled;

    const canvas = document.getElementById('eq-canvas');
    this.eqEditor = new ParametricEQ(canvas, ch.params.eq.bands, (bi, band) => {
      this._onEqBandChange(tabId, bi, band);
    }, () => this._isLightTheme());

    this._buildEqBandStrip(tabId, ch.params.eq.bands);
    ch.el.querySelector('.insert-slot[data-effect="eq"]')?.classList.add('active');
    document.getElementById('eq-editor').classList.remove('hidden');
  }

  _closeEqEditor() {
    if (this.eqTabId != null) {
      this.channels.get(this.eqTabId)?.el.querySelector('.insert-slot[data-effect="eq"]')?.classList.remove('active');
    }
    document.getElementById('eq-editor').classList.add('hidden');
    this.eqTabId = null;
    this.eqEditor = null;
    this.eqValEls = [];
  }

  _buildEqBandStrip(tabId, bands) {
    const strip = document.getElementById('eq-band-strip');
    strip.innerHTML = '';
    this.eqValEls = [];

    bands.forEach((band, bi) => {
      const color  = EQ_COLORS[bi];
      const [r, gv, b] = EQ_COLORS_RGB[bi];
      const col = document.createElement('div');
      col.className = 'eq-band-col' + (band.enabled ? ' active' : '');

      // Header row: LED + type label
      const hdr = document.createElement('div');
      hdr.className = 'eq-band-hdr';

      const led = document.createElement('span');
      led.className = 'eq-band-led' + (band.enabled ? ' on' : '');
      led.style.cssText = `background:${band.enabled ? color : '#232338'}; box-shadow:${band.enabled ? `0 0 6px ${color}` : 'none'}`;
      led.addEventListener('click', e => {
        e.stopPropagation();
        band.enabled = !band.enabled;
        led.style.background = band.enabled ? color : '#232338';
        led.style.boxShadow  = band.enabled ? `0 0 6px ${color}` : 'none';
        led.classList.toggle('on', band.enabled);
        col.classList.toggle('active', band.enabled);
        this._onEqBandChange(tabId, bi, band);
      });

      const typeLbl = document.createElement('span');
      typeLbl.className = 'eq-band-type';
      typeLbl.textContent = EQ_BAND_LABELS[bi];
      typeLbl.style.color = `rgba(${r},${gv},${b},0.75)`;

      hdr.append(led, typeLbl);
      col.appendChild(hdr);

      const sep = document.createElement('div');
      sep.className = 'eq-band-sep';
      sep.style.background = `rgba(${r},${gv},${b},0.18)`;
      col.appendChild(sep);

      const makeRow = (lbl, initTxt, getV, setV, opts) => {
        const row = document.createElement('div');
        row.className = 'eq-param-row';
        const label = document.createElement('div');
        label.className = 'eq-param-label';
        label.textContent = lbl;
        const val = document.createElement('div');
        val.className = 'eq-param-val';
        val.textContent = initTxt;
        val.title = 'Drag · scroll';
        bindDragVal(val, getV, v => { setV(v); if (this.eqEditor) this.eqEditor.draw(); }, opts);
        row.append(label, val);
        col.appendChild(row);
        return val;
      };

      const freqEl = makeRow('FREQ', fmtFreq(band.freq),
        () => band.freq,
        v  => { band.freq = v; this._onEqBandChange(tabId, bi, band); },
        { min: EQ_FMIN, max: EQ_FMAX, log: true, fmt: fmtFreq }
      );
      freqEl.addEventListener('contextmenu', e => {
        e.preventDefault(); e.stopPropagation();
        this._showParamMenu(e, {
          name: 'FREQ', unit: 'Hz', value: Math.round(band.freq), min: EQ_FMIN, max: EQ_FMAX, step: 1,
          onCommit: v => { band.freq = Math.max(EQ_FMIN, Math.min(EQ_FMAX, v)); freqEl.textContent = fmtFreq(band.freq); this._onEqBandChange(tabId, bi, band); }
        });
      });

      const gainEl = makeRow('GAIN', fmtGain(band.gain),
        () => band.gain,
        v  => { band.gain = v; this._onEqBandChange(tabId, bi, band); },
        { min: EQ_GMIN, max: EQ_GMAX, log: false, fmt: fmtGain }
      );
      gainEl.addEventListener('contextmenu', e => {
        e.preventDefault(); e.stopPropagation();
        this._showParamMenu(e, {
          name: 'GAIN', unit: 'dB', value: parseFloat(band.gain.toFixed(1)), min: EQ_GMIN, max: EQ_GMAX, step: 0.1,
          onCommit: v => { band.gain = Math.max(EQ_GMIN, Math.min(EQ_GMAX, v)); gainEl.textContent = fmtGain(band.gain); this._onEqBandChange(tabId, bi, band); }
        });
      });

      let qEl = null;
      if (band.type === 'peaking') {
        qEl = makeRow('Q', fmtQ(band.q),
          () => band.q,
          v  => { band.q = v; this._onEqBandChange(tabId, bi, band); },
          { min: 0.1, max: 10, log: true, fmt: fmtQ }
        );
        qEl.addEventListener('contextmenu', e => {
          e.preventDefault(); e.stopPropagation();
          this._showParamMenu(e, {
            name: 'Q', unit: '', value: parseFloat(band.q.toFixed(2)), min: 0.1, max: 10, step: 0.01,
            onCommit: v => { band.q = Math.max(0.1, Math.min(10, v)); qEl.textContent = fmtQ(band.q); this._onEqBandChange(tabId, bi, band); }
          });
        });
      }

      this.eqValEls.push({ freqEl, gainEl, qEl });
      strip.appendChild(col);
    });
  }

  _onEqBandChange(tabId, bi, band) {
    this._sendParam(tabId, `eq.bands.${bi}.freq`,    band.freq);
    this._sendParam(tabId, `eq.bands.${bi}.gain`,    band.gain);
    this._sendParam(tabId, `eq.bands.${bi}.q`,       band.q);
    this._sendParam(tabId, `eq.bands.${bi}.enabled`, band.enabled);

    const els = this.eqValEls?.[bi];
    if (els) {
      if (els.freqEl) els.freqEl.textContent = fmtFreq(band.freq);
      if (els.gainEl) els.gainEl.textContent = fmtGain(band.gain);
      if (els.qEl)    els.qEl.textContent    = fmtQ(band.q);
    }
    const ch = this.channels.get(tabId);
    if (ch) this._updateInsertSlot(ch.el, 'eq', ch.params.eq);
    this.eqEditor?.draw();
  }

  // ── EFFECT VISUALIZATIONS ─────────────────────────────────────────────────

  _setupEffectViz(effectKey) {
    const c = this.vizCanvas;
    if (!c) return;
    const animated = ['chorus','flanger','phaser','vibrato','tremolo'].includes(effectKey);
    const heights  = { gate: 110, expander: 110, compressor: 110,
                       tapeSat: 100, distortion: 100,
                       delay: 90, reverb: 90,
                       chorus: 90, flanger: 90, phaser: 90, vibrato: 90, tremolo: 90,
                       limiter: 110 };
    const h = heights[effectKey] ?? 100;
    c.width  = 318; // editor inner width (320px - 2px borders)
    c.height = h;
    c.style.display = 'block';
    if (animated) this.vizLfoPhase = 0;
  }

  _tickEffectViz() {
    if (!this.editorState || !this.vizCanvas || this.vizCanvas.style.display === 'none') return;
    const { tabId, effectKey } = this.editorState;
    const ch = this.channels.get(tabId);
    if (!ch) return;
    const ep   = ch.params[effectKey];
    const data = this.analyserData.get(tabId);
    const c    = this.vizCanvas;
    const g    = c.getContext('2d');
    const W = c.width, H = c.height;

    const animated = ['chorus','flanger','phaser','vibrato','tremolo'].includes(effectKey);
    if (animated) {
      const rate = ep.rate ?? 1;
      this.vizLfoPhase = (this.vizLfoPhase + (2 * Math.PI * rate) / 60) % (2 * Math.PI);
    }

    switch (effectKey) {
      case 'gate':         this._vizGate(g, W, H, ep, data); break;
      case 'expander':     this._vizExpander(g, W, H, ep, data); break;
      case 'compressor':   this._vizCompressor(g, W, H, ep, data); break;
      case 'tapeSat':      this._vizTapeSat(g, W, H, ep); break;
      case 'distortion':   this._vizDistortion(g, W, H, ep); break;
      case 'delay':        this._vizDelay(g, W, H, ep); break;
      case 'reverb':       this._vizReverb(g, W, H, ep); break;
      case 'chorus':       this._vizChorus(g, W, H, ep); break;
      case 'flanger':      this._vizFlanger(g, W, H, ep); break;
      case 'phaser':       this._vizPhaser(g, W, H, ep); break;
      case 'vibrato':      this._vizVibrato(g, W, H, ep); break;
      case 'tremolo':      this._vizTremolo(g, W, H, ep); break;
      case 'limiter':      this._vizLimiter(g, W, H, ep, data); break;
    }
  }

  // ── shared helpers ──

  _vizBg(g, W, H) {
    const bg = g.createLinearGradient(0, 0, 0, H);
    if (this._isLightTheme()) {
      bg.addColorStop(0, '#ddd8d0'); bg.addColorStop(1, '#d4cec6');
    } else {
      bg.addColorStop(0, '#07070f'); bg.addColorStop(1, '#040409');
    }
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
  }

  _vizGrMeter(g, x, y, w, h, grDb, label) {
    // grDb is ≤ 0; draw a vertical bar from top of range down
    const range = 40; // 0 to -40dB display range
    g.fillStyle = '#0d0d16'; g.fillRect(x, y, w, h);
    g.strokeStyle = '#252540'; g.lineWidth = 1; g.strokeRect(x, y, w, h);
    const frac = Math.max(0, Math.min(1, -grDb / range));
    const barH = Math.round(frac * (h - 2));
    if (barH > 0) {
      const grad = g.createLinearGradient(0, y, 0, y + h);
      grad.addColorStop(0,   '#ff3355');
      grad.addColorStop(0.5, '#f5c542');
      grad.addColorStop(1,   '#1fb86a');
      g.fillStyle = grad;
      g.fillRect(x + 1, y + 1, w - 2, barH);
    }
    // Tick marks
    g.fillStyle = '#252540';
    for (let db = 10; db <= range; db += 10) {
      const ty = y + 1 + Math.round((db / range) * (h - 2));
      g.fillRect(x, ty, w, 1);
    }
    g.fillStyle = '#5050a0'; g.font = '7px JetBrains Mono,monospace';
    g.textAlign = 'center'; g.fillText(label, x + w / 2, y + h + 9);
    g.textAlign = 'left';
  }

  _vizDbScale(g, x, y, w, h, dbMin, dbMax) {
    const dbs = [];
    for (let d = Math.ceil(dbMin / 6) * 6; d <= dbMax; d += 6) dbs.push(d);
    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#303058';
    g.textAlign = 'right';
    for (const d of dbs) {
      const ly = y + h - ((d - dbMin) / (dbMax - dbMin)) * h;
      if (ly < y || ly > y + h) continue;
      g.fillStyle = d === 0 ? '#28285a' : '#1e1e3c';
      g.fillRect(x, ly, w, 1);
      g.fillStyle = d === 0 ? '#4848a0' : '#303058';
      g.fillText(d, x - 2, ly + 3);
    }
    g.textAlign = 'left';
  }

  // ── GATE ──
  _vizGate(g, W, H, ep, data) {
    this._vizBg(g, W, H);
    const ML = 28, MR = 44, MT = 8, MB = 8;
    const DW = W - ML - MR, DH = H - MT - MB;
    const dbMin = -60, dbMax = 6;

    // Grid
    this._vizDbScale(g, ML, MT, DW, DH, dbMin, dbMax);

    // Threshold line
    const thresh = ep.threshold;
    const ty = MT + DH - ((thresh - dbMin) / (dbMax - dbMin)) * DH;
    g.strokeStyle = accentHex(); g.lineWidth = 1; g.setLineDash([4, 3]);
    g.beginPath(); g.moveTo(ML, ty); g.lineTo(ML + DW, ty); g.stroke();
    g.setLineDash([]);
    g.fillStyle = accentHex(); g.font = '8px JetBrains Mono,monospace';
    g.textAlign = 'right'; g.fillText(thresh + 'dB', ML - 4, ty + 3);
    g.textAlign = 'left';

    // Live level bar
    const peakDb = data?.peak > 0 ? 20 * Math.log10(data.peak) : -80;
    const peakFrac = Math.max(0, Math.min(1, (peakDb - dbMin) / (dbMax - dbMin)));
    const barH = Math.round(peakFrac * DH);
    if (barH > 0) {
      const grad = g.createLinearGradient(0, MT + DH, 0, MT);
      grad.addColorStop(0, '#1a6040'); grad.addColorStop(0.7, '#1fb86a');
      grad.addColorStop(0.9, '#f5c542'); grad.addColorStop(1, '#ff3355');
      g.fillStyle = grad; g.globalAlpha = 0.55;
      g.fillRect(ML + 4, MT + DH - barH, DW - 8, barH);
      g.globalAlpha = 1;
    }

    // Border
    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1;
    g.strokeRect(ML, MT, DW, DH);

    // Label
    const gateGain = data?.gateGr ?? 1;
    const grDb = gateGain > 0.0001 ? 20 * Math.log10(gateGain) : -60;
    const isOpen = gateGain > 0.5;
    g.fillStyle = isOpen ? '#1fb86a' : '#ff3355';
    g.font = 'bold 9px Barlow Condensed,sans-serif'; g.textAlign = 'center';
    g.fillText(isOpen ? 'OPEN' : 'CLOSED', ML + DW / 2, MT + 14);
    g.textAlign = 'left';

    // GR meter on right
    this._vizGrMeter(g, W - MR + 8, MT, 18, DH, grDb, 'GR');
  }

  // ── EXPANDER ──
  _vizExpander(g, W, H, ep, data) {
    this._vizBg(g, W, H);
    const ML = 28, MR = 44, MT = 8, MB = 16;
    const DW = W - ML - MR, DH = H - MT - MB;
    const dbMin = -80, dbMax = 0;

    // Grid lines
    for (let d = -60; d <= 0; d += 20) {
      const x = ML + ((d - dbMin) / (dbMax - dbMin)) * DW;
      const y = MT + DH - ((d - dbMin) / (dbMax - dbMin)) * DH;
      g.strokeStyle = d === 0 ? '#28285a' : '#131328'; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x, MT); g.lineTo(x, MT + DH); g.stroke();
      g.beginPath(); g.moveTo(ML, y); g.lineTo(ML + DW, y); g.stroke();
    }

    // 1:1 unity line
    g.strokeStyle = '#252548'; g.lineWidth = 1; g.setLineDash([3, 3]);
    g.beginPath(); g.moveTo(ML, MT + DH); g.lineTo(ML + DW, MT); g.stroke();
    g.setLineDash([]);

    // Transfer curve
    const thresh = ep.threshold, ratio = ep.ratio;
    g.beginPath(); g.strokeStyle = accentHex(); g.lineWidth = 2;
    let first = true;
    for (let xi = 0; xi <= DW; xi++) {
      const inDb = dbMin + (xi / DW) * (dbMax - dbMin);
      let outDb;
      if (inDb >= thresh) {
        outDb = inDb;
      } else {
        const gainDb = (thresh - inDb) * (1 / ratio - 1);
        outDb = inDb + gainDb;
      }
      const cx = ML + xi;
      const cy = MT + DH - Math.max(0, Math.min(1, (outDb - dbMin) / (dbMax - dbMin))) * DH;
      first ? (g.moveTo(cx, cy), first = false) : g.lineTo(cx, cy);
    }
    g.shadowColor = accentHex(); g.shadowBlur = 8; g.stroke(); g.shadowBlur = 0;

    // Threshold marker
    const tx = ML + ((thresh - dbMin) / (dbMax - dbMin)) * DW;
    g.strokeStyle = accentDimHex(); g.lineWidth = 1; g.setLineDash([3, 3]);
    g.beginPath(); g.moveTo(tx, MT); g.lineTo(tx, MT + DH); g.stroke();
    g.setLineDash([]);

    // Live input dot
    const peakDb = data?.peak > 0 ? 20 * Math.log10(data.peak) : -80;
    const clampedPeak = Math.max(dbMin, Math.min(dbMax, peakDb));
    const dotX = ML + ((clampedPeak - dbMin) / (dbMax - dbMin)) * DW;
    let dotOutDb = clampedPeak >= thresh ? clampedPeak : clampedPeak + (thresh - clampedPeak) * (1 / ratio - 1);
    const dotY = MT + DH - Math.max(0, Math.min(1, (dotOutDb - dbMin) / (dbMax - dbMin))) * DH;
    g.beginPath(); g.arc(dotX, dotY, 4, 0, Math.PI * 2);
    g.fillStyle = '#ff8833'; g.shadowColor = '#ff8833'; g.shadowBlur = 10; g.fill(); g.shadowBlur = 0;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);

    // Axis labels
    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#30305a'; g.textAlign = 'center';
    g.fillText('INPUT', ML + DW / 2, MT + DH + 13);

    const grDb = data?.expanderGr ?? 0;
    this._vizGrMeter(g, W - MR + 8, MT, 18, DH, grDb, 'GR');
  }

  // ── COMPRESSOR ──
  _vizCompressor(g, W, H, ep, data) {
    this._vizBg(g, W, H);
    const ML = 28, MR = 44, MT = 8, MB = 16;
    const DW = W - ML - MR, DH = H - MT - MB;
    const dbMin = -60, dbMax = 0;

    for (let d = -60; d <= 0; d += 12) {
      const x = ML + ((d - dbMin) / (dbMax - dbMin)) * DW;
      const y = MT + DH - ((d - dbMin) / (dbMax - dbMin)) * DH;
      g.strokeStyle = d === 0 ? '#28285a' : '#131328'; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x, MT); g.lineTo(x, MT + DH); g.stroke();
      g.beginPath(); g.moveTo(ML, y); g.lineTo(ML + DW, y); g.stroke();
    }

    // 1:1 line
    g.strokeStyle = '#252548'; g.lineWidth = 1; g.setLineDash([3, 3]);
    g.beginPath(); g.moveTo(ML, MT + DH); g.lineTo(ML + DW, MT); g.stroke();
    g.setLineDash([]);

    // Transfer curve with knee
    const { threshold: thresh, knee, ratio } = ep;
    const kHalf = knee / 2;
    g.beginPath(); g.strokeStyle = accentHex(); g.lineWidth = 2;
    let first = true;
    for (let xi = 0; xi <= DW; xi++) {
      const inDb = dbMin + (xi / DW) * (dbMax - dbMin);
      let outDb;
      if (inDb < thresh - kHalf) {
        outDb = inDb;
      } else if (inDb <= thresh + kHalf && knee > 0) {
        const t = (inDb - thresh + kHalf) / knee;
        const gainDb = ((1 / ratio - 1) * Math.pow(inDb - thresh + kHalf, 2)) / (2 * knee);
        outDb = inDb + gainDb;
      } else {
        outDb = thresh + (inDb - thresh) / ratio;
      }
      const cx = ML + xi;
      const cy = MT + DH - Math.max(0, Math.min(1, (outDb - dbMin) / (dbMax - dbMin))) * DH;
      first ? (g.moveTo(cx, cy), first = false) : g.lineTo(cx, cy);
    }
    g.shadowColor = accentHex(); g.shadowBlur = 8; g.stroke(); g.shadowBlur = 0;

    // Threshold marker
    const tx = ML + ((thresh - dbMin) / (dbMax - dbMin)) * DW;
    g.strokeStyle = accentDimHex(); g.lineWidth = 1; g.setLineDash([3, 3]);
    g.beginPath(); g.moveTo(tx, MT); g.lineTo(tx, MT + DH); g.stroke();
    g.setLineDash([]);

    // Live dot
    const peakDb = data?.peak > 0 ? 20 * Math.log10(data.peak) : -60;
    const clampedPeak = Math.max(dbMin, Math.min(dbMax, peakDb));
    const dotX = ML + ((clampedPeak - dbMin) / (dbMax - dbMin)) * DW;
    let dotOut;
    if (clampedPeak < thresh - kHalf) {
      dotOut = clampedPeak;
    } else if (clampedPeak <= thresh + kHalf && knee > 0) {
      dotOut = clampedPeak + ((1 / ratio - 1) * Math.pow(clampedPeak - thresh + kHalf, 2)) / (2 * knee);
    } else {
      dotOut = thresh + (clampedPeak - thresh) / ratio;
    }
    const dotY = MT + DH - Math.max(0, Math.min(1, (dotOut - dbMin) / (dbMax - dbMin))) * DH;
    g.beginPath(); g.arc(dotX, dotY, 4, 0, Math.PI * 2);
    g.fillStyle = '#ff8833'; g.shadowColor = '#ff8833'; g.shadowBlur = 10; g.fill(); g.shadowBlur = 0;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);
    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#30305a'; g.textAlign = 'center';
    g.fillText('INPUT', ML + DW / 2, MT + DH + 13);

    const grDb = data?.compGr ?? 0;
    this._vizGrMeter(g, W - MR + 8, MT, 18, DH, grDb, 'GR');
  }

  // ── LIMITER ──
  _vizLimiter(g, W, H, ep, data) {
    this._vizBg(g, W, H);
    const ML = 28, MR = 44, MT = 8, MB = 16;
    const DW = W - ML - MR, DH = H - MT - MB;
    const dbMin = -40, dbMax = 0;

    // Grid
    for (let d = -40; d <= 0; d += 10) {
      const x = ML + ((d - dbMin) / (dbMax - dbMin)) * DW;
      const y = MT + DH - ((d - dbMin) / (dbMax - dbMin)) * DH;
      g.strokeStyle = d === 0 ? '#28285a' : '#131328'; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x, MT); g.lineTo(x, MT + DH); g.stroke();
      g.beginPath(); g.moveTo(ML, y); g.lineTo(ML + DW, y); g.stroke();
    }

    // 1:1 unity line (dashed, dim)
    g.strokeStyle = '#252548'; g.lineWidth = 1; g.setLineDash([3, 3]);
    g.beginPath(); g.moveTo(ML, MT + DH); g.lineTo(ML + DW, MT); g.stroke();
    g.setLineDash([]);

    // Brickwall transfer curve: 1:1 below threshold, flat at threshold above
    const thresh = ep.threshold;
    g.beginPath(); g.strokeStyle = accentHex(); g.lineWidth = 2;
    let first = true;
    for (let xi = 0; xi <= DW; xi++) {
      const inDb  = dbMin + (xi / DW) * (dbMax - dbMin);
      const outDb = Math.min(inDb, thresh);
      const cx = ML + xi;
      const cy = MT + DH - Math.max(0, Math.min(1, (outDb - dbMin) / (dbMax - dbMin))) * DH;
      first ? (g.moveTo(cx, cy), first = false) : g.lineTo(cx, cy);
    }
    g.shadowColor = accentHex(); g.shadowBlur = 8; g.stroke(); g.shadowBlur = 0;

    // Threshold crosshair
    const tx = ML + ((thresh - dbMin) / (dbMax - dbMin)) * DW;
    const ty = MT + DH - ((thresh - dbMin) / (dbMax - dbMin)) * DH;
    g.strokeStyle = accentDimHex(); g.lineWidth = 1; g.setLineDash([3, 3]);
    g.beginPath(); g.moveTo(tx, MT); g.lineTo(tx, MT + DH); g.stroke();
    g.beginPath(); g.moveTo(ML, ty); g.lineTo(ML + DW, ty); g.stroke();
    g.setLineDash([]);

    // Live input dot on transfer curve
    const peakDb = data?.peak > 0 ? 20 * Math.log10(data.peak) : -40;
    const clampedPeak = Math.max(dbMin, Math.min(dbMax, peakDb));
    const dotX = ML + ((clampedPeak - dbMin) / (dbMax - dbMin)) * DW;
    const dotOutDb = Math.min(clampedPeak, thresh);
    const dotY = MT + DH - Math.max(0, Math.min(1, (dotOutDb - dbMin) / (dbMax - dbMin))) * DH;
    g.beginPath(); g.arc(dotX, dotY, 4, 0, Math.PI * 2);
    g.fillStyle = '#ff8833'; g.shadowColor = '#ff8833'; g.shadowBlur = 10; g.fill(); g.shadowBlur = 0;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);
    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#30305a'; g.textAlign = 'center';
    g.fillText('INPUT', ML + DW / 2, MT + DH + 13);
    g.textAlign = 'left';

    // GR meter showing live gain reduction
    const grDb = data?.limiterGr ?? 0;
    this._vizGrMeter(g, W - MR + 8, MT, 18, DH, grDb, 'GR');
  }

  // ── TAPE SAT ──
  _vizTapeSat(g, W, H, ep) {
    this._vizBg(g, W, H);
    const ML = 10, MR = 10, MT = 10, MB = 10;
    const DW = W - ML - MR, DH = H - MT - MB;

    // Zero lines
    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(ML, MT + DH / 2); g.lineTo(ML + DW, MT + DH / 2); g.stroke();
    g.beginPath(); g.moveTo(ML + DW / 2, MT); g.lineTo(ML + DW / 2, MT + DH); g.stroke();

    const { drive, warmth, mix } = ep;
    const k = Math.tanh(drive);
    const lpA = 0.002 + warmth * 0.08;
    let lp = 0;

    // Draw dry (faint)
    g.beginPath(); g.strokeStyle = '#252548'; g.lineWidth = 1;
    for (let xi = 0; xi <= DW; xi++) {
      const x = (xi / DW) * 2 - 1;
      const cy = MT + DH / 2 - (x * DH / 2 * 0.9);
      xi === 0 ? g.moveTo(ML + xi, cy) : g.lineTo(ML + xi, cy);
    }
    g.stroke();

    // Draw wet curve
    g.beginPath(); g.strokeStyle = accentHex(); g.lineWidth = 2;
    for (let xi = 0; xi <= DW; xi++) {
      const x = (xi / DW) * 2 - 1;
      lp = lp * (1 - lpA) + x * lpA;
      const warmed = x + lp * warmth * 0.4;
      const wet = Math.tanh(warmed * drive) / k;
      const out = x * (1 - mix) + wet * mix;
      const cy = MT + DH / 2 - (out * DH / 2 * 0.9);
      xi === 0 ? g.moveTo(ML + xi, cy) : g.lineTo(ML + xi, cy);
    }
    // Warm glow tint
    g.shadowColor = accentRgba(warmth * 0.6);
    g.shadowBlur = 8 + drive * 1.5; g.stroke(); g.shadowBlur = 0;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);
    g.font = '8px JetBrains Mono,monospace'; g.fillStyle = '#5050a0';
    g.textAlign = 'center'; g.fillText('TRANSFER CURVE', ML + DW / 2, MT + 9); g.textAlign = 'left';
  }

  // ── DISTORTION ──
  _vizDistortion(g, W, H, ep) {
    this._vizBg(g, W, H);
    const ML = 10, MR = 10, MT = 10, MB = 10;
    const DW = W - ML - MR, DH = H - MT - MB;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(ML, MT + DH / 2); g.lineTo(ML + DW, MT + DH / 2); g.stroke();
    g.beginPath(); g.moveTo(ML + DW / 2, MT); g.lineTo(ML + DW / 2, MT + DH); g.stroke();

    const raw = Math.min(ep.amount / 400, 0.9999);
    const k   = 2 * raw / (1 - raw + 1e-5);
    const mix = ep.mix;
    const mode = ep.mode;

    const overdrive = x => {
      x *= 1 + Math.min(k, 9); // matches worklet: amount = input drive, max 10x
      const abs = Math.abs(x), s = x < 0 ? -1 : 1;
      if (abs < 1/3) return s * 2 * abs;
      if (abs < 2/3) return s * (3 - (2 - 3 * abs) ** 2) / 3;
      return s;
    };
    const hardClip = x => (1 + k) * x / (1 + k * Math.abs(x));

    // Dry
    g.beginPath(); g.strokeStyle = '#252548'; g.lineWidth = 1;
    for (let xi = 0; xi <= DW; xi++) {
      const x = (xi / DW) * 2 - 1;
      const cy = MT + DH / 2 - (x * DH / 2 * 0.9);
      xi === 0 ? g.moveTo(ML + xi, cy) : g.lineTo(ML + xi, cy);
    }
    g.stroke();

    // Wet
    g.beginPath(); g.strokeStyle = mode < 0.5 ? '#ff8833' : '#ff3355'; g.lineWidth = 2;
    for (let xi = 0; xi <= DW; xi++) {
      const x = (xi / DW) * 2 - 1;
      const wet = mode < 0.5 ? overdrive(x) : hardClip(x);
      const out = x * (1 - mix) + wet * mix;
      const cy = MT + DH / 2 - (Math.max(-1, Math.min(1, out)) * DH / 2 * 0.9);
      xi === 0 ? g.moveTo(ML + xi, cy) : g.lineTo(ML + xi, cy);
    }
    g.shadowColor = mode < 0.5 ? '#ff8833' : '#ff3355'; g.shadowBlur = 6; g.stroke(); g.shadowBlur = 0;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);
    g.font = '8px JetBrains Mono,monospace'; g.fillStyle = '#5050a0';
    g.textAlign = 'center'; g.fillText('TRANSFER CURVE', ML + DW / 2, MT + 9); g.textAlign = 'left';
  }

  // ── DELAY ──
  _vizDelay(g, W, H, ep) {
    this._vizBg(g, W, H);
    const ML = 10, MR = 10, MT = 14, MB = 18;
    const DW = W - ML - MR, DH = H - MT - MB;
    const { time, feedback, mix } = ep;
    const maxTime = 2.0;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);

    // Baseline
    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(ML, MT + DH); g.lineTo(ML + DW, MT + DH); g.stroke();

    // Direct signal
    g.fillStyle = accentHex();
    const directW = Math.max(3, 6);
    g.shadowColor = accentHex(); g.shadowBlur = 8;
    g.fillRect(ML + 2, MT + 2, directW, DH - 2);
    g.shadowBlur = 0;

    // Echo taps
    let amp = mix;
    const fb = feedback;
    for (let tap = 1; amp > 0.02 && tap <= 8; tap++) {
      const tapTime = time * tap;
      if (tapTime > maxTime) break;
      const x = ML + (tapTime / maxTime) * DW;
      const tapH = Math.round(amp * (DH - 2));
      if (tapH < 1 || x > ML + DW - 3) break;
      const alpha = amp;
      g.fillStyle = accentRgba(alpha * 0.8);
      g.shadowColor = accentHex(); g.shadowBlur = alpha * 10;
      g.fillRect(x - 2, MT + DH - tapH, 4, tapH);
      g.shadowBlur = 0;
      amp *= fb;
    }

    // Time axis labels
    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#303058'; g.textAlign = 'center';
    const msLabel = Math.round(time * 1000) + 'ms';
    const tx = ML + (time / maxTime) * DW;
    g.fillStyle = accentRgba(0.5); g.fillText(msLabel, Math.min(tx, ML + DW - 16), MT + DH + 13);

    g.fillStyle = '#5050a0'; g.fillText('ECHO TAPS  (2s max)', ML + DW / 2, MT - 3);
    g.textAlign = 'left';
  }

  // ── REVERB ──
  _vizReverb(g, W, H, ep) {
    this._vizBg(g, W, H);
    const ML = 10, MR = 10, MT = 14, MB = 14;
    const DW = W - ML - MR, DH = H - MT - MB;
    const { size, decay, mix } = ep;
    const steps = DW;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);

    // Fill under decay curve
    g.beginPath(); g.moveTo(ML, MT + DH);
    for (let xi = 0; xi <= steps; xi++) {
      const t = (xi / steps) * size;
      const env = Math.exp(-t * (1 - decay * 0.95 + 0.05) * 3);
      const amp = env * mix;
      const cy = MT + DH - amp * (DH - 2);
      g.lineTo(ML + xi, cy);
    }
    g.lineTo(ML + DW, MT + DH); g.closePath();
    const fg = g.createLinearGradient(0, MT, 0, MT + DH);
    fg.addColorStop(0, 'rgba(80,80,200,0.35)'); fg.addColorStop(1, 'rgba(80,80,200,0.02)');
    g.fillStyle = fg; g.fill();

    // Decay curve line
    g.beginPath(); g.strokeStyle = '#8888e8'; g.lineWidth = 2;
    for (let xi = 0; xi <= steps; xi++) {
      const t = (xi / steps) * size;
      const env = Math.exp(-t * (1 - decay * 0.95 + 0.05) * 3);
      const amp = env * mix;
      const cy = MT + DH - amp * (DH - 2);
      xi === 0 ? g.moveTo(ML, cy) : g.lineTo(ML + xi, cy);
    }
    g.shadowColor = '#8888e8'; g.shadowBlur = 8; g.stroke(); g.shadowBlur = 0;

    // Duration label
    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#5050a0'; g.textAlign = 'center';
    g.fillText(`${size.toFixed(1)}s  DECAY`, ML + DW / 2, MT - 3);
    g.textAlign = 'left';
  }

  // ── CHORUS ──
  _vizChorus(g, W, H, ep) {
    this._vizBg(g, W, H);
    const ML = 10, MR = 10, MT = 14, MB = 10;
    const DW = W - ML - MR, DH = H - MT - MB;
    const { rate, depth, mix } = ep;
    const cycles = 2;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);

    // Zero line
    g.strokeStyle = '#1e1e3c'; g.beginPath();
    g.moveTo(ML, MT + DH / 2); g.lineTo(ML + DW, MT + DH / 2); g.stroke();

    // Fill
    g.beginPath(); g.moveTo(ML, MT + DH / 2);
    for (let xi = 0; xi <= DW; xi++) {
      const ph = this.vizLfoPhase + (xi / DW) * cycles * Math.PI * 2;
      const lfo = Math.sin(ph);
      const cy = MT + DH / 2 - lfo * (DH / 2 - 4) * (depth / 20) * mix;
      g.lineTo(ML + xi, cy);
    }
    g.lineTo(ML + DW, MT + DH / 2); g.closePath();
    const fg = g.createLinearGradient(0, MT, 0, MT + DH);
    fg.addColorStop(0, 'rgba(34,221,170,0.2)'); fg.addColorStop(1, 'rgba(34,221,170,0.02)');
    g.fillStyle = fg; g.fill();

    // Line
    g.beginPath(); g.strokeStyle = '#22ddaa'; g.lineWidth = 2;
    for (let xi = 0; xi <= DW; xi++) {
      const ph = this.vizLfoPhase + (xi / DW) * cycles * Math.PI * 2;
      const lfo = Math.sin(ph);
      const cy = MT + DH / 2 - lfo * (DH / 2 - 4) * (depth / 20) * mix;
      xi === 0 ? g.moveTo(ML, cy) : g.lineTo(ML + xi, cy);
    }
    g.shadowColor = '#22ddaa'; g.shadowBlur = 8; g.stroke(); g.shadowBlur = 0;

    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#5050a0'; g.textAlign = 'center';
    g.fillText(`LFO  ${rate.toFixed(1)}Hz`, ML + DW / 2, MT - 3); g.textAlign = 'left';
  }

  // ── FLANGER ──
  _vizFlanger(g, W, H, ep) {
    this._vizBg(g, W, H);
    const ML = 10, MR = 10, MT = 14, MB = 10;
    const DW = W - ML - MR, DH = H - MT - MB;
    const { rate, depth, feedback, mix } = ep;
    const cycles = 2;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);
    g.strokeStyle = '#1e1e3c'; g.beginPath();
    g.moveTo(ML, MT + DH / 2); g.lineTo(ML + DW, MT + DH / 2); g.stroke();

    // Flanger sweep — show delay time as offset from center
    const maxDepth = depth / 10; // normalized
    g.beginPath(); g.strokeStyle = '#4488ff'; g.lineWidth = 2;
    for (let xi = 0; xi <= DW; xi++) {
      const ph = this.vizLfoPhase + (xi / DW) * cycles * Math.PI * 2;
      const lfo = (Math.sin(ph) + 1) * 0.5;
      const offset = lfo * maxDepth;
      const cy = MT + DH / 2 - (offset - maxDepth / 2) * (DH - 8) * mix;
      xi === 0 ? g.moveTo(ML, cy) : g.lineTo(ML + xi, cy);
    }
    g.shadowColor = '#4488ff'; g.shadowBlur = 8; g.stroke(); g.shadowBlur = 0;

    // Feedback echo (faint secondary)
    if (Math.abs(feedback) > 0.1) {
      g.beginPath(); g.strokeStyle = `rgba(68,136,255,${Math.abs(feedback) * 0.3})`; g.lineWidth = 1;
      for (let xi = 0; xi <= DW; xi++) {
        const ph = this.vizLfoPhase + (xi / DW) * cycles * Math.PI * 2 + Math.PI * 0.25;
        const lfo = (Math.sin(ph) + 1) * 0.5;
        const offset = lfo * maxDepth;
        const cy = MT + DH / 2 - (offset - maxDepth / 2) * (DH - 8) * 0.6;
        xi === 0 ? g.moveTo(ML, cy) : g.lineTo(ML + xi, cy);
      }
      g.stroke();
    }

    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#5050a0'; g.textAlign = 'center';
    g.fillText(`SWEEP  ${rate.toFixed(2)}Hz`, ML + DW / 2, MT - 3); g.textAlign = 'left';
  }

  // ── PHASER ──
  _vizPhaser(g, W, H, ep) {
    this._vizBg(g, W, H);
    const ML = 28, MR = 10, MT = 14, MB = 18;
    const DW = W - ML - MR, DH = H - MT - MB;
    const { rate, depth, feedback } = ep;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);

    // Draw phase response: 4 all-pass stages
    // Compute the swept notch frequency from current LFO phase
    const lfo = (Math.sin(this.vizLfoPhase) + 1) * 0.5;
    const notchFreq = 100 + lfo * depth * 7900;
    const SR = 48000;
    const FMIN = 20, FMAX = 20000;

    // Draw combined phase response magnitude
    g.beginPath(); g.strokeStyle = '#cc44bb'; g.lineWidth = 2;
    let first = true;
    for (let xi = 0; xi <= DW; xi++) {
      const f = FMIN * Math.pow(FMAX / FMIN, xi / DW);
      const t = Math.tan(Math.PI * Math.min(notchFreq, SR * 0.45) / SR);
      const a = (t - 1) / (t + 1);
      // Simplified 4-stage all-pass magnitude: always 1.0, but phase creates notch in output
      // Approximate the comb effect with a notch pattern
      const df = Math.abs(Math.log2(f / notchFreq));
      const notchDepth = Math.exp(-df * 3) * Math.abs(feedback);
      const mag = 1 - notchDepth * 0.8;
      const dbVal = 20 * Math.log10(Math.max(0.01, mag));
      const dbMin = -20, dbMax = 3;
      const cy = MT + DH - ((dbVal - dbMin) / (dbMax - dbMin)) * DH;
      const cyClamped = Math.max(MT, Math.min(MT + DH, cy));
      first ? (g.moveTo(ML + xi, cyClamped), first = false) : g.lineTo(ML + xi, cyClamped);
    }
    g.shadowColor = '#cc44bb'; g.shadowBlur = 8; g.stroke(); g.shadowBlur = 0;

    // Notch frequency marker
    const notchX = ML + Math.max(0, Math.min(1, Math.log(notchFreq / FMIN) / Math.log(FMAX / FMIN))) * DW;
    g.strokeStyle = '#cc44bb40'; g.lineWidth = 1; g.setLineDash([2, 3]);
    g.beginPath(); g.moveTo(notchX, MT); g.lineTo(notchX, MT + DH); g.stroke();
    g.setLineDash([]);

    // dB scale
    this._vizDbScale(g, ML, MT, DW, DH, -20, 3);

    // Freq axis
    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#30305a'; g.textAlign = 'center';
    for (const [f, lbl] of [[100,'100'],[1000,'1k'],[10000,'10k']]) {
      const x = ML + Math.log(f / FMIN) / Math.log(FMAX / FMIN) * DW;
      g.fillText(lbl, x, MT + DH + 12);
    }
    g.fillStyle = '#5050a0'; g.fillText(`NOTCH  ${rate.toFixed(2)}Hz`, ML + DW / 2, MT - 3);
    g.textAlign = 'left';
  }

  // ── VIBRATO ──
  _vizVibrato(g, W, H, ep) {
    this._vizBg(g, W, H);
    const ML = 10, MR = 10, MT = 14, MB = 10;
    const DW = W - ML - MR, DH = H - MT - MB;
    const { rate, depth } = ep;
    const cycles = 2;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);
    g.strokeStyle = '#1e1e3c'; g.beginPath();
    g.moveTo(ML, MT + DH / 2); g.lineTo(ML + DW, MT + DH / 2); g.stroke();

    const maxPitch = depth / 20; // normalized pitch deviation

    g.beginPath(); g.moveTo(ML, MT + DH / 2);
    for (let xi = 0; xi <= DW; xi++) {
      const ph = this.vizLfoPhase + (xi / DW) * cycles * Math.PI * 2;
      const cy = MT + DH / 2 - Math.sin(ph) * (DH / 2 - 4) * maxPitch;
      g.lineTo(ML + xi, cy);
    }
    g.lineTo(ML + DW, MT + DH / 2); g.closePath();
    const fg = g.createLinearGradient(0, MT, 0, MT + DH);
    fg.addColorStop(0, 'rgba(255,136,51,0.2)'); fg.addColorStop(1, 'rgba(255,136,51,0.02)');
    g.fillStyle = fg; g.fill();

    g.beginPath(); g.strokeStyle = '#ff8833'; g.lineWidth = 2;
    for (let xi = 0; xi <= DW; xi++) {
      const ph = this.vizLfoPhase + (xi / DW) * cycles * Math.PI * 2;
      const cy = MT + DH / 2 - Math.sin(ph) * (DH / 2 - 4) * maxPitch;
      xi === 0 ? g.moveTo(ML, cy) : g.lineTo(ML + xi, cy);
    }
    g.shadowColor = '#ff8833'; g.shadowBlur = 8; g.stroke(); g.shadowBlur = 0;

    // Pitch labels
    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#5050a0'; g.textAlign = 'center';
    g.fillText(`PITCH LFO  ${rate.toFixed(1)}Hz  ±${depth}ms`, ML + DW / 2, MT - 3);
    g.textAlign = 'left';
  }

  // ── TREMOLO ──
  _vizTremolo(g, W, H, ep) {
    this._vizBg(g, W, H);
    const ML = 10, MR = 10, MT = 14, MB = 10;
    const DW = W - ML - MR, DH = H - MT - MB;
    const { rate, depth, shape } = ep;
    const cycles = 2;

    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.strokeRect(ML, MT, DW, DH);

    const lfoFn = ph => shape < 0.5
      ? Math.sin(ph)
      : (ph % (Math.PI * 2) < Math.PI ? 1 : -1);

    // Fill
    g.beginPath(); g.moveTo(ML, MT + DH);
    for (let xi = 0; xi <= DW; xi++) {
      const ph = this.vizLfoPhase + (xi / DW) * cycles * Math.PI * 2;
      const lfo = lfoFn(ph);
      const amp = 1 - depth * (1 - (lfo + 1) * 0.5);
      const cy = MT + DH - amp * (DH - 4);
      g.lineTo(ML + xi, cy);
    }
    g.lineTo(ML + DW, MT + DH); g.closePath();
    const fg = g.createLinearGradient(0, MT, 0, MT + DH);
    fg.addColorStop(0, accentRgba(0.25)); fg.addColorStop(1, accentRgba(0.03));
    g.fillStyle = fg; g.fill();

    // Line
    g.beginPath(); g.strokeStyle = accentHex(); g.lineWidth = 2;
    for (let xi = 0; xi <= DW; xi++) {
      const ph = this.vizLfoPhase + (xi / DW) * cycles * Math.PI * 2;
      const lfo = lfoFn(ph);
      const amp = 1 - depth * (1 - (lfo + 1) * 0.5);
      const cy = MT + DH - amp * (DH - 4);
      xi === 0 ? g.moveTo(ML, cy) : g.lineTo(ML + xi, cy);
    }
    g.shadowColor = accentHex(); g.shadowBlur = 8; g.stroke(); g.shadowBlur = 0;

    g.font = '7px JetBrains Mono,monospace'; g.fillStyle = '#5050a0'; g.textAlign = 'center';
    g.fillText(`${shape < 0.5 ? 'SINE' : 'SQUARE'}  ${rate.toFixed(1)}Hz`, ML + DW / 2, MT - 3);
    g.textAlign = 'left';
  }

  // ── STEREO IMAGER ──
  _drawStereoViz(canvas, width) {
    if (!canvas) return;
    const W = canvas.width, H = canvas.height;
    const g = canvas.getContext('2d');
    this._vizBg(g, W, H);

    // Listener at the bottom-center; field spreads upward
    const cx = W / 2;
    const cy = H - 2;
    const r  = W / 2 - 4;

    const light = this._isLightTheme();

    // Background dome (upper semicircle — counterclockwise from left to right)
    g.beginPath(); g.arc(cx, cy, r, Math.PI, 0, true);
    g.strokeStyle = light ? '#bdb7ae' : '#1e1e3c'; g.lineWidth = 1; g.stroke();

    // Center vertical guide up to the dome apex
    g.strokeStyle = light ? '#b0a898' : '#28285a'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx, cy - r); g.stroke();

    const maxAngle = Math.PI * 0.45;
    const w      = Math.min(2, width);
    const spread = maxAngle * w / 2;

    // Arms anchor at straight-up (3π/2) and spread outward as width increases
    const leftAngle  = 3 * Math.PI / 2 - spread; // sweeps left
    const rightAngle = 3 * Math.PI / 2 + spread; // sweeps right

    // Fill wedges between center line and each arm
    g.beginPath(); g.moveTo(cx, cy);
    g.arc(cx, cy, r, 3 * Math.PI / 2, leftAngle, true);
    g.closePath();
    g.fillStyle = 'rgba(68,136,255,0.12)'; g.fill();

    g.beginPath(); g.moveTo(cx, cy);
    g.arc(cx, cy, r, 3 * Math.PI / 2, rightAngle, false);
    g.closePath();
    g.fillStyle = 'rgba(68,136,255,0.12)'; g.fill();

    // L/R arm endpoints
    const lx  = cx + r * Math.cos(leftAngle);
    const ly  = cy + r * Math.sin(leftAngle);
    const rx2 = cx + r * Math.cos(rightAngle);
    const ry2 = cy + r * Math.sin(rightAngle);

    g.strokeStyle = '#4488ff'; g.lineWidth = 2;
    g.shadowColor = '#4488ff'; g.shadowBlur = 8;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(lx, ly); g.stroke();
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(rx2, ry2); g.stroke();
    g.shadowBlur = 0;

    // L/R labels — skip near-mono to avoid overlap
    if (w > 0.05) {
      g.font = 'bold 9px Barlow Condensed,sans-serif'; g.textAlign = 'center';
      g.fillStyle = '#4488ff';
      g.fillText('L', Math.max(6, lx - 8),      Math.min(H - 4, Math.max(12, ly + 5)));
      g.fillText('R', Math.min(W - 6, rx2 + 8), Math.min(H - 4, Math.max(12, ry2 + 5)));
    }
    g.textAlign = 'left';
  }

  _vizStereoImager(g, W, H, ep) {
    this._vizBg(g, W, H);
    const cx = W / 2, cy = H / 2;
    const { width } = ep;

    // Background arc
    g.beginPath(); g.arc(cx, cy, cy - 8, Math.PI, 0);
    g.strokeStyle = '#1e1e3c'; g.lineWidth = 1; g.stroke();

    // Center
    g.strokeStyle = '#28285a'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx, 8); g.stroke();

    const maxAngle = Math.PI * 0.45;
    const lAngle  = Math.PI + maxAngle * Math.min(2, width) / 2;
    const rAngle  = -maxAngle * Math.min(2, width) / 2;
    const r = cy - 10;

    // Fill wedge
    g.beginPath(); g.moveTo(cx, cy);
    g.arc(cx, cy, r, Math.PI, Math.PI + maxAngle * Math.min(2, width) / 2, false);
    g.closePath();
    g.fillStyle = 'rgba(68,136,255,0.12)'; g.fill();
    g.beginPath(); g.moveTo(cx, cy);
    g.arc(cx, cy, r, 0, -maxAngle * Math.min(2, width) / 2, true);
    g.closePath();
    g.fillStyle = 'rgba(68,136,255,0.12)'; g.fill();

    // L/R arms
    const lx = cx + r * Math.cos(Math.PI + maxAngle * Math.min(2, width) / 2);
    const ly = cy + r * Math.sin(Math.PI + maxAngle * Math.min(2, width) / 2);
    const rx2 = cx + r * Math.cos(-maxAngle * Math.min(2, width) / 2);
    const ry2 = cy + r * Math.sin(-maxAngle * Math.min(2, width) / 2);

    g.strokeStyle = '#4488ff'; g.lineWidth = 2;
    g.shadowColor = '#4488ff'; g.shadowBlur = 10;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(lx, ly); g.stroke();
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(rx2, ry2); g.stroke();
    g.shadowBlur = 0;

    // Labels
    g.font = 'bold 9px Barlow Condensed,sans-serif'; g.textAlign = 'center';
    g.fillStyle = '#4488ff';
    g.fillText('L', lx - 6, ly + 4);
    g.fillText('R', rx2 + 6, ry2 + 4);
    g.fillStyle = '#5050a0';
    g.fillText(`WIDTH  ${Math.round(width * 100)}%`, cx, H - 4);
    g.textAlign = 'left';
  }

  _escHtml(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── ZOOM ──────────────────────────────────────────────────────────────────

  _initZoom() {
    const STEPS   = [70, 80, 90, 100, 110, 120, 130];
    const target  = document.getElementById('mixer-wrapper');
    const levelEl = document.getElementById('zoom-level');
    const btnIn   = document.getElementById('btn-zoom-in');
    const btnOut  = document.getElementById('btn-zoom-out');

    const saved = localStorage.getItem('ff-zoom');
    let current;
    if (saved !== null) {
      current = parseInt(saved, 10);
      if (!STEPS.includes(current)) current = 100;
    } else {
      const h = window.innerHeight;
      current = h < 900 ? 80 : h < 1200 ? 90 : 100;
    }

    const apply = () => {
      target.style.zoom    = current / 100;
      levelEl.textContent  = current + '%';
      btnOut.disabled      = current <= STEPS[0];
      btnIn.disabled       = current >= STEPS[STEPS.length - 1];
      localStorage.setItem('ff-zoom', current);
    };

    btnIn.addEventListener('click', () => {
      const i = STEPS.indexOf(current);
      if (i < STEPS.length - 1) { current = STEPS[i + 1]; apply(); }
    });
    btnOut.addEventListener('click', () => {
      const i = STEPS.indexOf(current);
      if (i > 0) { current = STEPS[i - 1]; apply(); }
    });

    apply();
  }

  // ── THEME ENGINE ─────────────────────────────────────────────────────────

  _initTheme() {
    // Build swatches
    const swatchContainer = document.getElementById('theme-swatches');
    for (const [key, theme] of Object.entries(THEMES)) {
      const swatch = document.createElement('div');
      swatch.className = 'theme-swatch';
      swatch.dataset.theme = key;
      const dot = document.createElement('div');
      dot.className = 'theme-swatch-dot';
      dot.style.background = theme.swatch;
      dot.style.boxShadow  = `0 0 8px ${theme.swatch}80`;
      const label = document.createElement('span');
      label.className = 'theme-swatch-label';
      label.textContent = theme.label;
      swatch.append(dot, label);
      swatch.addEventListener('click', () => this._applyTheme(key));
      swatchContainer.appendChild(swatch);
    }

    // Theme toggle button
    const btnTheme = document.getElementById('btn-theme');
    const panel    = document.getElementById('theme-panel');
    btnTheme.addEventListener('click', () => {
      const hidden = panel.classList.toggle('hidden');
      btnTheme.classList.toggle('active', !hidden);
    });
    document.getElementById('btn-theme-close').addEventListener('click', () => {
      panel.classList.add('hidden');
      btnTheme.classList.remove('active');
    });

    // Accent picker
    const picker   = document.getElementById('accent-picker');
    const hexLabel = document.getElementById('accent-hex');
    picker.addEventListener('input', () => {
      hexLabel.textContent = picker.value;
      this._applyAccentColor(picker.value);
    });

    // Reset accent to current theme default
    document.getElementById('btn-reset-accent').addEventListener('click', () => {
      const theme = THEMES[this._currentThemeKey] || THEMES.obsidian;
      const def   = theme.vars['--accent'];
      picker.value = def;
      hexLabel.textContent = def;
      this._applyAccentColor(def);
    });

    // Close panel on outside click
    document.addEventListener('click', e => {
      if (!panel.contains(e.target) && e.target !== btnTheme)
        panel.classList.add('hidden'), btnTheme.classList.remove('active');
    }, true);
  }

  _applyTheme(key, savePrefs = true) {
    const theme = THEMES[key];
    if (!theme) return;
    this._currentThemeKey = key;
    const root = document.documentElement;
    root.dataset.theme = key;
    for (const [prop, val] of Object.entries(theme.vars))
      root.style.setProperty(prop, val);
    _setAccentGlobals(theme.vars['--accent'], theme.vars['--accent-dim']);
    this._injectFaderStyle(theme.vars['--accent'], theme.vars['--accent-hi'], theme.vars['--accent-dim']);

    // Update swatch active state
    document.querySelectorAll('.theme-swatch').forEach(el =>
      el.classList.toggle('active', el.dataset.theme === key)
    );
    // Sync accent picker
    const picker = document.getElementById('accent-picker');
    const hexEl  = document.getElementById('accent-hex');
    if (picker) { picker.value = theme.vars['--accent']; }
    if (hexEl)  { hexEl.textContent = theme.vars['--accent']; }

    this._redrawKnobs();
    this._redrawStereoVizzes();
    this._markAllDirty();
    if (this.eqEditor) this.eqEditor.draw();
    if (savePrefs) this._saveThemePrefs();
  }

  _redrawStereoVizzes() {
    for (const [, ch] of this.channels) {
      const canvas = ch.el.querySelector('.stereo-viz-canvas');
      if (canvas) this._drawStereoViz(canvas, ch.params.stereoImager?.width ?? 1.0);
    }
  }

  _applyAccentColor(hex, savePrefs = true) {
    const { hi, dim } = this._deriveAccentVariants(hex);
    const root = document.documentElement;
    root.style.setProperty('--accent',     hex);
    root.style.setProperty('--accent-hi',  hi);
    root.style.setProperty('--accent-dim', dim);
    _setAccentGlobals(hex, dim);
    this._injectFaderStyle(hex, hi, dim);
    this._redrawKnobs();
    this._markAllDirty();
    if (savePrefs) this._saveThemePrefs();
  }

  _injectFaderStyle(accent, accentHi, accentDim) {
    let el = document.getElementById('theme-fader-style');
    if (!el) { el = document.createElement('style'); el.id = 'theme-fader-style'; document.head.appendChild(el); }
    const peak = this._lightenColor(accentHi, 1.2);
    el.textContent = `
.fader::-moz-range-thumb {
  background: linear-gradient(to bottom,
    #4a4a62 0%, #3c3c52 15%, #343448 43%,
    ${accentDim} 43%, ${accent} 47%, ${accentHi} 50%,
    ${accent} 53%, ${accentDim} 57%,
    #2a2a3e 57%, #20202e 85%, #18182a 100%) !important;
}
.fader::-moz-range-thumb:hover {
  background: linear-gradient(to bottom,
    #585870 0%, #484860 15%, #3e3e56 43%,
    ${accent} 43%, ${accentHi} 47%, ${peak} 50%,
    ${accentHi} 53%, ${accent} 57%,
    #323248 57%, #262638 85%, #1e1e2e 100%) !important;
}`;
  }

  async _loadThemePrefs() {
    try {
      const data = await browser.storage.local.get(['themeKey','accentColor']);
      const key  = data.themeKey || 'obsidian';
      this._applyTheme(key, false);
      if (data.accentColor && data.accentColor !== THEMES[key]?.vars['--accent'])
        this._applyAccentColor(data.accentColor, false);
    } catch (_) {
      this._applyTheme('obsidian', false);
    }
  }

  _saveThemePrefs() {
    const accent = document.documentElement.style.getPropertyValue('--accent') ||
                   THEMES[this._currentThemeKey]?.vars['--accent'] || '#d4870a';
    browser.storage.local.set({ themeKey: this._currentThemeKey, accentColor: accent }).catch(() => {});
  }

  _deriveAccentVariants(hex) {
    const r = parseInt(hex.slice(1,3),16)/255;
    const g = parseInt(hex.slice(3,5),16)/255;
    const b = parseInt(hex.slice(5,7),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h = 0, s = 0;
    const l = (max+min)/2;
    if (max !== min) {
      const d = max-min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      switch (max) {
        case r: h = (g-b)/d + (g<b ? 6 : 0); break;
        case g: h = (b-r)/d + 2; break;
        case b: h = (r-g)/d + 4; break;
      }
      h /= 6;
    }
    const toHex = (hh, ss, ll) => {
      ss /= 100; ll /= 100;
      const a = ss * Math.min(ll, 1-ll);
      const f = n => { const k=(n+hh*12)%12; return Math.min(255,Math.max(0,Math.round(255*(ll-a*Math.max(-1,Math.min(k-3,9-k,1)))))).toString(16).padStart(2,'0'); };
      return `#${f(0)}${f(8)}${f(4)}`;
    };
    const hs = h*360, ss = s*100, ls = l*100;
    return {
      hi:  toHex(hs, Math.min(100, ss * 1.05), Math.min(85, ls * 1.4)),
      dim: toHex(hs, ss * 0.85, ls * 0.5),
    };
  }

  _redrawKnobs() {
    this.masterKnob?.draw();
    for (const ch of this.channels.values()) ch.knob?.draw();
  }

  _lightenColor(hex, factor) {
    const r = Math.min(255, Math.round(parseInt(hex.slice(1,3),16) * factor));
    const g = Math.min(255, Math.round(parseInt(hex.slice(3,5),16) * factor));
    const b = Math.min(255, Math.round(parseInt(hex.slice(5,7),16) * factor));
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  }
}

const console_ = new AudioConsole();
window.addEventListener('load', () => console_.init());
