# VERIFY — harmonie-reel

**Livrable final : `video-projects/harmonie-reel/final.mp4`** (copie de `renders/final-v1.mp4`)
SHA-256 : `b55f28cfe6d66ac1a8a6de0f36ae0744d37d54b5e8034d8aa9979eaeb92d8411`

Skill : `.claude/skills/short-form-edit/SKILL.md` (+ hyperframes, gsap, cut-silences,
video-storytelling). Rendu local : `npx hyperframes render --quality high`.

## Fichier

| Mesure | Valeur | Attendu |
|---|---|---|
| Conteneur | MP4 H.264 yuv420p + AAC 48 kHz stéréo, moov avant mdat (faststart) | ✓ |
| Dimensions / fps | 1080x1920, 30 fps, 456 images, 15.200 s | ✓ 9:16 |
| Loudness intégrée | -16.3 LUFS (LRA 2.3 LU) | ≈ -16 LUFS |
| Pic | -1.6 dBFS | ≤ -1 dBTP |
| Taille | 26.1 Mo | — |

## Transcription et coupe

- Transcription source : faster-whisper `small` local (CPU), mots horodatés, langue détectée fr (99 %).
  Aucune clé ElevenLabs disponible dans la session → Whisper local, comme prévu par `docs/TOOLS-AND-API-KEYS.md`.
- EDL (`assets/edit-decisions.json`) : une plage gardée, source 2.0667 → 17.2667 s. Retiré : reprise
  « Et ensuite moi vraiment » (0–2.07 s) et les 2 dernières images. Aucune coupe interne.
- Silences (ffmpeg silencedetect -35 dB / 0.5 s) : seulement l'amorce (0.44–1.09 s) et la fin (16.02 s →).
  Revue manuelle du transcript : pas de reprise, pas de faux départ.
- Validateurs du kit : `validate-plan.mjs` ✓ (42 mots, 5 scènes, 15 événements, écart max 2.10 s),
  `validate-footage.mjs` ✓ (aucun B-roll), `scripts/preflight.mjs` ✓, `npx hyperframes lint` 0 erreur 0 avertissement.
- **ASR fraîche sur l'audio final** (`assets/final-asr.json`) : texte identique au plan, mot pour mot.
  Décalage d'attaque des mots d'ancrage : but +0.01, montrer 0.00, tout +0.04, capable 0.00,
  entreprise 0.00, projeter -0.02, grandit 0.00, grandir -0.02, vous -0.02 s (tolérance 2 images = 0.067 s).
- Dernière syllabe : « vous » se termine à 13.93 s ; 1.27 s de silence gardé ensuite.

## Ouverture (gate « raison de rester »)

- Image 0 : visage plein cadre sur la mer. Kicker « AUDIT IA » à 0.15 s, sous-titre « Le but de l'audit »
  dès 0.0 s, carte « VOTRE ENTREPRISE » + 3 cases « ? » à 0.55 s, zoom arrière + montée du panneau à 2.3 s,
  1re case remplie à 3.34 s. Muet : sujet + état incomplet lisibles avant 1 s.
- Premier mot : aucun impact sonore sur l'ouverture (choix), « Le » intact à l'ASR.
- **Limite** : l'image 0 tombe sur un clignement d'yeux du locuteur (yeux fermés de 1.93 à 2.27 s source).
  Couper plus tôt inclurait la fin de « vraiment » ; couper plus tard perdrait « Le ». Gardé ; choisir
  la vignette de couverture sur la plateforme (par ex. l'image à 0.5 s).

## Inspection visuelle (planches et bandes contiguës, `renders/final-v1.mp4` et `draft-2.mp4`)

- 10 images clés du final (0, 0.67, 2.0, 3.5, 5.5, 8.93, 10.6, 12.8, 13.87, 14.83 s) : kicker, sous-titres,
  carte, puces, contour DEMAIN, croissance, 2e rangée, chute serif — tous présents et lisibles à
  taille téléphone (216 px de large).
- Bandes contiguës (1 image sur 3) : 0–0.27 s, 2.2–3.0 s (changement de mise en page), 10.1–10.9 s
  (croissance) : aucun flash noir, aucun saut d'une image, aucun élément qui se fige.
- Visage jamais couvert : menton ≈ y 915 (héros) / 735 (scène) ; sous-titres à partir de y 935.
- Zone sûre : rien sous y 1600 (2e rangée de puces se termine à 1590) ; texte entre x 90 et 990.
- Contraste : textes ivoire sur pilules marine 84 % (kicker, sous-titres, chute) ; étiquettes navy sur or.

## Audio

- Voix normalisée (`assets/voice.wav`, loudnorm I=-16 TP=-1.5), volume 0.9 dans la composition.
- Pas de musique : aucune piste à droits vérifiés dans la session (les `music.mp3` des projets du kit
  n'ont pas de provenance documentée). L'ambiance mer du micro iPhone reste sous la voix.
- SFX synthétisés (`assets/sfx/*.m4a`, ffmpeg) : whoosh 2.30 s, pop 3.34 / 4.50 / 5.08 / 13.08 / 13.34 / 13.68 s,
  tick 7.44 / 13.95 s, swell 10.15 s ; volumes 0.16–0.24. Draft 2 culminait à -0.7 dBFS → gains réduits de 20 % et
  voix à 0.9 → final -1.6 dBFS.
- Modalité : mesures de signal et alignement sur la timeline. **Aucune écoute perceptive** possible dans cette
  session ; l'équilibre voix/SFX et le naturel des attaques restent à valider à l'oreille.

## Révisions

| Version | Problème | Correction |
|---|---|---|
| draft-1 | Source iPhone HLG/BT.2020 → HyperFrames passe en pipeline « HDR layered » : tout ce qui se superpose à la vidéo disparaît ; rendu HEVC en 6 min | Séquence tone-mappée en SDR BT.709 (zscale + hable), tags bt709 ; rendu H.264 en 2 min |
| draft-2 | Pic audio -0.7 dBFS ; sous-titres à 15 px du panneau | Voix 0.9, SFX -20 % ; sous-titres remontés à y 935 |
| final-v1 | — | Livré |

## Ce qui n'a pas été fait / limites

- Pas de version 16:9 (non demandée).
- Pas de B-roll ni d'asset généré (aucun fournisseur configuré ; le brief n'en demandait pas).
- Pas de logo ni de CTA : aucun asset de marque fourni, aucun appel à l'action prononcé.
- Les trois ouvertures ont été comparées sur maquette et timeline, pas rendues séparément.
- Connecteur HyperFrames (HeyGen) : accessible (0 projet), mais `import-claude-design-from-url` n'accepte
  qu'une URL `claudeusercontent.com` issue de Claude Design, et `compose` ne peut pas recevoir la séquence
  locale. Le reel a donc été rendu localement avec les skills du kit ; voir le récapitulatif de session.
