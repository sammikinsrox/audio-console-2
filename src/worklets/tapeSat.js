class TapeSatProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled', defaultValue: 0,   minValue: 0, maxValue: 1 },
      { name: 'drive',   defaultValue: 2,   minValue: 1, maxValue: 10 },
      { name: 'warmth',  defaultValue: 0.5, minValue: 0, maxValue: 1 },
      { name: 'mix',     defaultValue: 0.5, minValue: 0, maxValue: 1 }
    ];
  }

  constructor() {
    super();
    this.lp = [0, 0];
  }

  sat(x, drive) {
    const k = Math.tanh(drive);
    return Math.tanh(x * drive) / k;
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length) return true;

    const enabled = parameters.enabled[0];
    const drive   = parameters.drive[0];
    const warmth  = parameters.warmth[0];
    const mix     = parameters.mix[0];
    const lpA     = 0.002 + warmth * 0.08;

    for (let ch = 0; ch < out.length; ch++) {
      const ic = inp[ch] ?? inp[0];
      const oc = out[ch];
      for (let i = 0; i < oc.length; i++) {
        if (!enabled) { oc[i] = ic[i]; continue; }
        this.lp[ch] = this.lp[ch] * (1 - lpA) + ic[i] * lpA;
        const warmed = ic[i] + this.lp[ch] * warmth * 0.4;
        oc[i] = ic[i] * (1 - mix) + this.sat(warmed, drive) * mix;
      }
    }
    return true;
  }
}
registerProcessor('tape-sat-processor', TapeSatProcessor);
