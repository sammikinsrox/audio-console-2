class DistortionProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled', defaultValue: 0,    minValue: 0, maxValue: 1 },
      { name: 'amount',  defaultValue: 50,   minValue: 0, maxValue: 400 },
      { name: 'mode',    defaultValue: 0,    minValue: 0, maxValue: 1 }, // 0=overdrive 1=distortion
      { name: 'mix',     defaultValue: 1.0,  minValue: 0, maxValue: 1 }
    ];
  }

  overdrive(x, k) {
    const abs = Math.abs(x);
    const sign = x < 0 ? -1 : 1;
    if (abs < 1/3) return sign * 2 * abs;
    if (abs < 2/3) return sign * (3 - (2 - 3 * abs) ** 2) / 3;
    return sign;
  }

  hardClip(x, k) {
    return (1 + k) * x / (1 + k * Math.abs(x));
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length) return true;

    const enabled = parameters.enabled[0];
    const raw     = Math.min(parameters.amount[0] / 400, 0.9999);
    const k       = 2 * raw / (1 - raw + 1e-5);
    const mode    = parameters.mode[0];
    const mix     = parameters.mix[0];

    for (let ch = 0; ch < out.length; ch++) {
      const ic = inp[ch] ?? inp[0];
      const oc = out[ch];
      for (let i = 0; i < oc.length; i++) {
        if (!enabled) { oc[i] = ic[i]; continue; }
        const wet = mode < 0.5 ? this.overdrive(ic[i], k) : this.hardClip(ic[i], k);
        oc[i] = ic[i] * (1 - mix) + wet * mix;
      }
    }
    return true;
  }
}
registerProcessor('distortion-processor', DistortionProcessor);
