class ChorusProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled', defaultValue: 0,   minValue: 0,   maxValue: 1 },
      { name: 'rate',    defaultValue: 1.5, minValue: 0.1, maxValue: 10 },
      { name: 'depth',   defaultValue: 3,   minValue: 0,   maxValue: 20 }, // ms
      { name: 'mix',     defaultValue: 0.5, minValue: 0,   maxValue: 1 }
    ];
  }

  constructor() {
    super();
    // Max read offset is base + depth = 3*depth + 1 samples; depth max is 20 ms,
    // so the buffer must cover > 60 ms or reads wrap past the write head (NaN).
    const sz = Math.ceil(sampleRate * 0.065);
    this.buf = [new Float32Array(sz), new Float32Array(sz)];
    this.wr = 0;
    this.ph = 0;
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length) return true;

    const enabled = parameters.enabled[0];
    const rate    = parameters.rate[0];
    const depth   = (parameters.depth[0] / 1000) * sampleRate;
    const mix     = parameters.mix[0];
    const sz      = this.buf[0].length;
    const dPh     = (2 * Math.PI * rate) / sampleRate;
    const base    = depth * 2 + 1;

    for (let i = 0; i < 128; i++) {
      this.ph = (this.ph + dPh) % (2 * Math.PI);
      const delay = Math.min(sz - 1, base + Math.sin(this.ph) * depth);
      const ri = (this.wr - Math.floor(delay) + sz) % sz;

      for (let ch = 0; ch < Math.min(out.length, 2); ch++) {
        const ic = inp[ch] ?? inp[0];
        this.buf[ch][this.wr] = ic[i];
        out[ch][i] = enabled
          ? ic[i] * (1 - mix) + this.buf[ch][ri] * mix
          : ic[i];
      }
      this.wr = (this.wr + 1) % sz;
    }
    return true;
  }
}
registerProcessor('chorus-processor', ChorusProcessor);
