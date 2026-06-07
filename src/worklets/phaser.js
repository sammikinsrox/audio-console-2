class PhaserProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled',  defaultValue: 0,   minValue: 0,    maxValue: 1 },
      { name: 'rate',     defaultValue: 0.5, minValue: 0.01, maxValue: 10 },
      { name: 'depth',    defaultValue: 1.0, minValue: 0,    maxValue: 1 },
      { name: 'feedback', defaultValue: 0.5, minValue: 0,    maxValue: 0.99 },
      { name: 'mix',      defaultValue: 0.5, minValue: 0,    maxValue: 1 }
    ];
  }

  constructor() {
    super();
    this.ph = 0;
    // 4-stage 1st-order all-pass: xn[ch][stage], yn[ch][stage]
    this.xn = [[0,0,0,0],[0,0,0,0]];
    this.yn = [[0,0,0,0],[0,0,0,0]];
    this.fb = [0, 0];
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length) return true;

    const enabled  = parameters.enabled[0];
    const rate     = parameters.rate[0];
    const depth    = parameters.depth[0];
    const feedback = parameters.feedback[0];
    const mix      = parameters.mix[0];
    const dPh      = (2 * Math.PI * rate) / sampleRate;

    for (let i = 0; i < 128; i++) {
      this.ph = (this.ph + dPh) % (2 * Math.PI);
      const lfo  = (Math.sin(this.ph) + 1) * 0.5;
      const freq = Math.min(100 + lfo * depth * 7900, sampleRate * 0.45);
      const t    = Math.tan(Math.PI * freq / sampleRate);
      const a    = (t - 1) / (t + 1);

      for (let ch = 0; ch < Math.min(out.length, 2); ch++) {
        const ic = inp[ch] ?? inp[0];
        if (!enabled) { out[ch][i] = ic[i]; continue; }

        let x = ic[i] + this.fb[ch] * feedback;
        for (let s = 0; s < 4; s++) {
          const y = a * x + this.xn[ch][s] - a * this.yn[ch][s];
          this.xn[ch][s] = x;
          this.yn[ch][s] = y;
          x = y;
        }
        this.fb[ch] = x;
        out[ch][i] = ic[i] * (1 - mix) + x * mix;
      }
    }
    return true;
  }
}
registerProcessor('phaser-processor', PhaserProcessor);
