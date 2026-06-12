<img width="1200" height="250" alt="logolarge" src="https://github.com/user-attachments/assets/1f97c06c-a32c-492a-8b5d-d5081d812ff0" />

<img width="400" height="916" alt="Screenshot 2026-06-11 200948" src="https://github.com/user-attachments/assets/87e565a0-45d6-4366-9f02-1d5913e00e1d" />

[Demo video](https://github.com/user-attachments/assets/4468116b-33ce-4454-bc2f-a348302d494e)

A professional per-tab audio mixing console for Firefox, Chrome, and Edge. Opens as a sidebar and provides a full channel strip for every tab playing audio, with a complete effects chain, parametric EQ, real-time metering, and spectrum analysis.

## Features

### Channel strips

Every browser tab that is playing audio gets its own channel strip in the sidebar. Each strip is a self-contained mixing console with metering, gain, pan, stereo width, mute, solo, EQ, and a full effects chain. Strips can be freely reordered by dragging, renamed, and collapsed to a minimal view. Tab groups are visually identified with a color-coded bar at the bottom of each strip (Firefox and Chrome).

**Fader**

The fader controls the output gain of each channel. It runs from silence (off, representing -infinity dBdB) up through unity gain (0 dB) to a maximum boost of +12 dB. Below 0 dB the scale is linear; above 0 dB a gentle exponential curve gives finer control over the boost region. The fader track is labeled with standard pip marks at -infinity, -20, -10, -6, -3, 0, +6, and +12 dB. Right-clicking the fader opens a numeric entry menu that accepts a precise dB value in the range -80 to +12.

**Pan**

The pan knob is a circular canvas control that positions the channel in the stereo field, from -100 (full left) to +100 (full right). It can be dragged vertically, adjusted with the scroll wheel, or set precisely via a right-click numeric entry. Double-clicking recenters it. The master strip has its own pan control that acts as an offset applied on top of every channel's individual pan value.

**Stereo width**

The width slider runs from 0% (full mono collapse) through 100% (normal stereo) to 200% (maximum width expansion). Width processing uses a mid-side matrix: the signal is split into mid (L+R) and side (L-R) components, the side level is scaled by the width value, and the result is recombined. Setting width to anything other than 100% automatically enables the stereo imager node in the processing chain. A small canvas display beside the slider shows a graphical representation of the left-right balance.

**Solo and mute**

Each channel has independent mute and solo buttons. When any channel is soloed, all non-soloed channels are silenced. Multiple channels can be soloed simultaneously. A global mute on the master strip silences all output regardless of individual channel states. Muted channels dim in the UI to make their state obvious at a glance.

**Drag to reorder**

Channels can be reordered by grabbing the drag handle in the channel header and dragging left or right. The dragged strip becomes semi-transparent, and a colored indicator shows the target insertion point. The new order is saved immediately and persists across sessions.

**Collapse**

Each channel can be collapsed to a narrow 36-pixel strip that shows only a vertical channel name label. Collapsed state is saved per URL so that frequently visited sites remember your preferred layout.

**Rename**

Double-clicking the channel name opens an inline text editor. Names are saved per URL and persist across sessions. The placeholder text is the original page title, truncated to 14 characters.

**Channel presets (URL-based)**

Every parameter change is debounced and automatically saved against the URL of the tab (normalized to origin, path, and query string, without hash or credentials). When you return to the same URL, all settings are restored automatically - fader position, pan, width, mute, solo, effect parameters, EQ bands, and everything else. A small indicator dot in the channel header shows when a preset exists for the current URL.

**Channel numbers**

A number badge on each strip shows its current position in the rack. Numbers update automatically when channels are reordered.

**Tab groups**

If browser tab groups are in use, a color bar at the bottom of the channel strip indicates which group the tab belongs to. Hovering the bar shows the group name as a tooltip. Supported in Firefox and Chrome.

---

### Effects chain

Every channel has a fixed-order effects chain with thirteen independent processors. Each effect can be enabled or disabled individually. The signal flows through them in a fixed sequence, which reflects standard mixing practice: dynamics processing first, followed by saturation and tone shaping, then time-based effects, modulation, and finally limiting. Each effect has its own editor with a visualization canvas, a preset selector, and a full reset control.

**Gate**

<img width="244" height="221" alt="Screenshot 2026-06-11 195924" src="https://github.com/user-attachments/assets/4ba1dc76-67b4-4952-8ae4-e03a2b0f585d" />

The gate silences the channel whenever the input level falls below a set threshold. This is useful for eliminating noise, room tone, or low-level hum that is audible during quiet passages. Parameters: threshold (-80 to 0 dB), attack time (0.1 to 500 ms), hold time (0 to 1000 ms), and release time (1 to 2000 ms). The attack and release times shape how quickly the gate opens and closes. Hold keeps the gate open for a fixed duration after the signal drops below threshold, preventing rapid chattering on borderline signals. The visualization shows the current signal level relative to the threshold and indicates whether the gate is currently open or closed. Presets: Subtle, Moderate, Tight, Hard Gate.

**Expander**

<img width="244" height="223" alt="Screenshot 2026-06-11 195949" src="https://github.com/user-attachments/assets/d98376e9-bd71-4125-baf5-c957316618a5" />

The expander attenuates signals below a threshold by a configurable ratio, increasing the apparent quietness of low-level material without fully gating it. It is a gentler alternative to the gate, useful for reducing background noise while preserving natural room ambience and breath sounds. Parameters: threshold (-80 to 0 dB), ratio (1:1 to 20:1), attack (0.1 to 500 ms), and release (1 to 2000 ms). The transfer curve visualization shows the input-to-output relationship with the threshold and ratio clearly marked, and a live dot tracks the current operating point. Presets: Gentle (1.5:1), Moderate (2:1), Strong (4:1).

**Compressor**

<img width="247" height="260" alt="Screenshot 2026-06-11 200000" src="https://github.com/user-attachments/assets/888c387d-2213-4a7d-8cef-0699586831a1" />

The compressor reduces dynamic range by attenuating signals that exceed the threshold. It uses the browser's native DynamicsCompressorNode for efficiency. Parameters: threshold (-60 to 0 dB), knee width (0 to 40 dB), ratio (1:1 to 20:1), attack (0.1 to 500 ms), release (10 to 3000 ms), and makeup gain (0 to +20 dB). The knee parameter softens the transition into compression, making it less audible on transients. Makeup gain compensates for the overall level reduction caused by compression. A gain reduction meter shows how much attenuation is currently being applied. The transfer curve visualization renders the full input/output relationship with the knee and threshold visible. Presets: Gentle (2:1), Moderate (4:1), Heavy (8:1), Limiter (20:1), Vocal (3:1), Drum Bus (6:1).

**Tape saturation**

<img width="243" height="197" alt="Screenshot 2026-06-11 200023" src="https://github.com/user-attachments/assets/aba3e2d2-e03f-4dbb-9f07-02ba6ba32f0c" />

Tape saturation emulates the nonlinear frequency response and soft clipping behavior of analog magnetic tape. It adds harmonic warmth and gentle compression-like density to the signal. Parameters: drive (1 to 10, controlling how hard the signal is pushed into the saturator), warmth (0 to 100%, blending a low-pass-filtered version of the saturated signal to emphasize the low-frequency coloration of tape), and mix (0 to 100%, wet/dry balance). The saturation function is a normalized hyperbolic tangent curve, which is the classic soft-clipping shape. Presets: Subtle, Warm, Hot, Saturate.

**Distortion**

<img width="244" height="204" alt="Screenshot 2026-06-11 200404" src="https://github.com/user-attachments/assets/3bc629f6-d0c3-4b5a-9f22-79ad5d264018" />

Distortion applies more aggressive clipping and waveshaping than the tape saturator. It is intended for intentional musical distortion effects. Parameters: amount (0 to 400, controlling the clipping intensity), mode (Overdrive for soft knee clipping, or Distortion for hard digital clipping), and mix (0 to 100%). The visualization shows the transfer curve for the selected mode. Presets: Light OD, Heavy OD, Crunch, Fuzz.

**Delay**

<img width="243" height="219" alt="Screenshot 2026-06-11 200452" src="https://github.com/user-attachments/assets/25e52dc5-c1c6-453d-9d70-66555b38606a" />

The delay creates time-based echo effects by playing back the signal after a configurable time offset. Parameters: delay time (0 to 2000 ms), feedback (0 to 95%, the proportion of the delayed signal fed back into the delay input to create multiple repeats), and mix (0 to 100%). The delay time can also be set via BPM sync mode, where you enter a tempo in beats per minute and select a rhythmic subdivision. Available subdivisions are 1/16, 1/8, dotted 1/8, 1/4, dotted 1/4, 1/2, and 1/1. Presets: Slapback (80 ms), Short Echo (200 ms), Medium Echo (375 ms), Long Echo (750 ms), Ambient (1000 ms).

**Reverb**

<img width="244" height="191" alt="Screenshot 2026-06-11 200503" src="https://github.com/user-attachments/assets/32358376-683a-428e-b9e5-dbf86d4e3ef5" />

Reverb simulates the acoustic reflections of a physical space using convolution with a synthetically generated impulse response. The impulse response is a shaped noise burst whose length and decay envelope are controlled by the parameters: size (0.1 to 10 seconds, controlling the total IR length) and decay (0 to 100%, shaping the rate at which the tail fades). Mix controls the wet/dry balance (0 to 100%). Changing the size or decay parameters regenerates the impulse response in real time. Presets: Room (0.5 s), Small Hall (1.5 s), Hall (3 s), Plate (2 s), Chamber (1.2 s), Cathedral (8 s).

**Chorus**

<img width="245" height="191" alt="Screenshot 2026-06-11 200516" src="https://github.com/user-attachments/assets/fdc7ba76-a39f-4e76-babc-9d1624be5371" />

Chorus creates the illusion of multiple instruments or voices by mixing the dry signal with a copy that is slightly delayed and continuously pitch-modulated via a low-frequency oscillator. Parameters: rate (0.1 to 10 Hz, the speed of the LFO), depth (0 to 20 ms, the amount of delay time modulation, which determines the pitch deviation), and mix (0 to 100%). The visualization shows the LFO waveform and the resulting modulation envelope. Presets: Subtle (0.8 Hz, 1.5 ms), Classic (1.5 Hz, 3 ms), Lush (2.5 Hz, 5 ms), Thick (0.5 Hz, 8 ms).

**Flanger**

<img width="243" height="209" alt="Screenshot 2026-06-11 200529" src="https://github.com/user-attachments/assets/66453688-6bf5-4fbe-aa8b-179646bafe1c" />

Flanging is similar to chorus but uses a shorter delay range and adds a feedback path, creating a resonant comb-filter effect with a distinctive sweeping, jet-like character. Parameters: rate (0.01 to 5 Hz), depth (0 to 10 ms), feedback (-99 to +99%, with negative values inverting the phase of the feedback signal), and mix (0 to 100%). Presets: Gentle, Classic, Jet, Extreme.

**Phaser**

<img width="243" height="208" alt="Screenshot 2026-06-11 200540" src="https://github.com/user-attachments/assets/f2a804f5-ff6a-4e62-bc15-04ca3cb17cd9" />

The phaser uses a series of all-pass filters whose center frequency is swept by an LFO. This creates peaks and notches in the frequency response that move over time, producing a smooth, swirling modulation effect. Parameters: rate (0.01 to 10 Hz), depth (0 to 100%, controlling the frequency sweep range), feedback (0 to 99%), and mix (0 to 100%). Presets: Slow, Classic, Fast, Vintage.

**Vibrato**

<img width="242" height="171" alt="Screenshot 2026-06-11 200550" src="https://github.com/user-attachments/assets/7f00487a-d1be-4855-a5f3-8c0263f056a9" />

Vibrato modulates the pitch of the signal by varying the delay time with no dry signal blending - the output is fully wet, creating pure pitch oscillation. Parameters: rate (0.1 to 20 Hz) and depth (0 to 20 ms, which determines the amount of pitch deviation). Presets: Subtle (3 Hz, 1 ms), Classic (5 Hz, 3 ms), Dramatic (8 Hz, 8 ms), Seasick (2 Hz, 15 ms).

**Tremolo**

<img width="245" height="196" alt="Screenshot 2026-06-11 200559" src="https://github.com/user-attachments/assets/59c5b636-8d02-441d-9fcf-9784cbd0b012" />

Tremolo oscillates the amplitude of the signal at a set rate, creating a rhythmic pulsing or stuttering effect. Parameters: rate (0.1 to 20 Hz), depth (0 to 100%, the modulation amount), and shape (Sine for a smooth volume sweep, or Square for an abrupt on/off chop). Presets: Slow Sine (2 Hz, 60%), Fast Sine (8 Hz, 80%), Choppy Square (4 Hz, 90%), Stutter Square (12 Hz, 100%).

**Limiter**

<img width="246" height="208" alt="Screenshot 2026-06-11 200610" src="https://github.com/user-attachments/assets/fa5499e2-4667-4cbe-a707-815d8c0de18b" />

The limiter is a brick-wall processor that prevents the signal from exceeding a set ceiling under any circumstances. It is placed at the end of the chain, after all other effects, and is intended for final output protection. Parameters: ceiling (-20 to 0 dB, the absolute maximum output level), attack (0.01 to 5 ms), and release (10 to 2000 ms). The attack is kept extremely short by design so that the limiting is transparent and does not alter the character of transients. A gain reduction meter shows how much attenuation is being applied in real time. Presets: Transparent (-0.1 dB), Standard (-1 dB), Hard (-3 dB), Loud (-6 dB).

---

### Parametric EQ

<img width="483" height="326" alt="Screenshot 2026-06-11 200435" src="https://github.com/user-attachments/assets/134653e4-39ae-4340-a84f-182459a22e03" />

Each channel has a five-band parametric EQ with a large interactive editor. The five bands are: Low Shelf (default 100 Hz), Low Mid peaking (default 500 Hz), Mid peaking (default 2000 Hz), High Mid peaking (default 6000 Hz), and High Shelf (default 10000 Hz). Each band can be individually enabled or disabled.

Per-band parameters: frequency (20 to 20000 Hz, adjustable on a logarithmic scale), gain (-18 to +18 dB), and Q (0.1 to 10, controlling the bandwidth of peaking bands and the slope of shelf bands).

The EQ editor shows a 640x220 pixel canvas displaying the frequency response of each band as a colored curve, along with the combined total response. Interactive handles can be dragged horizontally to change frequency and vertically to change gain. Scrolling on a peaking band handle adjusts its Q value. Double-clicking a handle resets its gain to 0 dB. Hovering a handle displays a tooltip showing the current frequency, gain, and Q values. The EQ has its own bypass toggle that disables all five bands at once without clearing the parameter values.

---

### Metering

**Peak and RMS meters**

Each channel has a vertical bar meter covering the range -60 to +6 dB. The meter bar uses a color gradient that transitions from green in the low-level region through yellow and orange to red near and above 0 dBdB. A peak hold line marks the highest level reached, displaying the current value as a dB label. The hold line persists for approximately four seconds before beginning a gradual decay. A separate, thinner true peak hold line tracks inter-sample peaks, computed by 4x linear interpolation between consecutive samples (compliant with ITU-R BS.1770-4). This thinner line distinguishes true inter-sample peaks from sample-aligned peaks, which matters for streaming and loudness-normalized delivery. A red clip LED latches on when any sample reaches 0 dBFS and remains lit until clicked.

**LUFS loudness**

Each channel displays an integrated loudness value in LUFS (Loudness Units relative to Full Scale) according to the ITU-R BS.1770-4 standard. The measurement uses a K-weighting filter chain consisting of a pre-emphasis high-shelf filter followed by a relative loudness high-pass filter, applied to the signal before energy measurement. Loudness is calculated over a rolling three-second window of 50ms analysis blocks. Blocks where the signal is below -70 LUFS are excluded from the average (gating). The display shows "---" when there is not yet enough valid signal to produce a meaningful measurement.

**Spectrum analyzer (per channel)**

Each channel strip includes a small spectrum analyzer showing 28 frequency bars spanning 20 Hz to 20 kHz on a logarithmic scale. The bars use a green-to-red color gradient to indicate energy level. The analyzer updates at 60 frames per second.

**Master spectrum analyzer**

A larger spectrum analyzer runs across the bottom of the sidebar, showing a filled frequency curve with labeled axis marks at 20, 50, 100, 200, 500, 1k, 2k, 5k, 10k, and 20k Hz. This analyzer reflects the output of the currently selected channel or the overall mix.

**Stereo correlation meter**

The master strip includes a stereo correlation meter showing the phase relationship between the left and right channels. A value of +1 indicates a fully mono-compatible signal. Values near 0 indicate uncorrelated stereo, which is normal for wide content. Negative values indicate phase inversion between channels, which causes cancellation when the signal is collapsed to mono. The meter fills green from center for positive correlation and red from center for negative correlation, providing an immediate visual warning of mono compatibility issues.

**Gain reduction indicators**

The gate, expander, compressor, and limiter each display a small gain reduction bar in their effects chain slot. The bar fills from left to right as gain reduction increases, with a green-to-red gradient. This allows monitoring of all dynamic processors at a glance without opening their individual editors.

---

### Themes and appearance

Ten built-in color themes are available: Obsidian (the default dark theme), Slate, Emerald, Crimson, Amber, Frost, Graphite, Solar (a light theme), Joker, and Custom. In addition to the base theme, every theme supports a fully customizable accent color via a hex color picker. The accent color is used for highlights, active indicators, focused controls, and selected elements throughout the UI. Theme and accent color choices are saved to storage and restored on every launch.

The Solar theme is a fully light variant that adjusts backgrounds, text, borders, and control colors appropriately for a bright environment. All other themes use dark backgrounds with varied accent palettes.

---

## Installation

Download the latest release from the [Releases page](../../releases).

### Firefox

> Firefox 109 or later is required.

Install from [Firefox Add-ons (AMO)](https://addons.mozilla.org) (link coming soon), or load the zip manually:

1. Open Firefox and navigate to `about:addons`
2. Click the gear icon and choose **Install Add-on From File**
3. Select `audio-console-firefox-*.zip`

Or for temporary development loading: navigate to `about:debugging` → **This Firefox** → **Load Temporary Add-on** → select any file inside the unzipped folder.

Open the sidebar via the Audio Console toolbar button, or through **View > Sidebar > Audio Console**.

### Chrome / Edge / Opera

> Chrome 116 or later is required (Side Panel API).

1. Download `audio-console-chrome-*.zip` and unzip it to a folder
2. Open `chrome://extensions` (or `edge://extensions`)
3. Enable **Developer mode** in the top right
4. Click **Load unpacked** and select the unzipped folder

Click the Audio Console icon in the toolbar to open the side panel.

---

## How it works

A content script is injected into every tab before page scripts run. It finds all audio and video elements on the page, sets `crossOrigin='anonymous'` on them to prevent CORS tainting, and then builds a Web Audio API processing chain for each element. Audio is captured via `createMediaElementSource` where possible, with `captureStream` as a fallback. The captured signal passes through the full effects chain, which is implemented as a combination of native Web Audio nodes (DynamicsCompressorNode, BiquadFilterNode, DelayNode, ConvolverNode, StereoPannerNode, GainNode) and custom AudioWorkletProcessor instances for the effects that require sample-by-sample processing (gate, expander, tape saturation, distortion, chorus, flanger, phaser, vibrato, tremolo, stereo imager, and limiter).

Every 50ms, the content script reads analyser data from the processing chain (FFT bins, time-domain samples for peak and LUFS measurement, and gain reduction values from the dynamics worklets) and sends it to the sidebar via the extension messaging system. The sidebar renders all metering and spectrum displays in a `requestAnimationFrame` loop at 60 FPS.

All parameter changes made in the sidebar are sent to the content script via `SET_PARAM` or `SET_PARAMS` messages, which update the corresponding Web Audio nodes in real time. Changes are also debounced and written to `browser.storage.local` within 1200ms, keyed by normalized URL, so that settings are automatically restored the next time the same URL is visited.

The background script manages the list of active tabs with audio, routes messages between content scripts and the sidebar, and monitors tab group membership for the group color indicator feature.

---

## Tech stack

Vanilla JavaScript with a lightweight build step (`node build.mjs`) and no runtime dependencies. CSS custom properties for theming. Web Audio API with AudioWorklet for sample-accurate DSP. WebExtension APIs via `webextension-polyfill` (`browser.*` namespace unified across Firefox and Chrome). Fonts loaded from Google Fonts (Bebas Neue, Barlow Condensed, JetBrains Mono).

The Firefox build uses Manifest V2 with a sidebar action and background scripts. The Chrome/Edge build uses Manifest V3 with a service worker, the Side Panel API, and a `world: "MAIN"` content script to patch `createElement` before page scripts run — bypassing strict Content Security Policies on sites like YouTube without requiring `unsafe-inline`.

---

## License

Copyright (c) 2026 Samantha H. (https://github.com/sammikinsrox/)

Permission is hereby granted to use, copy, modify, and distribute this software for personal and non-commercial purposes only, provided this copyright notice is included.

Commercial use, resale, or redistribution as part of a paid product or service requires explicit written permission from the copyright holder.
