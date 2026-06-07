class TremoloProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled', defaultValue: 0,   minValue: 0,   maxValue: 1 },
      { name: 'rate',    defaultValue: 4,   minValue: 0.1, maxValue: 20 },
      { name: 'depth',   defaultValue: 0.8, minValue: 0,   maxValue: 1 },
      { name: 'shape',   defaultValue: 0,   minValue: 0,   maxValue: 1 } // 0=sine 1=square
    ];
  }

  constructor() {
    super();
    this.ph = 0;
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length) return true;

    const enabled = parameters.enabled[0];
    const rate    = parameters.rate[0];
    const depth   = parameters.depth[0];
    const shape   = parameters.shape[0];
    const dPh     = (2 * Math.PI * rate) / sampleRate;

    for (let i = 0; i < 128; i++) {
      this.ph = (this.ph + dPh) % (2 * Math.PI);
      const lfo   = shape < 0.5 ? Math.sin(this.ph) : (this.ph < Math.PI ? 1 : -1);
      const amp   = 1 - depth * (1 - (lfo + 1) * 0.5);

      for (let ch = 0; ch < out.length; ch++) {
        const ic = inp[ch] ?? inp[0];
        out[ch][i] = enabled ? ic[i] * amp : ic[i];
      }
    }
    return true;
  }
}
registerProcessor('tremolo-processor', TremoloProcessor);
