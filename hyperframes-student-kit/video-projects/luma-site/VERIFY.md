# luma-site — VERIFY (v001)

## Structure
- `validate-plan.mjs` : 0 erreur (439 mots retenus, 9 scènes alignées image, 79 événements, 127 groupes ≤ 26 caractères, écart max sans événement 4.9 s).
- `validate-footage.mjs` : ok. `npx hyperframes lint` : 0 erreur, 2 avertissements connus (img dupliquée poster/sélection, fichier long).
- Séquence `assets/_footage-crf16-master.mp4` : 1920 × 1080, 30 i/s, 3 797 images (126.567 s ; la séquence planifiée fait 126.5333 s, une image de
  bourrage à la fin du concat), BT.709 tagué, HLG décodé directement. Copie dépôt CRF 21 : 95 Mo.
- Voix `assets/voice.m4a` : source −28.9 LUFS / −8.9 dBTP → +7.4 dB statique → **−21.5 LUFS, pic −1.5 dBTP** (pas de compression ;
  un gain supérieur dépasserait le plafond de −1.5 dBTP). Fondu de fin 0.6 s.

## Brouillon (`renders/draft-1.mp4`, 24 min)
- Planche 1 image / 2 s (`qa/draft1-sheet.jpg`) + 19 images pleines : défauts corrigés avant le final —
  titre « Demandes clients » (112 px) et « Pas un manque de clients » débordaient du bord droit → 92 px / deux lignes ;
  cheveux légèrement coupés en haut sur FACE_LEFT / FACE_RIGHT (échelle 1.2, y −20) → échelle 1.15, y 0 ;
  annotations Caveat bleues illisibles sur le ciel → blanc + ombre sombre ; carte « Audit gratuit » (bleu nuit 55 % + texte dégradé) trop sombre → verre clair + titre blanc / bleu clair.
- Contrôle des corrections sur captures Playwright (`qa/fix-check-1..3.jpg`, `qa/snap.mjs`) : titres dans le cadre, tête entière, rien sur la tête dans les 4 cadrages.
- ASR fraîche (faster-whisper small) sur le mixage : 68 ancres d'événements, écart médian 0.01 s ; 6 « non trouvées » sont des variantes
  d'orthographe (« concurrent », « connectés », « relations », « 'expérience ») à ≤ 0.1 s ; les 3 écarts > 0.15 s sont les décalages volontaires (+0.15 / +0.25 / +0.3 s).

## Final (`renders/v001_site.mp4`, `--quality high`)
