# VERIFY — luma-audit-gratuit v001

**Rendu livré : `renders/v001_luma-audit-gratuit.mp4`**
SHA-256 : `97e87bf80e91cf53553520eae6884919c6fe39c283ff9ec7fb19e0f95b6eefee`
Statut : proposition livrée, **non validée** par Robin.

## Fichier

| Mesure | Valeur | Attendu |
|---|---|---|
| Conteneur | MP4 H.264 yuv420p BT.709 + AAC 48 kHz stéréo, faststart | ✓ |
| Dimensions / cadence | 1920 × 1080, 30 i/s, 870 images, 29.000 s | ✓ paysage, 20–30 s |
| Loudness | -18.5 LUFS intégrée, pic -1.2 dBFS | ≤ -1 dBFS |
| Taille | 70.3 Mo (qualité « high ») ; copie allégée `_web.mp4` pour l'envoi | — |

## Sources, coupe, voix (CLAUDE.md LUMA §3, §6)

- Rush : `raw-media/IMG_0240.MOV` → copie `assets/source.mov` (31.41 s, HLG). Analyse préalable : `raw-media/IMG_0240.ANALYSE.md`.
- Séquence `assets/footage.mp4` : tone-mapping HLG → SDR BT.709 (zscale + hable), source 3.6667 → 30.2667 s (26.6 s).
- Coupe : ouverture sur « J'aimerais juste finir sur… » (amorce « Et donc voilà pour cette petite présentation » retirée, défaut validé par « Go ») ; aucune autre coupe, hésitations conservées. Liste : `assets/edit-decisions.json`.
- Voix : réelle, vitesse et timbre inchangés. Gain statique +5.6 dB (un gain de +7.7 puis +6.9 dB écrêtait : pic source -6.8 dBFS), fondu 25.9–26.6 s, piste à 0.93 dans la composition pour que le mix avec les SFX reste sous -1 dBFS. Témoin non traité : `assets/voice-source-cut.wav`.
- Mots horodatés : faster-whisper `small` local ; « Loma » → « LUMA » ; `assets/transcript.json` (70 mots).
- Validateurs : `validate-plan.mjs` ✓ (70 mots, 5 scènes, 16 événements), `validate-footage.mjs` ✓, `npx hyperframes lint` 0 erreur 0 avertissement ; preflight : avertissement connu data-start racine + vidéo (compromis lint, rendu correct).
- **ASR fraîche sur l'audio final** (`qa/final-asr.json`) : texte identique, attaques LUMA -0.01, audit +0.01, gratuit -0.01, outils +0.01, objectifs +0.01, premièrement -0.01, gagner +0.01 s. Whisper omet « moi » (13.57–13.63, 60 ms) dans sa transcription du final : le mot est bien présent dans l'audio (vérifié sur la source, même décodeur), c'est une omission du modèle, pas une coupe.

## Contrat HyperFrames (CLAUDE.md LUMA §4–5)

`index.html` généré par `node build.mjs` (structure/style) + `motion.js` (animations, inliné) + `assets/plan.json`
(timing, SFX). Composition `luma-audit-gratuit`, timeline GSAP unique, finie, en pause, enregistrée de façon
synchrone. Médias pilotés par HyperFrames ; aucun aléa.

## Éléments de marque

- Logo/mascotte officiels fournis par Robin (`assets/logo-full.png`, fond blanc opaque). Détourage automatique testé
  et rejeté (blanc de la mascotte et texte fin abîmés) → logo tel quel sur cartes blanches (surface claire de la charte) :
  carte logo (5.21 s → 26.3 s), carte « Audit » avec recadrage de la mascotte, écran de fin.
- Aucun logo inventé, aucun texte de marque ajouté hors « AGENTS IA POUR LES ENTREPRISES » présent dans l'image.

## Contrôles visuels (rendu encodé)

- Planches 12 images (0, 5.7, 10, 13.7, 18.7, 21.7, 23.3, 24.8, 25.8, 26.7, 27.7, 28.9 s) + pleine taille à 21.3 s.
- Draft 1 → v001 : vide sous la puce de la carte « Audit » supprimé (hauteur 340 → 300), panneaux remontés, carte « 1 » descendue (elle passait sous la carte logo à 24–26 s).
- Police Inter chargée (accents « ÉTAPE », « COMPLÈTEMENT », « Prise » ; « d'entreprise » ; « premièrement »), aucun texte coupé.
- Visage jamais couvert : menton ≈ y 800 (LEFT) / 834 (RIGHT) ; sous-titres à y 924 ; pas de bord vide aux cadrages.
- Bandes contiguës 21.7–22.7 s (panoramique + sortie de la colonne + entrée carte « 1 ») et 26.2–27.4 s (vignette + écran de fin) : mouvement continu, aucune image noire, aucun saut.
- Première image : yeux ouverts, bouche en parole (vérifié sur les 6 premières images).

## Son

- SFX synthétisés (`assets/sfx/`), déclarés par événement dans `plan.json` : pop (logo, carte audit, gratuit, carte 1, écran de fin), tick (étape, lignes, panneaux, horloge), whoosh (caméra ×2, vignette), swell (anneau « gagner du temps »). Volumes 0.10–0.15.
- Mesures de signal uniquement ; **aucune écoute perceptive** dans cette session : équilibre voix/SFX et naturel des attaques à valider à l'oreille. Pas de musique (non décidée).

## Limites et points ouverts

- Film = « épisode 1 » : la parole s'arrête sur « premièrement… gagner du temps ». Suite possible avec IMG_0241 (décision de Robin).
- Mini-interfaces (outils, objectifs, situation, horloge) = illustrations éditoriales, pas des captures LUMA.
- Fond blanc du logo : une version transparente ou SVG permettrait d'incruster la mascotte hors des cartes blanches.
- Rendu take 1 (voix à 1.0, pic -0.5 dBFS) conservé en `renders/_v001-take1-peak-0.5.mp4` (non commité).
