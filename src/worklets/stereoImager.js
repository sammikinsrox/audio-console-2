class StereoImagerProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'enabled', defaultValue: 0,   minValue: 0, maxValue: 1 },
      { name: 'width',   defaultValue: 1.0, minValue: 0, maxValue: 2 }
    ];
  }

  process(inputs, outputs, parameters) {
    const inp = inputs[0];
    const out = outputs[0];
    if (!inp?.length || !out?.length) return true;

    const enabled = parameters.enabled[0];
    const width   = parameters.width[0];
    const L = inp[0];
    const R = inp[1] ?? inp[0];
    const oL = out[0];
    const oR = out[1] ?? out[0];
    if (!oL) return true;

    for (let i = 0; i < oL.length; i++) {
      if (!enabled || !oR) {
        oL[i] = L[i];
        if (oR) oR[i] = R[i];
        continue;
      }
      const mid  = (L[i] + R[i]) * 0.5;
      const side = (L[i] - R[i]) * 0.5;
      oL[i] = mid + side * width;
      oR[i] = mid - side * width;
    }
    return true;
  }
}
registerProcessor('stereo-imager-processor', StereoImagerProcessor);
