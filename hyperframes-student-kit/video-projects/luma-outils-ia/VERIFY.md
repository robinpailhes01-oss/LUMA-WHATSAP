# VERIFY — luma-outils-ia

## v002 — retours (23/09/2026) — **rendu livré : `renders/v002_retours.mp4`**

SHA-256 : `d37973fbb9f34dcc…` (ré-encodage CRF 20 du master HyperFrames 197 Mo, conservé localement en `renders/_v002-master.mp4`).
Statut : proposition livrée, **non validée**.

| Mesure | Valeur | Attendu |
|---|---|---|
| Conteneur | MP4 H.264 yuv420p BT.709 + AAC 48 kHz, faststart | ✓ |
| Dimensions / cadence | 1080 × 1920, 30 i/s, 2916 images, 97.200 s | ✓ |
| Loudness | -19.3 LUFS intégrée, pic -2.1 dBTP | ≤ -1 dBFS |
| Taille | 67.3 Mo (dépôt) ; copie `_web.mp4` 25.1 Mo | < 100 Mo |

- Coupe, voix, plan et sous-titres (mots, temps) **inchangés** depuis la v001 : les validateurs et l'ASR de contrôle v001 restent valables ; lint 0 erreur.
- Retours appliqués : logo retiré ; sous-titres Inter 800 italique blancs avec ombre, mot actif et mots clés en bleu clair `#8FBBFF` (plus de pilule) ;
  visage mesuré sur une grille (y 700–1230 / x 440–800 à l'échelle 1) et cadrages recalculés (FACE_LEFT/RIGHT 1.3, y -290 ; PUSH 1.1, y -150) ;
  « 3 h / jour » déplacé dans la zone haute à la place de l'accroche ; carte commentaire descendue sur le buste (y 1250) ;
  titres, « 3 h » et « ≈ 20 % » en texte sur la vidéo ; cartes Audit / Actions / Audit gratuit en verre clair ; voile dégradé discret sur les 620 px du haut.
- **Contrôle « jamais sur la tête »** : planche 98 images (1/s, `qa/v002-sheet.jpg`) + 8 images pleines (2, 6, 21, 31, 45.5, 66, 80, 90 s) :
  aucun élément ne recouvre le visage ; téléphones et pilules restent à côté, cartes et titres au-dessus.
- Draft 2 → v002 : ajout du voile haut pour la lisibilité des titres sur le plafond blanc ; premier rendu final refait après un défaut
  (ombre portée appliquée à un texte dégradé → mots clés des titres sombres) : mots clés des titres passés en bleu clair uni.
- Aucune écoute perceptive dans cette session ; mesures de signal uniquement.

## v001 — (23/09/2026) — remplacé par v002

**Rendu livré : `renders/v001_outils-ia.mp4`** — SHA-256 `ba4c46aada33745f…` (ré-encodage CRF 20 du master HyperFrames
de 207 Mo, conservé localement en `renders/_v001-master-207mb.mp4`, sha256 `d88b8f554a91326c…`). Statut : proposition
livrée, **non validée**.

| Mesure | Valeur | Attendu |
|---|---|---|
| Conteneur | MP4 H.264 yuv420p BT.709 + AAC 48 kHz, faststart | ✓ |
| Dimensions / cadence | **1080 × 1920**, 30 i/s, 2916 images, 97.200 s | ✓ vertical (rushes natifs) |
| Loudness | -19.4 LUFS intégrée, pic -2.1 dBTP | ≤ -1 dBFS |
| Taille | 71.6 Mo (dépôt) ; copie `_web.mp4` 26.7 Mo (CRF 27) | < 100 Mo |

## Sources, coupe, voix

- Cinq rushes verticaux natifs (`raw-media/IMG_0380/0382/0386/0388/0391.MOV`, 9 à 33 Mo, commités) ; analyse et
  transcriptions par rush dans `raw-media/`.
- Séquence `assets/footage.mp4` : cinq segments concaténés (amorces/fins retirées), 2832 images / 94.4 s à 30 i/s, HLG décodé
  sans tone-mapping (planche `qa/footage-sheet.jpg` : lumière neutre, pas de dominante). Le rendu a été fait depuis la séquence
  CRF 16 (139 Mo, au-dessus de la limite GitHub, conservée localement en `assets/_footage-crf16-master.mp4`) ; la copie
  versionnée est un ré-encodage CRF 21 de la même coupe (mêmes images, mêmes temps) — re-rendre depuis cette copie donne
  un fichier légèrement moins net, pas un montage différent.
- Voix : réelle, gain statique +9 dB (-28.4 → -19.4 LUFS, pic -2.0 dBTP), fondu 93.7–94.3 s. Témoin : `assets/voice-source-cut.wav`.
- Mots horodatés : transcriptions Whisper de chaque rush recalées sur la séquence (334 mots) ; convention
  `sourceStart = index du rush × 1000 + temps dans le rush` documentée dans `CLAUDE.md`.
- Validateurs : `validate-plan.mjs` ✓ (334 mots, 6 scènes, 67 événements), `validate-footage.mjs` ✓, `npx hyperframes lint`
  0 erreur (1 avertissement attendu) ; preflight : avertissement connu.
- **ASR fraîche sur l'audio final** (`qa/final-asr.json`) : texte identique ; 26 mots clés comparés (outils, tableau, finance,
  marge, marketing, réservations, audit, cité, 20, WhatsApp, autonome, règles, CRM, disponibilité, météo, PME, commenter,
  gratuit, apporter…) : **écart max 0.04 s**, aucun > 0.15 s.

