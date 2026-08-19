let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let wet: GainNode | null = null;
let enabled = typeof window !== "undefined" && localStorage.getItem("gs_sound") === "1";

const ensureGraph = () => {
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  if (!master) {
    master = ctx.createGain();
    master.gain.value = 0.9;

    const softener = ctx.createBiquadFilter();
    softener.type = "lowpass";
    softener.frequency.value = 7000;

    const delay = ctx.createDelay(0.5);
    delay.delayTime.value = 0.13;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.28;
    wet = ctx.createGain();
    wet.gain.value = 0.22;

    master.connect(softener);
    softener.connect(ctx.destination);
    master.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(softener);
  }
  return ctx;
};

const tone = (
  f0: number,
  f1: number,
  dur: number,
  gain: number,
  type: OscillatorType,
  when = 0,
  filterFreq?: number
) => {
  const c = ensureGraph();
  const now = c.currentTime + when;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(f0, now);
  if (f1 !== f0) osc.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), now + dur);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(gain, now + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  if (filterFreq) {
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(filterFreq, now);
    f.frequency.exponentialRampToValueAtTime(filterFreq * 3, now + dur);
    osc.connect(f);
    f.connect(g);
  } else {
    osc.connect(g);
  }
  g.connect(master!);
  osc.start(now);
  osc.stop(now + dur + 0.05);
};

const noise = (dur: number, freq: number, gain: number, when = 0) => {
  const c = ensureGraph();
  const now = c.currentTime + when;
  const len = Math.max(1, Math.floor(c.sampleRate * dur));
  const buffer = c.createBuffer(1, len, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buffer;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = freq;
  f.Q.value = 1.2;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  src.connect(f);
  f.connect(g);
  g.connect(master!);
  src.start(now);
};

const SOUNDS: Record<string, () => void> = {
  click: () => {
    tone(1660, 1660, 0.022, 0.028, "square");
    tone(2490, 2490, 0.018, 0.02, "square", 0.028);
  },
  hover: () => {
    tone(2200, 2200, 0.01, 0.008, "sine");
  },
  key: () => {
    tone(1245 + Math.random() * 400, 1245, 0.014, 0.012, "square");
  },
  open: () => {
    tone(160, 1320, 0.22, 0.04, "sawtooth", 0, 500);
    noise(0.18, 3200, 0.012);
    tone(1760, 1760, 0.06, 0.03, "sine", 0.18);
    tone(2637, 2637, 0.05, 0.018, "sine", 0.24);
  },
  close: () => {
    tone(1320, 140, 0.18, 0.04, "sawtooth", 0, 1800);
    tone(880, 880, 0.04, 0.02, "sine", 0.14);
  },
  success: () => {
    tone(1046, 1046, 0.07, 0.035, "sine");
    tone(1046, 1046, 0.07, 0.035, "square", 0.001);
    tone(1318, 1318, 0.07, 0.035, "sine", 0.12);
    tone(1318, 1318, 0.07, 0.03, "square", 0.121);
    tone(1046, 1046, 0.09, 0.035, "sine", 0.24);
    tone(2093, 2093, 0.12, 0.02, "sine", 0.36);
  },
  alert: () => {
    tone(932, 932, 0.09, 0.035, "square");
    tone(740, 740, 0.11, 0.035, "square", 0.12);
  },
};

export const isSoundEnabled = () => enabled;

export const setSoundEnabled = (v: boolean) => {
  enabled = v;
  localStorage.setItem("gs_sound", v ? "1" : "0");
  if (v) beep("open");
};

export const beep = (kind: keyof typeof SOUNDS = "click") => {
  if (!enabled) return;
  try {
    SOUNDS[kind]?.();
  } catch {
    /* audio unavailable */
  }
};
