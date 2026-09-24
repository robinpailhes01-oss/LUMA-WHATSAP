#!/usr/bin/env python3
"""Musique de fond LUMA générée localement (aucune licence, aucun service). Deux styles :
  --style soft     : nappe douce, arpège, pulsation discrète (104 BPM)            — v003 du réel outils IA
  --style dynamic  : 122 BPM, grosse caisse + clap, basse en contretemps pompée, charley en doubles croches,
                     montées (risers) et impacts aux coupes (--cuts), progression I–V–vi–IV     — v004
La musique est baissée automatiquement pendant la parole (enveloppe RMS de la voix ; la voix n'est jamais traitée).

usage: make-music.py --duration 97.2 --voice assets/voice.m4a --outro 94.4 --out assets/music.m4a
       [--style dynamic] [--cuts 6.53,28.93,50.33,78.0] [--bpm 122] [--duck-db 3] [--lufs -21] [--seed 7]
"""
import argparse, subprocess, numpy as np
from scipy.signal import butter, sosfilt
ap = argparse.ArgumentParser()
ap.add_argument("--duration", type=float, required=True); ap.add_argument("--voice", required=True); ap.add_argument("--outro", type=float, required=True)
ap.add_argument("--out", required=True); ap.add_argument("--style", default="dynamic", choices=["soft", "dynamic"])
ap.add_argument("--bpm", type=float, default=None); ap.add_argument("--seed", type=int, default=7)
ap.add_argument("--cuts", default="", help="temps des coupes de section : riser d'une mesure + impact")
ap.add_argument("--duck-db", type=float, default=None); ap.add_argument("--lufs", type=float, default=None)
a = ap.parse_args()
DYN = a.style == "dynamic"
bpm = a.bpm or (122 if DYN else 104); duck_db = a.duck_db if a.duck_db is not None else (3.0 if DYN else 3.5)
lufs = a.lufs if a.lufs is not None else (-21.0 if DYN else -23.0)
SR = 48000; rng = np.random.default_rng(a.seed)
N = int(a.duration * SR); beat = 60 / bpm; bar = 4 * beat
A3 = 220.0
def f(n): return A3 * 2 ** (n / 12)
CHORDS = [(3, 7, 10), (-2, 2, 5), (0, 3, 7), (-4, 0, 3)] if DYN else [(0, 3, 7), (-4, 0, 3), (3, 7, 10), (-2, 2, 5)]  # C G Am F / Am F C G
def env_ad(n, att, dec):
    e = np.ones(n); na = min(int(att * SR), n); nd = min(int(dec * SR), n)
    if na: e[:na] = np.linspace(0, 1, na, endpoint=False)
    if nd: e[-nd:] = np.minimum(e[-nd:], np.linspace(1, 0, nd))
    return e
def lowpass(x, fc, order=2): return sosfilt(butter(order, min(fc, SR / 2 - 100) / (SR / 2), btype="low", output="sos"), x)
def highpass(x, fc, order=2): return sosfilt(butter(order, fc / (SR / 2), btype="high", output="sos"), x)
def bandpass(x, lo, hi): return sosfilt(butter(2, [lo / (SR / 2), hi / (SR / 2)], btype="band", output="sos"), x)
def add(dst, s, sig):
    e = min(N, s + len(sig)); 
    if s < N and e > s: dst[s:e] += sig[: e - s]