## Captures (`assets/shots/`, contrôle `qa/shots-check.jpg`)

- `resa.png` : en-tête retiré, **noms de clients et montants floutés** (soldes, prix, acomptes) ; dates, libellés et statuts lisibles.
- `chatgpt.png` : barre d'icônes retirée ; aucune donnée personnelle ; paragraphe « Harmonie Yacht » encadré à 36.9 s.
- `wa-dispo.png` : en-tête (nom du contact, avatar), message système et barre de saisie retirés ; bulle « Vendredi 11 septembre
  est libre » encadrée sur « disponibilité » (72.4 s).
- `vue/rapports/canaux.png` : versions floutées de `luma-etude-de-cas`.

## Contrôles visuels (rendu encodé)

- Planche 98 images (1/s, `qa/v001-sheet.jpg`) : aucune image noire ; les quatre raccords entre rushes coïncident avec un
  changement de cadrage et un titre ; fin propre.
- Images pleines à 6, 21, 28.7, 45.5, 49.8, 76, 87.5, 93 s : accroche « 3 OUTILS IA » + carte « 3 H / JOUR », téléphone
  tableau de bord avec sélections, titres et compteur 1/3 → 3/3, téléphone ChatGPT + carte « ≈ 20 % », conversation WhatsApp
  + pilules + tuiles, commentaire « outil » tapé, carte « AUDIT GRATUIT · 0 € », écran de fin.
- Draft 1 → v001 : **groupes de sous-titres qui se chevauchaient à l'écran** (fondu croisé de 0.1 s entre groupes contigus)
  → bascule instantanée entre groupes ; contrôle sur 8 images : plus aucun chevauchement.
- Zone sûre Instagram : sous-titres à y 1440 ; éléments de droite ≤ x 982 et ≤ y 1140 ; visage jamais couvert.

## Son

Mesures de signal uniquement ; aucune écoute perceptive dans cette session.

### v003 — musique de fond (24/09/2026)
- Rendu `--quality high` depuis le master CRF 16 : 2 916 images / 97.2 s ; master 211 Mo local (`renders/_v003-master.mp4`),
  copie dépôt CRF 20 `renders/v003_musique_repo.mp4` (67 Mo), copie web CRF 27 `renders/v003_musique_web.mp4` (24.5 Mio) envoyée.
- Image inchangée par rapport à v002 (même `plan.json`, `motion.js`, même séquence) ; seule la piste 12 est ajoutée.
- Musique seule : −22.5 LUFS, pic −8.5 dBTP (`assets/music.m4a`, générée). Mixage final : **−18.8 LUFS intégré, pic −1.6 dBTP**
  (v002 : ≈ −19 LUFS). Écran de fin sans voix : −22.3 LUFS (v002 : −40.6, SFX seuls) → la musique est bien présente et monte à la fin.
  Pendant la parole, la musique est ≈ 9–10 dB sous la voix (volume 0.45 + −3.5 dB automatiques).
- Non contrôlé : écoute humaine (équilibre voix/musique, goût du style). Réglages : `data-volume` (build.mjs), `--duck-db`, `--bpm`.

## Limites et points ouverts

- Audit GEO et actions bimensuelles : cartes illustratives (aucune capture fournie).
- Tuiles Gemini / Perplexity ajoutées à ChatGPT sur « mise en avant sur les IA » : interprétation.
- Hésitations conservées ; durée 97 s.
- Draft et masters non commités (`renders/draft-1.mp4`, `renders/_v001-master-207mb.mp4`, `renders/_v002-master.mp4`, `renders/_v003-master.mp4`).
