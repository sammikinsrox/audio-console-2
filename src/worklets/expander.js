class ExpanderProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled',   defaultValue: 0,     minValue: 0, maxValue: 1 },
      { name: 'threshold', defaultValue: -40,   minValue: -100, maxValue: 0 },
      { name: 'ratio',     defaultValue: 2,     minValue: 1,    maxValue: 20 },
      { name: 'attack',    defaultValue: 0.001, minValue: 0.0001, maxValue: 1 },
      { name: 'release',   defaultValue: 0.1,   minValue: 0.001,  maxValue: 4 }
    ];
  }

  constructor() {
    super();
    this.envelope = -100;
    this._lastGainDb = 0;
    this._tick = 0;
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length) return true;

    const enabled   = parameters.enabled[0];
    const threshold = parameters.threshold[0];
    const ratio     = parameters.ratio[0];
    const atkCoef   = Math.exp(-1 / (sampleRate * parameters.attack[0]));
    const relCoef   = Math.exp(-1 / (sampleRate * parameters.release[0]));

    for (let ch = 0; ch < out.length; ch++) {
      const ic = inp[ch] ?? inp[0];
      const oc = out[ch];
      for (let i = 0; i < oc.length; i++) {
        if (!enabled) { oc[i] = ic[i]; continue; }
        const abs = Math.abs(ic[i]);
        const levelDb = abs > 0 ? 20 * Math.log10(abs) : -120;
        const coef = levelDb > this.envelope ? atkCoef : relCoef;
        this.envelope = this.envelope * coef + levelDb * (1 - coef);
        let gainDb = 0;
        if (this.envelope < threshold) {
          gainDb = (threshold - this.envelope) * (1 / ratio - 1);
        }
        this._lastGainDb = gainDb;
        oc[i] = ic[i] * Math.pow(10, gainDb / 20);
      }
    }
    if (++this._tick >= 20) {
      this._tick = 0;
      this.port.postMessage({ type: 'gr', gainDb: this._lastGainDb });
    }
    return true;
  }
}
registerProcessor('expander-processor', ExpanderProcessor);
