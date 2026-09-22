# luma-reel-agent — consignes

Réel LUMA 9:16 « l'agent WhatsApp qui répond » (source `raw-media/IMG_0267.MOV`, non commité : 219 Mo). Règles du
projet LUMA : lire `../luma-film/CLAUDE.md`, `../luma-film/LUMA_Bibliotheque_Marque.md` et
`../luma-film/LUMA_References_Video.md`, puis `DESIGN.md`, `ITERATIONS.md` et `VERIFY.md` ici.
Analyse préalable : `../../raw-media/IMG_0267.ANALYSE.md`.

- Sources de vérité : `build.mjs` (structure, style, jetons de marque), `motion.js` (animations, inliné au build),
  `assets/plan.json` (scènes, événements avec SFX, sous-titres, mots « sel » à sélection). `index.html` est généré : `node build.mjs`.
- Composition `luma-reel-agent`, 1080 × 1920, 30 i/s, 32.0 s (séquence 29.267 s + outro).
- Séquence `assets/footage.mp4` : 1440 × 1920 (recadrage 3:4 du 4K, HLG décodé sans tone-mapping) ; caméra par
  translation x (CENTER -180, RIGHT 0, LEFT -360). Voix `assets/voice.m4a` (+7 dB) ; témoin `assets/voice-source-cut.wav`.
- Polices locales : Inter, Barlow Condensed 700/800, Caveat (`assets/fonts/`, `fonts.css`). Icônes Simple Icons (`assets/icons/`).
- Captures WhatsApp réelles (`assets/shots/`) sans en-tête ni nom : ne jamais réintroduire les noms.
- Après chaque version : rendu numéroté dans `renders/`, `ITERATIONS.md` et `VERIFY.md` mis à jour.
- Validation : `node ../../.claude/skills/short-form-edit/scripts/validate-plan.mjs .`, `npx hyperframes lint`,
  rendu `npx hyperframes render . --output renders/vNNN_<objectif>.mp4 --quality high`.
