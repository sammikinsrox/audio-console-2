class FlangerProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled',  defaultValue: 0,    minValue: 0,     maxValue: 1 },
      { name: 'rate',     defaultValue: 0.5,  minValue: 0.01,  maxValue: 5 },
      { name: 'depth',    defaultValue: 3,    minValue: 0,     maxValue: 10 }, // ms
      { name: 'feedback', defaultValue: 0.7,  minValue: -0.99, maxValue: 0.99 },
      { name: 'mix',      defaultValue: 0.5,  minValue: 0,     maxValue: 1 }
    ];
  }

  constructor() {
    super();
    const sz = Math.ceil(sampleRate * 0.025);
    this.buf = [new Float32Array(sz), new Float32Array(sz)];
    this.wr = 0;
    this.ph = 0;
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length) return true;

    const enabled  = parameters.enabled[0];
    const rate     = parameters.rate[0];
    const depth    = (parameters.depth[0] / 1000) * sampleRate;
    const feedback = parameters.feedback[0];
    const mix      = parameters.mix[0];
    const sz       = this.buf[0].length;
    const dPh      = (2 * Math.PI * rate) / sampleRate;

    for (let i = 0; i < 128; i++) {
      this.ph = (this.ph + dPh) % (2 * Math.PI);
      const delay = ((Math.sin(this.ph) + 1) * 0.5) * depth + 1;
      const ri = (this.wr - Math.floor(delay) + sz) % sz;

      for (let ch = 0; ch < Math.min(out.length, 2); ch++) {
        const ic = inp[ch] ?? inp[0];
        const delayed = this.buf[ch][ri];
        this.buf[ch][this.wr] = ic[i] + delayed * feedback;
        out[ch][i] = enabled
          ? ic[i] * (1 - mix) + delayed * mix
          : ic[i];
      }
      this.wr = (this.wr + 1) % sz;
    }
    return true;
  }
}
registerProcessor('flanger-processor', FlangerProcessor);
