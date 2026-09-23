# VERIFY — luma-etude-de-cas v001

**Rendu livré : `renders/v001_etude-de-cas.mp4`** — SHA-256 `f9407eef14fed484…` — statut : proposition livrée, **non validée**.

| Mesure | Valeur | Attendu |
|---|---|---|
| Conteneur | MP4 H.264 yuv420p BT.709 + AAC 48 kHz, faststart | ✓ |
| Dimensions / cadence | 1920 × 1080, 30 i/s, 1236 images, 41.200 s | ✓ paysage |
| Loudness | -18.7 LUFS intégrée, pic -1.5 dBTP | ≤ -1 dBFS |
| Taille | 95.5 Mo (qualité `high`) ; copie `_web.mp4` 24.5 Mo | < 100 Mo |

## Sources, coupe, voix

- Rush `raw-media/IMG_0232.MOV` (52.11 s, HLG paysage, 60 Mo, commité). Analyse : `raw-media/IMG_0232.ANALYSE.md`.
- Séquence `assets/footage.mp4` : un segment 6.88–45.31 s, 1153 images / 38.433 s à 30 i/s, HLG décodé sans tone-mapping
  (planche `qa/footage-sheet.jpg` : couleurs neutres, pas de dominante).
- Voix : réelle, gain +5.5 dB, fondu 37.8–38.4 s ; témoin `assets/voice-source-cut.wav`.
- Mots horodatés : transcription du rush recalée de -6.88 s (Whisper sur la voix coupée sautait « où est-ce que ça
  fonctionne… »), 124 mots, `assets/transcript.json`.
- Validateurs : `validate-plan.mjs` ✓ (124 mots, 7 scènes, 43 événements, écart max 2.16 s), `validate-footage.mjs` ✓,
  `npx hyperframes lint` 0 erreur (1 avertissement : images identiques dans deux mini-écrans, attendu) ; preflight : avertissement connu.
- **ASR fraîche sur l'audio final** (`qa/final-asr.json`) : texte identique ; attaques tableau, finance, chiffre,
  marketing, connu, canal, travailler, vue, fonctionne, minutes : Δ 0.00 s ; marge -0.02, 5 -0.04, améliorer +0.02.

## Captures (`assets/shots/`)

Vérifié sur `qa/shots-check.jpg` et au recadrage du téléphone à 9.6 s : tous les montants en € sont illisibles
(CA semaine/mois, panier moyen, total 12 semaines, CA 2026, ce mois-ci, reste à encaisser, 31 266 € de CA attribué,
budget pub, CA pub, coût par réservation, ROAS, marge nette pub, tableau du haut de `pub.png`). Nombres de réservations
et de canaux lisibles (volontaire). Prénom « Léa » (agent) visible dans une alerte — à confirmer.

## Contrôles visuels (rendu encodé)

- Planche 84 images (`qa/v001-sheet.jpg`) : aucune image noire, enchaînements continus, fin propre.
- Images pleines à 1.5, 9.6, 19, 28.5, 34.5, 40.5 s : accroche sur 2 lignes, sélections à poignées visibles dans le
  téléphone, puces canaux lisibles, trois mini-écrans avec badges, carte « 5 MIN / JOUR », écran de fin.
- Draft 1 → v001 : chevauchements SFX sur une même piste (3 erreurs lint) → attribution automatique des pistes ; annotations
  « Ça fonctionne / À améliorer » descendues sous la pilule ; cadrage LEFT ramené à 1.22 (haut de tête visible).
- Visage jamais couvert ; mains (à 23–24 s) passent sous les mini-écrans sans les cacher.

## Son

Mesures de signal uniquement ; aucune écoute perceptive dans cette session. Pas de musique.

## Limites et points ouverts

- `pub.png` (budget pub, marge nette pub) non utilisé en v001.
- Hésitations conservées (« je pouvais pouvoir avoir », « vraiment j'ai vraiment », « etc », « enfin voilà »).
- Draft conservé en `renders/draft-1.mp4` (non commité).
