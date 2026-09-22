# luma-agent-whatsapp — consignes

Film LUMA « l'agent WhatsApp qui parle comme moi » (source `raw-media/IMG_0230.MOV`). Règles du projet LUMA :
lire `../luma-film/CLAUDE.md` et `../luma-film/LUMA_References_Video.md`, puis `DESIGN.md`, `ITERATIONS.md`
et `VERIFY.md` ici. Analyse préalable : `../../raw-media/IMG_0230.ANALYSE.md`.

- Sources de vérité : `build.mjs` (structure, style), `motion.js` (animations, inliné au build), `assets/plan.json`
  (scènes, événements avec SFX, sous-titres). `index.html` est généré : `node build.mjs`.
- Composition `luma-agent-whatsapp`, 1920 × 1080, 30 i/s, 45.0 s (séquence 43.03 s + écran de fin).
- Séquence `assets/footage.mp4` : 3 segments (blancs coupés), tone-mappée HLG → SDR ; voix `assets/voice.m4a`
  (gain statique +4.8 dB) ; témoin non traité `assets/voice-source-cut.wav`.
- Captures WhatsApp réelles (`assets/shots/wa1.png`, `wa2.png`) recadrées sans nom de contact. Ne jamais réintroduire
  l'en-tête des captures (noms) dans le film.
- Logo : uniquement l'écran de fin (`assets/logo-end.png`), consigne « moins de logo ».
- Après chaque version : rendu numéroté dans `renders/`, `ITERATIONS.md` et `VERIFY.md` mis à jour.
- Validation : `node ../../.claude/skills/short-form-edit/scripts/validate-plan.mjs .`, `npx hyperframes lint`.
