# VERIFY — luma-agent-whatsapp v001

**Rendu livré : `renders/v001_luma-agent-whatsapp.mp4`**
SHA-256 : `e9b16eac72d16fc7f1fe860583fa559ace7257f1f96705db448a8bc37511dd20`
Statut : proposition livrée, **non validée** par Robin.

## Fichier

| Mesure | Valeur | Attendu |
|---|---|---|
| Conteneur | MP4 H.264 yuv420p BT.709 + AAC 48 kHz stéréo, faststart | ✓ |
| Dimensions / cadence | 1920 × 1080, 30 i/s, 1350 images, 45.000 s | ✓ paysage (toute la parole gardée : 43 s) |
| Loudness | -17.8 LUFS intégrée, pic -1.6 dBFS | ≤ -1 dBFS |
| Taille | ré-encodé CRF 19 depuis le master HyperFrames de 124 Mo (au-dessus de la limite GitHub de 100 Mo, conservé localement en `renders/_v001-master-124mb.mp4`, sha256 cff4d549…) ; copie allégée `_web.mp4` pour l'envoi | < 100 Mo |

## Sources, coupe, voix

- Rush : `raw-media/IMG_0230.MOV` → `assets/source.mov` (45.98 s, HLG). Analyse : `raw-media/IMG_0230.ANALYSE.md`.
- Séquence `assets/footage.mp4` : 3 segments concaténés (1.10–35.10, 35.53–41.27, 41.60–44.90 s), tone-mapping HLG → SDR BT.709. Les deux raccords sont des jump cuts sur le visage ; bande contiguë 33.6–34.5 s vérifiée : le visage ne bouge pas de place, raccord discret.
- Coupe : amorce, deux blancs après « et » (0.72 → 0.32 s ; 0.60 → 0.27 s), silence de fin. **Aucun mot retiré.** Liste : `assets/edit-decisions.json`.
- Voix : réelle, vitesse et timbre inchangés. Gain statique +4.8 dB (-22.8 → -18.1 LUFS, pic -1.8 dBFS), fondu 42.4–43.0 s. Témoin non traité : `assets/voice-source-cut.wav`.
- Mots horodatés : faster-whisper `small` local, recalés sur l'EDL ; `assets/transcript.json` (135 mots après fusion des apostrophes).
- Validateurs : `validate-plan.mjs` ✓ (135 mots, 5 scènes, 35 événements), `validate-footage.mjs` ✓, `npx hyperframes lint` 0 erreur 0 avertissement ; preflight : avertissement connu data-start racine + vidéo.
- **ASR fraîche sur l'audio final** (`qa/final-asr.json`) : texte identique mot pour mot (Whisper écrit « métaux » pour « météo » et « 2 000 » pour « 2000 », erreurs du modèle, audio intact). Attaques : créé +0.02, rien 0.00, CRM 0.00, WhatsApp -0.02, humaine 0.00, qualifier -0.01, tableau -0.01, relance +0.01 s.

## Contrat HyperFrames

`index.html` généré par `node build.mjs` (structure/style) + `motion.js` (animations, inliné) + `assets/plan.json`
(timing, SFX par événement). Composition `luma-agent-whatsapp`, timeline GSAP unique, finie, en pause, synchrone.

## Éléments réels et marque

- Captures WhatsApp fournies par Robin : recadrées sous l'en-tête et le message système (`assets/shots/wa1.png`,
  `wa2.png`) → **aucun nom de contact à l'écran**. Contenu visible : questions clients et réponses de l'agent
  (tarifs Nuit Prestige, repas à bord, coucher de soleil, lien harmonie-yacht.fr). Les deux conversations sont
  empilées dans le même téléphone ; un lecteur peut les percevoir comme une seule discussion (point à valider).
- Cartes « Tableau de bord » : sujets tirés des captures (demande de tarifs, repas à bord, coucher de soleil), sans nom.
- « ≈ 2 000 € / an · économisés » : chiffre prononcé par Robin (« à peu près 2000 euros par an »).
- Logo : uniquement l'écran de fin (600 × 400, 1.3 s). Aucune carte logo pendant le film.

## Contrôles visuels (rendu encodé)

- Planches 16 images (0, 4.3, 6.7, 9.3, 12.3, 16.7, 20, 25.3, 30, 33.3, 37, 39, 41, 42, 43.3, 44.7 s) + pleine taille à 10, 31, 40 s.
- Draft 1 → v001 : badge « Qualifié » masqué sous le bouton « Relance » (superposition).
- Police Inter, accents présents (« ÉCONOMISÉS », « QUALIFIÉ », « Météo », « créé »), aucun texte coupé.
- Visage jamais couvert ; mains (poitrine) hors des zones graphiques ; sous-titres à y 924.
- Vignette + écran de fin : mouvement continu, aucune image noire.

## Son

- SFX synthétisés déclarés par événement (29 cues : pop, tick, whoosh, swell), volumes 0.10–0.15, pistes 6/7.
- Mesures de signal uniquement ; **aucune écoute perceptive** dans cette session. Pas de musique (consigne).

## Limites et points ouverts

- Ouverture en cours de phrase « Qui a fait qu'aujourd'hui… » conservée (consigne « garder toute la vidéo ») ; alternative à « aujourd'hui » (2.08 s source).
- Empilement des deux conversations dans un seul téléphone : à valider ou à séparer (deux téléphones ou fondu).
- Draft conservé en `renders/draft-1.mp4` (non commité).
