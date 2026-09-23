# VERIFY — luma-outils-ia v001

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

Mesures de signal uniquement ; aucune écoute perceptive dans cette session. Pas de musique.

## Limites et points ouverts

- Audit GEO et actions bimensuelles : cartes illustratives (aucune capture fournie).
- Tuiles Gemini / Perplexity ajoutées à ChatGPT sur « mise en avant sur les IA » : interprétation.
- Hésitations conservées ; durée 97 s.
- Draft et master non commités (`renders/draft-1.mp4`, `renders/_v001-master-207mb.mp4`).
