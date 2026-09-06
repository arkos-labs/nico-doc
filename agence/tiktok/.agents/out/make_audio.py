#!/usr/bin/env python3
"""Génère une nappe musicale douce (ambient) en local, sans réseau.
Écrit un WAV 48kHz mono. Nappe: progression d'accords, enveloppe lente."""
import os, math, struct, wave

SR = 48000
DUR = 16.0
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audio", "bed.wav")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# Accord progressions (fréquences des notes), style ambient.
chords = [
    [220.00, 277.18, 329.63],   # Am
    [174.61, 220.00, 261.63],   # F
    [196.00, 246.94, 293.66],   # G
    [146.83, 185.00, 220.00],   # Dm
]
chord_dur = 4.0  # secondes par accord

samples = int(SR * DUR)
n = 0
buf = bytearray()

def env(t):
    # enveloppe: attaque/relache douce au niveau global
    return min(1.0, t / 1.5) * min(1.0, (DUR - t) / 1.5)

def note_wave(freq, t):
    # somme d'ondes: fondamentale + légers harmoniques + vibrato lent
    vib = 0.0
    if freq:
        vib = math.sin(2 * math.pi * 5.0 * t) * 0.003
    v = 0.0
    if freq:
        v += math.sin(2 * math.pi * (freq) * t)
        v += 0.35 * math.sin(2 * math.pi * (freq * 2.0) * t)
        v += 0.18 * math.sin(2 * math.pi * (freq * 3.0) * t)
    return v

idx = 0
for i in range(samples):
    t = i / SR
    chord_idx = int(t // chord_dur) % len(chords)
    local = t - (t // chord_dur) * chord_dur
    # crossfade léger entre accords
    chord = chords[chord_idx]
    next_chord = chords[(chord_idx + 1) % len(chords)]
    cf = min(1.0, local / 1.0)
    s = 0.0
    for k, f in enumerate(chord):
        s += note_wave(f, t) * (1 - cf)
    for k, f in enumerate(next_chord):
        s += note_wave(f, t) * cf
    s /= (len(chord) + len(next_chord))
    # léger groove basse
    s += 0.5 * math.sin(2 * math.pi * 55.0 * t) * 0.08
    s *= 0.6 * env(t)
    # soft clip
    s = max(-1.0, min(1.0, s * 0.9))
    val = int(s * 32767)
    buf += struct.pack("<h", val)

with open(OUT, "wb") as f:
    f.write(b"RIFF")
    f.write(struct.pack("<I", 36 + len(buf)))
    f.write(b"WAVE")
    f.write(b"fmt ")
    f.write(struct.pack("<IHHIIHH", 16, 1, 1, SR, SR * 2, 2, 16))
    f.write(b"data")
    f.write(struct.pack("<I", len(buf)))
    f.write(bytes(buf))
print("wrote", OUT, len(buf) // 2, "samples")
