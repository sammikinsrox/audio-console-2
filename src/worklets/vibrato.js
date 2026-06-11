class VibratoProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled', defaultValue: 0, minValue: 0,   maxValue: 1 },
      { name: 'rate',    defaultValue: 5, minValue: 0.1, maxValue: 20 },
      { name: 'depth',   defaultValue: 3, minValue: 0,   maxValue: 20 } // ms
    ];
  }

  constructor() {
    super();
    // Max read offset is base + depth = 2*depth + 2 samples; depth max is 20 ms,
    // so the buffer must cover > 40 ms or reads wrap past the write head (NaN).
    const sz = Math.ceil(sampleRate * 0.045);
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
    const sz      = this.buf[0].length;
    const dPh     = (2 * Math.PI * rate) / sampleRate;
    const base    = depth + 2;

    for (let i = 0; i < 128; i++) {
      this.ph = (this.ph + dPh) % (2 * Math.PI);
      const delay = Math.min(sz - 1, Math.max(1, base + Math.sin(this.ph) * depth));
      const ri = (this.wr - Math.floor(delay) + sz) % sz;

      for (let ch = 0; ch < Math.min(out.length, 2); ch++) {
        const ic = inp[ch] ?? inp[0];
        this.buf[ch][this.wr] = ic[i];
        out[ch][i] = enabled ? this.buf[ch][ri] : ic[i];
      }
      this.wr = (this.wr + 1) % sz;
    }
    return true;
  }
}
registerProcessor('vibrato-processor', VibratoProcessor);