pad = np.zeros(N); arp = np.zeros(N); bass = np.zeros(N); kick = np.zeros(N); hat = np.zeros(N); clap = np.zeros(N); fx = np.zeros(N)
drums_from = 2 if DYN else 4
nbars = int(np.ceil(a.duration / bar)) + 1
for b in range(nbars):
    ch = CHORDS[b % 4]; s = int(b * bar * SR)
    if s >= N: break
    n = int(bar * SR) + int(0.5 * SR); tt = np.arange(n) / SR
    # nappe (dents de scie désaccordées filtrées)
    p = np.zeros(n)
    for semi in ch + (ch[0] + 12,):
        for det in (-0.5, 0, 0.5):
            fr = f(semi) * 2 ** (det / 1200) / 2; ph = (fr * tt + rng.random()) % 1.0; p += (2 * ph - 1) * 0.22
    add(pad, s, lowpass(p, (1400 if DYN else 900) + 300 * np.sin(2 * np.pi * 0.05 * s / SR)) * env_ad(n, 0.3 if DYN else 0.6, 0.6))
    # arpège pluck (doubles croches en dynamic, croches en soft)
    steps = 16 if DYN else 8
    pattern = [ch[0], ch[2], ch[0] + 12, ch[1] + 12, ch[2], ch[0] + 12, ch[1] + 12, ch[2] + 12]
    for i in range(steps):
        semi = pattern[i % 8] + (12 if DYN and i % 4 == 3 else 0)
        ss = s + int(i * bar / steps * SR); ln = int(0.28 * SR); tp = np.arange(ln) / SR; fr = f(semi)
        vel = (0.6 if i % 4 == 0 else 0.42 if i % 2 == 0 else 0.3) if DYN else (0.55 if i % 2 == 0 else 0.42)
        note = (np.sin(2 * np.pi * fr * tp) + 0.4 * np.sin(2 * np.pi * 2 * fr * tp) + (0.15 * np.sin(2 * np.pi * 3 * fr * tp) if DYN else 0)) * np.exp(-tp * (12 if DYN else 9)) * vel
        add(arp, ss, note * 0.5)
        if DYN: add(arp, ss + int(0.75 * beat * SR), note * 0.18)   # écho en croche pointée
    # basse
    if DYN:   # contretemps house : croches en l'air, fondamentale grave, petite saturation
        for i in range(8):
            if i % 2 == 0: continue
            ss = s + int(i * beat / 2 * SR); ln = int(0.42 * beat * SR); tb = np.arange(ln) / SR; fr = f(ch[0]) / 4
            wave = np.tanh(2.2 * (np.sin(2 * np.pi * fr * tb) + 0.3 * np.sin(2 * np.pi * 2 * fr * tb)))
            add(bass, ss, wave * env_ad(ln, 0.005, 0.12) * 0.55)
    else:
        for pos, ln_b in [(0, beat * 1.9), (2 * beat, beat * 1.4), (3.5 * beat, beat * 0.45)]:
            ss = s + int(pos * SR); ln = int(ln_b * SR); tb = np.arange(ln) / SR; fr = f(ch[0]) / 4
            add(bass, ss, np.tanh(1.6 * np.sin(2 * np.pi * fr * tb)) * env_ad(ln, 0.01, 0.25) * 0.5)
    # batterie
    if b >= drums_from:
        for i in range(4):
            ss = s + int(i * beat * SR); ln = int(0.3 * SR); tk = np.arange(ln) / SR
            if DYN:
                k = np.sin(2 * np.pi * (52 + 140 * np.exp(-tk * 55)) * tk) * np.exp(-tk * 11)
                k += highpass(rng.standard_normal(ln), 2500) * np.exp(-tk * 260) * 0.35   # clic d'attaque
                add(kick, ss, np.tanh(1.5 * k) * 1.0)
            else:
                add(kick, ss, np.sin(2 * np.pi * (48 + 90 * np.exp(-tk * 40)) * tk) * np.exp(-tk * 14) * 0.9)
        if DYN:
            for i in (1, 3):   # clap sur 2 et 4
                ss = s + int(i * beat * SR); ln = int(0.2 * SR); tc = np.arange(ln) / SR
                c = np.zeros(ln)
                for d in (0, 0.011, 0.022):
                    di = int(d * SR); c[di:] += bandpass(rng.standard_normal(ln - di), 900, 4000) * np.exp(-tc[: ln - di] * 34) * 0.6
                add(clap, ss, c)
            for i in range(16):   # charley en doubles croches, ouvert sur les contretemps
                ss = s + int(i * beat / 4 * SR); opn = i % 4 == 2; ln = int((0.16 if opn else 0.045) * SR)
                add(hat, ss, highpass(rng.standard_normal(ln), 8000) * np.exp(-np.arange(ln) / SR * (28 if opn else 110)) * (0.2 if opn else 0.13 if i % 2 == 0 else 0.08))
        else:
            for i in range(8):
                ss = s + int(i * beat / 2 * SR); ln = int(0.05 * SR)
                add(hat, ss, highpass(rng.standard_normal(ln), 7000) * np.exp(-np.arange(ln) / SR * 90) * (0.16 if i % 2 else 0.09))
