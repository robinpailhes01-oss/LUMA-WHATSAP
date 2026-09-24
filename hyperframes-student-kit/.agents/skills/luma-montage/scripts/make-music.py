#!/usr/bin/env python3
"""Musique de fond LUMA générée localement (aucune licence, aucun service) : nappe synthé douce en La mineur / Do majeur,
arpège pluck, basse, pulsation discrète. Baissée automatiquement de quelques dB pendant la parole (enveloppe calculée
sur la voix, la voix elle-même n'est jamais traitée).

usage: python3 make-music.py --duration 97.2 --voice assets/voice.m4a --outro 94.4 --out assets/music.m4a [--bpm 104] [--seed 7]
"""
import argparse, subprocess, numpy as np
from scipy.signal import butter, sosfilt, lfilter
ap = argparse.ArgumentParser()
ap.add_argument("--duration", type=float, required=True); ap.add_argument("--voice", required=True); ap.add_argument("--outro", type=float, required=True)
ap.add_argument("--out", required=True); ap.add_argument("--bpm", type=float, default=104); ap.add_argument("--seed", type=int, default=7)
ap.add_argument("--duck-db", type=float, default=3.5, help="baisse pendant la parole"); ap.add_argument("--lufs", type=float, default=-23.0)
a = ap.parse_args()
SR = 48000; rng = np.random.default_rng(a.seed)
N = int(a.duration * SR); t = np.arange(N) / SR
beat = 60 / a.bpm; bar = 4 * beat
A3 = 220.0
def f(n): return A3 * 2 ** (n / 12)            # demi-tons depuis La3
# progression (racine en demi-tons depuis La3, tierce, quinte) : Am, F, C, G
CHORDS = [(0, 3, 7), (-4, 0, 3), (3, 7, 10), (-2, 2, 5)]
def env_ad(n, att, dec):
    e = np.ones(n); na = min(int(att * SR), n); nd = min(int(dec * SR), n)
    if na: e[:na] = np.linspace(0, 1, na, endpoint=False)
    if nd: e[-nd:] = np.minimum(e[-nd:], np.linspace(1, 0, nd))
    return e
def lowpass(x, fc, order=2):
    sos = butter(order, fc / (SR / 2), btype="low", output="sos"); return sosfilt(sos, x)
def highpass(x, fc, order=2):
    sos = butter(order, fc / (SR / 2), btype="high", output="sos"); return sosfilt(sos, x)
