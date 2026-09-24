# luma-outils-ia — Carnet d'itérations

Réel LUMA « les 3 outils IA que j'ai mis dans mon entreprise » (5 rushes verticaux), 9:16. Règles :
`../luma-film/LUMA_Bibliotheque_Marque.md`, `../luma-film/CLAUDE.md`. Convention : `renders/v00N_<objectif>.mp4`.

## Avant v001 — analyse et consignes (23/09/2026)

- Analyse des 5 rushes : `../../raw-media/OUTILS-IA.ANALYSE.md` (plan et captures demandées avant montage).
- Consignes de Robin : dynamique ; captures fournies : réservations, réponse ChatGPT, conversation WhatsApp
  (disponibilité) ; « Ok go » sans autre précision → vertical (rushes natifs), coupe par défaut (amorces/fins), hésitations gardées.
- Non fourni : capture de l'audit GEO et de la liste d'actions → illustrations LUMA (cartes), signalées dans `DESIGN.md`.

## v001 — outils IA (23/09/2026)

- Rendu : `renders/v001_outils-ia.mp4` — 97.2 s, 1080 × 1920, 30 i/s, sha256 `ba4c46aa…` (ré-encodage CRF 20 du master 207 Mo).
- Statut : livré, **remplacé par v002** après retours.

| # | Point | Statut |
|---|---|---|
| 1 | Format vertical 9:16 (rushes natifs) | accepté implicitement (retours portent sur le contenu) |
| 2 | Durée 97 s, aucun mot retiré | à valider ; hésitations coupables listées dans l'analyse (≈ 3 s) |
| 3 | Captures réelles : tableau de bord ×4 (floutées), ChatGPT, WhatsApp disponibilité (anonymisée) | conforme |
| 4 | Audit GEO et actions : cartes illustratives (pas de capture) | à remplacer si Robin fournit les captures |
| 5 | Tuiles Gemini / Perplexity en plus de ChatGPT sur « mise en avant sur les IA » | interprétation — à valider |
| 6 | CRM représenté par l'icône HubSpot (bibliothèque) | à confirmer selon l'outil réel |
| 7 | Écran de fin : « Commente « outil » pour ton audit gratuit » + bouton Découvrir Luma | à valider |

## v002 — retours (23/09/2026)

- Rendu : `renders/v002_retours.mp4` — 97.2 s, 1080 × 1920, 30 i/s, sha256 `d37973fb…`.
- Statut : **validé par Robin (24/09/2026)** : « j'aime énormément ce style ». Style de référence → skill `luma-montage`.

| # | Demande de Robin | Mise en œuvre | Statut |
|---|---|---|---|
| 1 | Supprimer le logo en haut | Logo retiré du film (reste à l'écran de fin) | validé |
| 2 | Changer la police des sous-titres (capture « directement dans Claude. ») | Inter 800 italique blanc, ombre portée, mot actif et mots clés en bleu clair `#8FBBFF`, plus de pilule | validé |
| 3 | Ne jamais couper la tête par un graphique | Visage mesuré sur la séquence ; cadrages recalculés ; « 3 h / jour » et carte commentaire déplacés ; contrôle sur 98 images | validé |
| 4 | GEO : plus épuré et classe, trop de carrés sur fond de couleur | Titres et « ≈ 20 % » en texte sur la vidéo, cartes Audit / Actions en verre clair, voile dégradé discret en haut | validé |
| 5 | « là encore tu as coupé la tête » (CTA) | Carte commentaire descendue sur le buste, « juste en dessous » à gauche du visage | validé |

Règles durables consignées dans `../luma-film/LUMA_Bibliotheque_Marque.md` §9.

## v003 — musique de fond (24/09/2026)

- Demande de Robin (avec `v002_retours_web.mp4` joint) : « Peux-tu ajouter une légère musique de fond ? Pour essayer de rendre ça un peu dynamique ».
- Rendu : `renders/v003_musique.mp4` — image et montage identiques à v002 ; seule la piste 12 `assets/music.m4a` est ajoutée.
- Musique générée localement (`.claude/skills/luma-montage/scripts/make-music.py`, aucune licence tierce ni service payant) :
  nappe synthé La mineur (Am–F–C–G), arpège pluck, basse, grosse caisse douce + charley en croches à 104 BPM (pulsation à partir
  de la mesure 5), −3.5 dB automatiques pendant la parole (enveloppe de la voix ; la voix n'est pas traitée), percussions retirées
  et nappe montée sur l'écran de fin. Niveau ≈ 9–10 dB sous la voix (`data-volume` 0.45). Mixage final mesuré dans `VERIFY.md`.
- Statut : livré, **en attente de l'écoute de Robin** (niveau, style, tempo ajustables : `--bpm`, `--duck-db`, `data-volume`).

| # | Demande (temps) | Résultat souhaité | Mise en œuvre | Statut |
|---|---|---|---|---|
| 1 | Conversation WhatsApp en page plein écran (Robin, 24/09 : « on le fera pour la prochaine fois ») | visage disparaît, capture plein cadre, retour au visage (STYLE-04) | appliqué sur le film site (`../luma-site/`), pas sur ce réel | notée |
| 2 | Musique de fond légère, plus dynamique | musique discrète sous la voix | v003 : `assets/music.m4a`, piste 12, volume 0.45 | livré, à écouter |

### Fiche de retour

```
Version regardée : v003
Ce que je veux garder :
À changer à [00:00–00:00] :
Résultat souhaité :
Priorité : indispensable / amélioration / test
Après livraison : validé / à reprendre / à comparer
```
