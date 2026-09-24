# luma-outils-ia — consignes

Réel LUMA « les 3 outils IA que j'ai mis dans mon entreprise », vertical 1080 × 1920 (cinq rushes verticaux natifs
`raw-media/IMG_0380/0382/0386/0388/0391.MOV`). Règles : `../luma-film/CLAUDE.md`, `../luma-film/LUMA_Bibliotheque_Marque.md`,
`../luma-film/LUMA_References_Video.md`, puis `DESIGN.md`, `ITERATIONS.md`, `VERIFY.md`. Analyse : `../../raw-media/OUTILS-IA.ANALYSE.md`.

- Sources de vérité : `build.mjs` (structure, style, pistes SFX), `motion.js` (animations, inliné), `assets/plan.json`
  (scènes, événements, sous-titres avec mots « sel »). `node build.mjs` régénère `index.html`.
- Composition `luma-outils-ia`, 97.2 s (séquence 94.4 s + outro). Caméra FULL / FACE_LEFT / FACE_RIGHT / PUSH ; visage à
  y 700–1230 / x 440–800 (échelle 1) : **aucun élément sur la tête** (retour Robin v001). v001 : `qa/build-v001.mjs`, `qa/motion-v001.js`.
- Règles v002 (Robin) : pas de logo dans le film, sous-titres Inter 800 italique à mots clés bleu clair, titres en texte sans cartouche.
- `assets/transcript.json` et `assets/edit-decisions.json` : `sourceStart/sourceEnd = index du rush × 1000 + temps dans
  le rush` (plages uniques pour le validateur) ; `qa/keeps.json` garde la table des rushes.
- Captures `assets/shots/` : noms et montants floutés à la source ; ne jamais réutiliser les originaux non floutés.
- Voix `assets/voice.m4a` (+9 dB) ; témoin `assets/voice-source-cut.wav`. Musique v004 `assets/music.m4a` (piste 12, volume 0.55, style `dynamic`),
  régénérable : `python3 ../../.claude/skills/luma-montage/scripts/make-music.py --duration 97.2 --voice assets/voice.m4a --outro 94.4 --out assets/music.m4a --style dynamic --cuts 6.5333,28.9333,50.3333,78.0` (v003 : `--style soft`).
- Le rendu haute qualité se fait avec le master CRF 16 copié sur `assets/footage.mp4` ; remettre la copie CRF 21 (`assets/_footage-crf21-commit.mp4`) avant de commiter.
- Après chaque version : rendu numéroté dans `renders/`, `ITERATIONS.md` et `VERIFY.md` mis à jour.
- Validation : `node ../../.claude/skills/short-form-edit/scripts/validate-plan.mjs .`, `npx hyperframes lint`,
  rendu `npx hyperframes render . --output renders/vNNN_<objectif>.mp4 --quality high` (≈ 10 min pour 97 s).