pad = np.zeros(N); arp = np.zeros(N); bass = np.zeros(N); kick = np.zeros(N); hat = np.zeros(N)
nbars = int(np.ceil(a.duration / bar)) + 1
for b in range(nbars):
    ch = CHORDS[b % 4]; s = int(b * bar * SR); e = min(int((b + 1) * bar * SR) + int(0.6 * SR), N)
    if s >= N: break
    n = e - s; tt = np.arange(n) / SR
    # nappe : 3 dents de scie désaccordées par note, filtrée
    p = np.zeros(n)
    for semi in ch + (ch[0] + 12,):
        for det in (-0.4, 0, 0.4):
            fr = f(semi) * 2 ** (det / 1200) / 2
            ph = (fr * tt + rng.random()) % 1.0
            p += (2 * ph - 1) * 0.22
    p = lowpass(p, 900 + 300 * np.sin(2 * np.pi * 0.05 * (s / SR)), 2) * env_ad(n, 0.6, 0.8)
    pad[s:e] += p
    # arpège pluck en croches : racine, quinte, octave, tierce+12, quinte, octave, tierce+12, quinte+12
    pattern = [ch[0], ch[2], ch[0] + 12, ch[1] + 12, ch[2], ch[0] + 12, ch[1] + 12, ch[2] + 12]
    for i, semi in enumerate(pattern):
        ss = s + int(i * beat / 2 * SR); ln = int(0.32 * SR)
        if ss + ln > N: break
        tp = np.arange(ln) / SR; fr = f(semi)
        note = (np.sin(2 * np.pi * fr * tp) + 0.35 * np.sin(2 * np.pi * 2 * fr * tp)) * np.exp(-tp * 9) * (0.55 if i % 2 == 0 else 0.42)
        arp[ss:ss + ln] += note * 0.5
    # basse : fondamentale une octave sous la nappe, temps 1 et 3 + poussée en croche
    for i, (pos, ln_b) in enumerate([(0, beat * 1.9), (2 * beat, beat * 1.4), (3.5 * beat, beat * 0.45)]):
        ss = s + int(pos * SR); ln = int(ln_b * SR)
        if ss + ln > N: break
        tb = np.arange(ln) / SR; fr = f(ch[0]) / 4
        bass[ss:ss + ln] += np.tanh(1.6 * np.sin(2 * np.pi * fr * tb)) * env_ad(ln, 0.01, 0.25) * 0.5
    # pulsation : grosse caisse douce sur chaque temps, charley en croches (entrée à la mesure 5, sortie à l'outro)
    if 4 <= b:
        for i in range(4):
            ss = s + int(i * beat * SR); ln = int(0.22 * SR)
            if ss + ln > N: break
            tk = np.arange(ln) / SR
            kick[ss:ss + ln] += np.sin(2 * np.pi * (48 + 90 * np.exp(-tk * 40)) * tk) * np.exp(-tk * 14) * 0.9
        for i in range(8):
            ss = s + int(i * beat / 2 * SR); ln = int(0.05 * SR)
            if ss + ln > N: break
            hat[ss:ss + ln] += highpass(rng.standard_normal(ln), 7000, 2) * np.exp(-np.arange(ln) / SR * 90) * (0.16 if i % 2 else 0.09)
mix = pad * 0.55 + arp * 0.7 + bass * 0.7 + kick * 0.35 + hat * 0.35
# côté chaîne : les percussions s'effacent à l'outro, la nappe monte
outro_i = int(a.outro * SR)
g = np.ones(N)
if outro_i < N:
    ramp = np.linspace(1, 0, int(0.8 * SR)); g[outro_i:outro_i + len(ramp)] = ramp; g[outro_i + len(ramp):] = 0
mix = pad * 0.55 * (1 + 0.5 * (1 - g)) + arp * 0.7 + bass * 0.7 * g + (kick * 0.35 + hat * 0.35) * g
# atténuation pendant la parole : enveloppe RMS de la voix (200 ms), lissée
v = subprocess.run(["ffmpeg", "-v", "error", "-i", a.voice, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
voice = np.frombuffer(v, dtype=np.float32); vv = np.zeros(N); vv[:min(N, len(voice))] = voice[:N]
win = int(0.2 * SR); rms = np.sqrt(np.convolve(vv ** 2, np.ones(win) / win, mode="same"))
active = (rms > 0.02).astype(float)
k = int(0.35 * SR); active = np.convolve(active, np.ones(k) / k, mode="same"); active = np.clip(active * 1.5, 0, 1)
duck = 10 ** (-a.duck_db / 20 * active)
mix = mix * duck
# entrée/sortie en fondu, écrêtage doux, normalisation
mix[: int(1.2 * SR)] *= np.linspace(0, 1, int(1.2 * SR)); mix[-int(0.8 * SR):] *= np.linspace(1, 0, int(0.8 * SR))
mix = np.tanh(mix / (np.abs(mix).max() * 0.9)) * 0.7
raw = a.out + ".raw.wav"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", raw], input=mix.astype(np.float32).tobytes(), check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", f"loudnorm=I={a.lufs}:TP=-2:LRA=9", "-ar", str(SR), "-c:a", "aac", "-b:a", "160k", a.out], check=True)
subprocess.run(["rm", "-f", raw])
print("music written", a.out, f"{a.duration}s bpm={a.bpm} duck={a.duck_db}dB lufs={a.lufs}")
