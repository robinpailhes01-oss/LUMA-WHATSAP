# luma-site — consignes

Film LUMA paysage 1920 × 1080 pour le **site internet** de Robin, monté à partir de onze rushes paysage HLG
(`raw-media/site/IMG_0338 … IMG_0361.MOV`, analyse `raw-media/site/SITE.ANALYSE.md`). Skill à charger : `luma-montage`.
Règles : `../luma-film/CLAUDE.md`, `../luma-film/LUMA_Bibliotheque_Marque.md`, `../luma-film/LUMA_References_Video.md` (§14 STYLE-04),
puis `DESIGN.md`, `ITERATIONS.md`, `VERIFY.md`.

- Sources de vérité : `qa/prep-footage.py` (coupes, séquence, voix, transcript, EDL), `qa/make-plan.py` (scènes, événements,
  groupes de sous-titres → `assets/plan.json`), `build.mjs` (structure, style, pistes SFX), `motion.js` (animations, inliné).
  Chaîne : `python3 qa/prep-footage.py` (RUN=1 pour ré-encoder) → `python3 qa/make-plan.py` → `node build.mjs` → validateurs → lint → rendu.
- Composition `luma-site`, 129.53 s (séquence 126.53 s + écran de fin 3 s). Caméra FULL / FACE_LEFT / FACE_RIGHT / PUSH ;
  visage mesuré à x 660–1080 / y 60–740 (échelle 1) : **aucun élément sur la tête**. Colonnes libres : droite (x ≥ 960 ou 1180), gauche (x ≤ 740).
- Une seule page plein écran (STYLE-04) : s05, 71.3 → 78.07 s, trois conversations WhatsApp réelles ; le visage revient à la coupe suivante.
- `assets/transcript.json` / `assets/edit-decisions.json` : `sourceStart = index du rush × 1000 + temps dans le rush` ; `qa/keeps.json` = table des rushes.
- Captures `assets/shots/` : en-têtes WhatsApp (noms de contacts) coupés, noms et montants de la liste de réservations floutés à la
  source ; ne jamais réutiliser les originaux. `resultats.png` (217 demandes / 1 851 messages) est utilisée telle quelle.
- Voix `assets/voice.m4a` (+7.4 dB statique, fondu de fin) ; témoin `assets/voice-source-cut.wav`. Aucun mot retiré (hésitations gardées).
- Séquence : le rendu utilise `assets/footage.mp4` = copie du master CRF 16 (`assets/_footage-crf16-master.mp4`, local, 186 Mo) ;
  le dépôt contient la version CRF 21 (`git add -f`). Pour re-rendre en haute qualité, recopier le master sur `assets/footage.mp4`.
- Validation : `node ../../.claude/skills/short-form-edit/scripts/validate-plan.mjs .`, `validate-footage.mjs .`, `npx hyperframes lint`,
  rendu `npx hyperframes render . --output renders/vNNN_<objectif>.mp4 --quality high --quiet` (≈ 20 min pour 130 s, en arrière-plan).
