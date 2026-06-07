class LimiterProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled',   defaultValue: 0,      minValue: 0,       maxValue: 1 },
      { name: 'threshold', defaultValue: -1,      minValue: -40,     maxValue: 0 },
      { name: 'attack',    defaultValue: 0.0001,  minValue: 0.00001, maxValue: 0.005 },
      { name: 'release',   defaultValue: 0.1,     minValue: 0.01,    maxValue: 2 }
    ];
  }

  constructor() {
    super();
    this.gain  = 1;
    this._tick = 0;
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length || !out?.length) return true;

    const enabled   = parameters.enabled[0];
    const threshold = Math.pow(10, parameters.threshold[0] / 20);
    const atkCoef   = Math.exp(-1 / (sampleRate * parameters.attack[0]));
    const relCoef   = Math.exp(-1 / (sampleRate * parameters.release[0]));
    const numCh     = Math.min(inp.length, out.length);
    const blockSize = inp[0]?.length ?? 0;

    for (let i = 0; i < blockSize; i++) {
      if (!enabled) {
        for (let ch = 0; ch < numCh; ch++) out[ch][i] = inp[ch][i];
        continue;
      }

      // Stereo-linked peak detection
      let peak = 0;
      for (let ch = 0; ch < inp.length; ch++) {
        const s = Math.abs(inp[ch][i]);
        if (s > peak) peak = s;
      }

      const desired = peak > threshold ? threshold / Math.max(peak, 1e-10) : 1;

      if (desired < this.gain) {
        // Attack: smooth toward reduction
        this.gain = this.gain * atkCoef + desired * (1 - atkCoef);
        // Hard brickwall ceiling: never let gain exceed what's needed
        if (peak * this.gain > threshold) this.gain = threshold / Math.max(peak, 1e-10);
      } else {
        // Release: smooth return to unity
        this.gain = this.gain * relCoef + desired * (1 - relCoef);
      }

      for (let ch = 0; ch < numCh; ch++) out[ch][i] = inp[ch][i] * this.gain;
    }

    if (++this._tick >= 20) {
      this._tick = 0;
      this.port.postMessage({ type: 'gr', gainDb: this.gain < 1 ? 20 * Math.log10(this.gain) : 0 });
    }
    return true;
  }
}
registerProcessor('limiter-processor', LimiterProcessor);
