# VERIFY — luma-reel-agent v001

**Rendu livré : `renders/v001_luma-reel-agent.mp4`**
SHA-256 : `d692a036a3eb941b…`
Statut : proposition livrée, **non validée** par Robin.

## Fichier

| Mesure | Valeur | Attendu |
|---|---|---|
| Conteneur | MP4 H.264 yuv420p BT.709 + AAC 48 kHz, faststart | ✓ |
| Dimensions / cadence | **1080 × 1920**, 30 i/s, 960 images, 32.000 s | ✓ réel vertical |
| Loudness | -18.1 LUFS intégrée, pic -2.0 dBTP | ≤ -1 dBFS |
| Taille | 60 Mo (qualité `high`) ; copie `_web.mp4` 13 Mo pour l'envoi | < 100 Mo |

## Sources, coupe, voix

- Rush : `raw-media/IMG_0267.MOV` (45.91 s, HLG 4K paysage, 219 Mo, non commité). Analyse : `raw-media/IMG_0267.ANALYSE.md`.
- Séquence `assets/footage.mp4` : recadrage 1620×2160 centré sur le visage → 1440×1920, 6 segments concaténés,
  30 i/s vérifiés (878 images / 29.267 s). HLG décodé directement (le tone-mapping hable rougissait le coucher de soleil,
  comparatif sur image à 12 s).
- Coupe : cinq blancs de 2.0 à 5.0 s ramenés à ≈ 0.5 s, amorce et fin. **Aucun mot retiré.** `assets/edit-decisions.json`.
- Voix : réelle, gain statique +7 dB, fondu final. Témoin non traité : `assets/voice-source-cut.wav`.
- Mots horodatés : faster-whisper `small` sur la voix coupée, apostrophes fusionnées, « et » (4.50) recalé après le
  raccord ; `assets/transcript.json` (83 mots).
- Validateurs : `validate-plan.mjs` ✓ (83 mots, 8 scènes, 43 événements, écart max 1.74 s), `validate-footage.mjs` ✓,
  `npx hyperframes lint` 0 erreur 0 avertissement ; preflight : avertissement connu data-start racine + vidéo.
- **ASR fraîche sur l'audio final** (`qa/final-asr.json`) : texte identique mot pour mot ; attaques de chef, demandes,
  interrompu, solution, agent, répond, exactement, connecté, disponible, clients, interrompre : **Δ 0.00 s**.

## Contrat HyperFrames

`index.html` généré par `node build.mjs` (structure/style, jetons de marque) + `motion.js` (animations, inliné) +
`assets/plan.json`. Composition `luma-reel-agent`, timeline GSAP unique, finie, en pause, synchrone.

## Contrôles visuels (rendu encodé)

- Planche 64 images (toutes les 0.5 s) `qa/v001-sheet.jpg` : aucune image noire, continuité caméra, fin propre.
- Images pleines à 1.9, 2.3, 5.6, 11.8, 15.2, 20.7, 24.6, 28.6 s + recadrage du téléphone à 11.8 s : captures WhatsApp
  lisibles, aucun nom de contact, sélection à poignées visible, accents présents (« Découvrir », « côtés », « D'ENTREPRISE »).
- Draft 1 → v001 : bande titre remontée et sortie à 2.0 s (chevauchait le sous-titre), dégradé sur tout « d'entreprise ? »,
  téléphone agrandi (400 → 434 px), pilules clients resserrées hors de la colonne d'icônes Instagram.
- Visage jamais couvert ; sous-titres à y 1440 ; logo en haut à gauche sur le ciel.

## Son

- SFX déclarés par événement (37 cues), volumes 0.10–0.15 ; swell sur piste 8 (sans chevauchement).
- Mesures de signal uniquement ; **aucune écoute perceptive** dans cette session. Pas de musique.

## Limites et points ouverts

- Messages des trois notifications et des pilules clients : illustratifs (écrits pour le film), pas des captures.
- « tu as interrompu » dans les sous-titres suit Whisper ; Robin dit « tu es interrompu » — à corriger en v002 si souhaité.
- Rush 219 Mo non versionné (limite GitHub) ; source : le lien Drive.
- Draft conservé en `renders/draft-1.mp4` (non commité).
