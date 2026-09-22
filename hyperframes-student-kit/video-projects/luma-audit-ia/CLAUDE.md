# luma-audit-ia — consignes

Ce film suit les règles du projet LUMA : lire d'abord `../luma-film/CLAUDE.md` et
`../luma-film/LUMA_References_Video.md`, puis `DESIGN.md`, `ITERATIONS.md` et `VERIFY.md` ici.

- Sources de vérité : `build.mjs` (structure, style), `motion.js` (animations), `assets/plan.json`
  (plan, événements, sous-titres). `index.html` est généré : `node build.mjs`. Ne pas corriger le HTML seul.
- Composition HyperFrames : `luma-audit-ia`, 1920 × 1080, 30 i/s, 17.0 s. Rendu : `npx hyperframes render --quality high --output renders/v00N_<objectif>.mp4`.
- Séquence : `assets/footage.mp4` (SDR BT.709). Le rush `assets/source.mov` est HLG ; toute nouvelle coupe repasse par la conversion SDR (commande dans `VERIFY.md`).
- Voix réelle : `assets/voice.m4a` (gain statique seulement). Témoin non traité : `assets/voice-source-cut.wav`.
- Après chaque version : nouveau fichier numéroté dans `renders/`, `ITERATIONS.md` mis à jour, contrôles consignés dans `VERIFY.md`.
- Validation : `node ../../.claude/skills/short-form-edit/scripts/validate-plan.mjs .`, `npx hyperframes lint`, `node ../../scripts/preflight.mjs .`.
