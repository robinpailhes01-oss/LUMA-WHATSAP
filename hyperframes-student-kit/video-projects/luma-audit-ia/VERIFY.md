# VERIFY — luma-audit-ia v001

**Rendu livré : `renders/v001_luma-audit-ia.mp4`**
SHA-256 : `1409fc5320ecf8f680ab433a69f2a0a1ae9ed60ca05132e07f5fe122811ac565`
Statut : proposition livrée, **non validée** par Robin (LUMA_References_Video.md §10).

## Fichier

| Mesure | Valeur | Attendu (CLAUDE.md LUMA §2, §7) |
|---|---|---|
| Conteneur | MP4 H.264 yuv420p BT.709 + AAC 48 kHz stéréo, faststart | ✓ |
| Dimensions / cadence | 1920 × 1080, 30 i/s, 510 images, 17.000 s | ✓ paysage |
| Loudness | -16.1 LUFS intégrée, pic -1.4 dBFS | ✓ |
| Taille | 38.8 Mo (qualité « high ») | — |

## Sources et coupe (CLAUDE.md LUMA §3, §6)

- Rush original conservé : `assets/source.mov` (IMG_0241.mov, sha256 `4a33cac4…`, identique au fichier du reel harmonie-reel).
- Séquence : `assets/footage.mp4`, tone-mappée HLG → SDR BT.709 (zscale + hable), source 2.0667 → 17.2667 s.
  Nécessaire : en HLG, HyperFrames passe en pipeline « HDR layered » et perd les calques superposés.
- Coupe : une seule plage gardée ; retiré « Et ensuite moi vraiment » (reprise en cours de phrase). Liste dans `assets/edit-decisions.json`.
- Voix : réelle, vitesse et timbre inchangés. Gain statique +7.4 dB (-23.4 → -16.0 LUFS) et fondu 14.5–15.2 s.
  Aucun TTS, clonage, compression ou nettoyage. **Non identique octet à octet** à la source (coupe + gain) ; témoin non traité : `assets/voice-source-cut.wav` (sha256 `d1482368…`).
- Mots horodatés : faster-whisper `small` local sur ce même fichier (transcript identique à harmonie-reel), `assets/transcript.json`.
- Plan et sous-titres : `assets/plan.json` ; validateurs du kit `validate-plan.mjs` ✓ (42 mots, 5 scènes, 19 événements), `validate-footage.mjs` ✓ ; `npx hyperframes lint` 0 erreur 0 avertissement ; preflight : 1 avertissement connu (data-start sur racine + vidéo, compromis exigé par lint, rendu correct).
- **ASR fraîche sur l'audio final** (`qa/final-asr.json`) : texte identique mot pour mot. Attaques : but -0.01, montrer 0.00, tout +0.04, capable 0.00, projeter 0.00, grandit 0.00, grandir 0.00 s.

## Contrat HyperFrames (CLAUDE.md LUMA §4–5)

- `index.html` généré par `node build.mjs` ; structure/style dans `build.mjs`, animations dans `motion.js` (inliné au build pour que lint et preflight le voient), timing dans `assets/plan.json`.
- Composition `luma-audit-ia` (nouveau film → nouvel identifiant, la composition `luma-reference` appartient au film v001 de luma-film) ; une timeline GSAP finie, en pause, enregistrée de façon synchrone dans `window.__timelines["luma-audit-ia"]`. Médias pilotés par HyperFrames ; aucune lecture autonome ni aléa.

## Contrôles visuels (rendu encodé)

- Planches 12 images (0, 2.5, 4.5, 6.2, 8.3, 9.7, 10.8, 12.7, 13.7, 14.2, 15.2, 16.7 s) + 2 images pleine taille (5.3 s, 13.7 s).
- Police Inter chargée (accents « Réponses », « Confirmé », « ACTIVITÉ » présents), textes non coupés.
- Lisibilité : après le draft 1 (verre clair, titres blancs illisibles sur le ciel), verre teinté bleu nuit dans v001 ; titres de cartes 24–28 px lisibles à 640 px de large (≈ taille téléphone en paysage).
- Visage : jamais couvert ; menton ≈ y 800 (mode LEFT) / 834 (RIGHT) ; sous-titres à y 924. Aucun bord vide aux cadrages (LEFT 1.26 / RIGHT 1.32 calculés pour couvrir 1920 × 1080).
- Transitions : bandes contiguës 6.2–7.1 s (panoramique caméra + sortie des panneaux + entrée carte) et 13.9–14.9 s (vignette) : mouvement continu, aucune image noire, aucun saut.
- Sous-titres : groupe statique, mot actif sur fond bleu `#4263F5`, aucun déplacement vertical par mot.
- Fin : vignette arrondie (coins 48 px) posée à gauche sur fond bleu nuit / bleu / violet, trois documents en perspective, signature « LUMA — Votre partenaire IA de croissance. » ; de 15.2 à 17.0 s la vignette affiche la dernière image (`assets/last-frame.jpg`) avec une dérive lente.

## Son

- Mesures de signal uniquement (loudness, pic, ASR). **Aucune écoute perceptive** dans cette session ; les raccords n'existent pas (une seule plage), le fondu de sortie reste à valider à l'oreille.
- Pas de musique ni de SFX (état des décisions LUMA : itération dédiée).

## Limites et points ouverts

- Image 0 = clignement d'yeux du locuteur (yeux fermés 0–0.2 s) ; couper ailleurs perdrait « Le » ou inclurait « vraiment ». Choisir la vignette de couverture sur la plateforme.
- Les mini-interfaces (bulles, relances, agenda, graphique) sont des illustrations éditoriales, pas des captures LUMA réelles (CLAUDE.md LUMA §… « captures réelles » du brief : aucune capture n'a été fournie pour ce film). À remplacer par des captures authentiques si Robin les fournit.
- Pas de version verticale ; à recomposer, pas à recadrer.
- Draft 1 conservé pour comparaison (`renders/draft-1.mp4`, non commité).
