class GateProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled',   defaultValue: 0,     minValue: 0, maxValue: 1 },
      { name: 'threshold', defaultValue: -40,   minValue: -100, maxValue: 0 },
      { name: 'attack',    defaultValue: 0.001, minValue: 0.0001, maxValue: 1 },
      { name: 'hold',      defaultValue: 0.05,  minValue: 0,      maxValue: 2 },
      { name: 'release',   defaultValue: 0.1,   minValue: 0.001,  maxValue: 4 }
    ];
  }

  constructor() {
    super();
    this.gain = 0;
    this.holdLeft = 0;
    this._tick = 0;
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length) return true;

    const enabled   = parameters.enabled[0];

    if (!enabled) {
      for (let ch = 0; ch < out.length; ch++) out[ch].set(inp[ch] ?? inp[0]);
      return true;
    }

    const threshold = Math.pow(10, parameters.threshold[0] / 20);
    const atkCoef   = Math.exp(-1 / (sampleRate * parameters.attack[0]));
    const relCoef   = Math.exp(-1 / (sampleRate * parameters.release[0]));
    const holdMax   = Math.floor(sampleRate * parameters.hold[0]);
    const blockSize = inp[0].length;

    for (let i = 0; i < blockSize; i++) {
      // Stereo-linked detection: one gain trajectory shared by all channels
      let level = 0;
      for (let ch = 0; ch < inp.length; ch++) {
        const a = Math.abs(inp[ch][i]);
        if (a > level) level = a;
      }
      if (level >= threshold) {
        this.holdLeft = holdMax;
        this.gain = this.gain * atkCoef + (1 - atkCoef);
      } else if (this.holdLeft > 0) {
        this.holdLeft--;
      } else {
        this.gain = this.gain * relCoef;
      }
      for (let ch = 0; ch < out.length; ch++) {
        const ic = inp[ch] ?? inp[0];
        out[ch][i] = ic[i] * this.gain;
      }
    }
    if (++this._tick >= 20) {
      this._tick = 0;
      this.port.postMessage({ type: 'gr', gain: this.gain });
    }
    return true;
  }
}
registerProcessor('gate-processor', GateProcessor);