# risers + impacts aux coupes
cuts = [float(c) for c in a.cuts.split(",") if c.strip()]
for c in cuts:
    ci = int(c * SR); ln = int(bar * SR); tr = np.arange(ln) / SR
    nz = rng.standard_normal(ln)
    riser = np.zeros(ln); step = ln // 16
    for j in range(16):   # bruit filtré dont la coupure monte sur une mesure
        seg = nz[j * step:(j + 1) * step]; riser[j * step:(j + 1) * step] = bandpass(seg, 300 + 250 * j, 1200 + 900 * j)
    riser *= np.linspace(0.05, 1.0, ln) ** 2 * 0.5
    add(fx, ci - ln, riser)
    li = int(1.2 * SR); th = np.arange(li) / SR   # impact : cymbale (bruit long) + coup grave
    add(fx, ci, highpass(rng.standard_normal(li), 3000) * np.exp(-th * 4.5) * 0.35 + np.sin(2 * np.pi * (40 + 60 * np.exp(-th * 30)) * th) * np.exp(-th * 8) * 0.8)
# pompage : la nappe, la basse et l'arpège plongent sur chaque grosse caisse (sidechain)
pump = np.ones(N)
if DYN:
    kb = int(drums_from * bar * SR); kn = int(0.5 * beat * SR); shape = np.concatenate([np.full(int(0.02 * SR), 0.35), np.linspace(0.35, 1.0, kn - int(0.02 * SR))])
    for i in range(kb, N, int(beat * SR)):
        e = min(N, i + kn); pump[i:e] = shape[: e - i]
outro_i = int(a.outro * SR); g = np.ones(N)
if outro_i < N:
    ramp = np.linspace(1, 0, int(0.6 * SR)); g[outro_i:outro_i + len(ramp)] = ramp; g[outro_i + len(ramp):] = 0
if DYN:
    mix = (pad * 0.5 * (1 + 0.6 * (1 - g)) + arp * 0.75 + bass * 0.8 * g) * pump + (kick * 0.5 + clap * 0.45 + hat * 0.4) * g + fx * 0.7
else:
    mix = pad * 0.55 * (1 + 0.5 * (1 - g)) + arp * 0.7 + bass * 0.7 * g + (kick * 0.35 + hat * 0.35) * g + fx * 0.6
# atténuation pendant la parole
v = subprocess.run(["ffmpeg", "-v", "error", "-i", a.voice, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
voice = np.frombuffer(v, dtype=np.float32); vv = np.zeros(N); vv[:min(N, len(voice))] = voice[:N]
win = int(0.2 * SR); rms = np.sqrt(np.convolve(vv ** 2, np.ones(win) / win, mode="same"))
active = (rms > 0.02).astype(float); k = int(0.35 * SR); active = np.clip(np.convolve(active, np.ones(k) / k, mode="same") * 1.5, 0, 1)
mix = mix * 10 ** (-duck_db / 20 * active)
mix[: int(0.6 * SR)] *= np.linspace(0, 1, int(0.6 * SR)); mix[-int(0.8 * SR):] *= np.linspace(1, 0, int(0.8 * SR))
mix = np.tanh(mix / (np.abs(mix).max() * 0.85)) * 0.7
raw = a.out + ".raw.wav"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", raw], input=mix.astype(np.float32).tobytes(), check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", f"loudnorm=I={lufs}:TP=-2:LRA=11", "-ar", str(SR), "-c:a", "aac", "-b:a", "160k", a.out], check=True)
subprocess.run(["rm", "-f", raw])
print("music written", a.out, f"{a.duration}s style={a.style} bpm={bpm} duck={duck_db}dB lufs={lufs} cuts={cuts}")
