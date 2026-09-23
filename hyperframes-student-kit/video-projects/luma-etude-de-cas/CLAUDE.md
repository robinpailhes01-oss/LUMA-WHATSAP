# luma-etude-de-cas — consignes

Étude de cas LUMA « mon propre tableau de bord » (source `raw-media/IMG_0232.MOV`), paysage 1920 × 1080. Règles du projet
LUMA : lire `../luma-film/CLAUDE.md`, `../luma-film/LUMA_Bibliotheque_Marque.md` et `../luma-film/LUMA_References_Video.md`,
puis `DESIGN.md`, `ITERATIONS.md` et `VERIFY.md` ici. Analyse préalable : `../../raw-media/IMG_0232.ANALYSE.md`.

- Sources de vérité : `build.mjs` (structure, style, jetons de marque, attribution des pistes SFX), `motion.js`
  (animations, inliné au build), `assets/plan.json` (scènes, événements avec SFX, sous-titres, mots « sel »). `node build.mjs`.
- Composition `luma-etude-de-cas`, 41.2 s (séquence 38.433 s + outro). Caméra LEFT 1.22 / RIGHT 1.32.
- Captures réelles `assets/shots/{vue,rapports,canaux,pub}.png` : montants floutés à la source (PIL) — **ne jamais
  réutiliser les captures d'origine non floutées** ; les puces ne citent que des nombres visibles.
- Voix `assets/voice.m4a` (+5.5 dB) ; témoin `assets/voice-source-cut.wav`. Polices Inter, Barlow Condensed, Caveat.
- Après chaque version : rendu numéroté dans `renders/`, `ITERATIONS.md` et `VERIFY.md` mis à jour.
- Validation : `node ../../.claude/skills/short-form-edit/scripts/validate-plan.mjs .`, `npx hyperframes lint`,
  rendu `npx hyperframes render . --output renders/vNNN_<objectif>.mp4 --quality high`.
