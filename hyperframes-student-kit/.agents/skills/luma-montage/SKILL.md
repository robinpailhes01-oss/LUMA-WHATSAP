---
name: luma-montage
description: Monter un film ou un réel LUMA (Robin, Harmonie Yacht) à partir de rushes face caméra avec le style validé le 23/09/2026 (luma-outils-ia v002) — sans logo permanent, sous-titres gras italique à mots clés bleu clair, titres Barlow posés sur la vidéo sans cartouche, captures réelles anonymisées dans un téléphone à côté du visage, jamais rien sur la tête, SFX légers, voix réelle. À utiliser dès que Robin envoie un rush (Drive, upload) pour un réel ou un film LUMA, demande une v00N, ou dit « monte », « fais ce réel », « étude de cas », « les outils IA ». Couvre l'analyse préalable, la liste des captures à demander, la coupe, la composition build.mjs/motion.js/plan.json, la vérification et la livraison.
---

# LUMA — montage face caméra (style validé v002)

Référence de style **validée par Robin** : `video-projects/luma-outils-ia/` (v002, 23/09/2026 : « j'aime énormément ce style »).
Documents maîtres à lire d'abord : `video-projects/luma-film/LUMA_Bibliotheque_Marque.md` (palette, polices, §9 retours durables),
`video-projects/luma-film/LUMA_References_Video.md` (brief, voix, §14 STYLE-04), `video-projects/luma-film/CLAUDE.md`.
Les instructions directes de Robin priment sur tout ce qui suit.

## 1. Avant de monter : analyser, demander, attendre « Go »

1. Télécharger le rush (Drive : `https://drive.usercontent.google.com/download?id=ID&export=download&confirm=t`, le fichier
   doit être « toute personne disposant du lien » ; vérifier `content-disposition`). Le déposer dans `raw-media/` (< 100 Mo pour
   le commit, sinon garder local et le noter).
2. `ffprobe` : dimensions, rotation, HLG. Les rushes iPhone sont HLG : **décoder directement sans tone-mapping** (le hable
   rougit les couchers de soleil). Vertical natif → réel 9:16 ; paysage tourné → 16:9 (règle générale « paysage » sauf rushes verticaux).
3. Transcrire (faster-whisper `small`, mots horodatés, fusion des apostrophes et traits d'union), détecter blancs et hésitations,
   mesurer le loudness (gain statique cible ≈ -19 LUFS, pic ≤ -1.5 dBTP).
4. **Mesurer la position réelle du visage** sur des images avec grille (`drawgrid`) : noter x/y de la tête à l'échelle 1.
5. Écrire `raw-media/<RUSH>.ANALYSE.md` (technique, parole, structure, chiffres prononcés, coupes proposées) et répondre à Robin :
   plan en 5–6 points + **liste des captures d'écran nécessaires** (une preuve réelle par idée), choix de coupe par défaut. Attendre « Go ».
   Sans capture fournie pour une idée : illustration LUMA (carte verre), signalée comme telle dans DESIGN.md.

## 2. Coupe et voix

- Amorces et fins coupées, blancs ≥ 2 s ramenés à ≈ 0.5 s, **aucun mot retiré sans accord** (proposer les hésitations, ne pas
  les couper seul). Plusieurs rushes → concaténés dans l'ordre narratif ; chaque raccord est couvert par un changement de cadrage
  et un titre de section.
- Voix réelle, gain statique unique, fondu de fin ; jamais de TTS, de clonage ni de compression dynamique. Témoin `voice-source-cut.wav`.
- Séquence `assets/footage.mp4` en CRF 16 pour le rendu ; si > 100 Mo, commiter un ré-encodage CRF 21 et garder le master local.
- `transcript.json` + `edit-decisions.json` (plusieurs rushes : `sourceStart = index du rush × 1000 + temps`) ; `validate-plan.mjs` doit passer.

## 3. Composition (copier `video-projects/luma-outils-ia/build.mjs` et `motion.js` comme gabarit)

Structure : `build.mjs` (CSS, DOM, attribution automatique des pistes SFX) + `motion.js` (une timeline GSAP en pause, inlinée)
+ `assets/plan.json` (scènes, événements avec `sfx`, sous-titres avec mots `sel`). `node build.mjs` → `index.html`.

**Règles visuelles validées**
- **Pas de logo pendant le film** ; logo uniquement à l'écran de fin (carte blanche `logo-end.png`, signature Caveat, bouton « Découvrir Luma → »).
- **Sous-titres** : Inter 800 italique, ≈ 54 px (9:16) / 43–46 px (16:9), blanc, ombre portée sombre ; mot actif et mots clés en
  bleu clair `#8FBBFF` (couleur de texte, pas de pilule) ; groupes ≤ 26 caractères, bascule instantanée entre groupes ; y ≈ 1440 en 9:16.
- **Rien sur la tête, jamais** : définir les cadrages à partir de la mesure du visage ; zone haute pour titres et chiffres,
  colonne latérale pour le téléphone et les pilules, buste pour les cartes d'interface (commentaire). Vérifier sur une planche 1 image/s.
- **Titres de section** : Barlow Condensed 800 posé sur la vidéo (ombre), kicker « OUTIL 1/3 » en capitales espacées, mot clé en
  `#8FBBFF` uni (pas de dégradé avec `filter`, il noircit) ; compteur `1/3` en petite pilule bleu nuit en haut à droite ;
  voile dégradé sombre discret sur les 620 px du haut pour la lisibilité.
- **Pas de gros carrés de couleur** : chiffres clés en texte dégradé (`background-clip: text`, sans `filter`), cartes seulement pour
  les vrais objets d'interface ou en verre clair (`rgba(255,255,255,0.14)` + blur + bord fin). Pilules courtes (bleu, violet, bleu nuit translucide).
- **Captures réelles** dans un téléphone (bord bleu nuit, coins 42 px) à côté du visage ; en-têtes, noms de contacts et montants
  floutés à la source (PIL, jamais réintroduits) ; sélections à poignées (`.selbox`) sur la zone citée ; écrans qui glissent (0.55 s).
- **Prochaine étape validée par Robin (à faire au prochain montage)** : passer ponctuellement une capture en **page plein écran**
  (le visage disparaît puis revient), par exemple la conversation WhatsApp — voir `LUMA_References_Video.md` §14 (STYLE-04) ; pas
  systématique, une idée par page, retour au visage.
- Annotations Caveat bleu/violet (« Par ici ! », « Même la météo ! »), flèches tracées (`strokeDashoffset`), tuiles d'outils
  Simple Icons (`assets/icons/`), puces avec les nombres visibles dans les captures uniquement.
- Durées (bibliothèque §6) : titre 0.5, soulignement 0.35, mot actif 0.15, tuiles 0.45 `back.out`, écran 0.55–0.6, données 0.45–0.8,
  outro 0.8 ; un mouvement principal à la fois. Caméra : `power2.inOut` 0.7 s, échelle 1.0–1.3, origine 0 0.
- SFX synthétisés `assets/sfx/{pop,tick,whoosh,swell}.m4a`, volumes 0.10–0.15, pistes auto 6/9/10 (pop/tick), 7/11 (whoosh), 8 (swell). Pas de musique.

## 4. Vérifier puis livrer

1. `node .agents/skills/short-form-edit/scripts/validate-plan.mjs <projet>`, `validate-footage.mjs`, `npx hyperframes lint` (0 erreur ;
   l'avertissement preflight data-start racine + vidéo est connu).
2. Draft `--quality draft` (≈ 10 min / 97 s), planche d'images, corriger, puis final `--quality high` (≈ 15 min / 97 s) en arrière-plan.
3. Sur le rendu encodé : planche 1 image/s (aucun élément sur le visage, aucune image noire), images pleines aux moments clés,
   loudness, **ASR fraîche** sur l'audio final comparée au plan (écart ≤ 0.05 s sur les mots clés).
4. Livrer une copie web ≤ 30 Mo (CRF 24–27) via SendUserFile ; commit `renders/v00N_<objectif>.mp4` < 100 Mo (sinon CRF 20).
5. Mettre à jour `DESIGN.md`, `VERIFY.md`, `ITERATIONS.md`, `CLAUDE.md` du projet, `luma-film/ITERATIONS.md`, et les documents maîtres
   pour toute décision durable ; `git add -f` (le dossier `video-projects/` est ignoré par défaut) ; push. Ne jamais publier sur un réseau.
