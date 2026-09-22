# luma-audit-gratuit — consignes

Film LUMA « comment je travaille avec mes clients » (source `raw-media/IMG_0240.MOV`). Règles du projet
LUMA : lire `../luma-film/CLAUDE.md` et `../luma-film/LUMA_References_Video.md`, puis `DESIGN.md`,
`ITERATIONS.md` et `VERIFY.md` ici. Analyse préalable du rush : `../../raw-media/IMG_0240.ANALYSE.md`.

- Sources de vérité : `build.mjs` (structure, style), `motion.js` (animations, inliné au build),
  `assets/plan.json` (scènes, événements avec SFX, sous-titres). `index.html` est généré : `node build.mjs`.
- Composition `luma-audit-gratuit`, 1920 × 1080, 30 i/s, 29.0 s (séquence 26.6 s + écran de fin).
- Séquence `assets/footage.mp4` (SDR BT.709, tone-mappée depuis le HLG) ; voix `assets/voice.m4a` (gain statique
  +5.6 dB, un gain plus fort écrêtait) ; témoin non traité `assets/voice-source-cut.wav`.
- Logo et mascotte officiels : `assets/logo-full.png` / `assets/logo-end.png` (même image) / `assets/mascot.png`
  (recadrage) sur cartes blanches — pas de détourage.
- SFX : `assets/sfx/*.m4a`, déclarés dans `plan.json` (`sfx` par événement), pistes 6 et 7, volumes 0.10–0.15.
- Après chaque version : rendu numéroté dans `renders/`, `ITERATIONS.md` et `VERIFY.md` mis à jour.
- Validation : `node ../../.claude/skills/short-form-edit/scripts/validate-plan.mjs .`, `npx hyperframes lint`.
