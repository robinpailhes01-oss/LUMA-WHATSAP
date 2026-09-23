# Analyse — réel « les outils IA que j'ai mis dans mon entreprise » (23/09/2026, aucun montage effectué)

Cinq rushes reçus par Drive (ordre narratif reconstitué d'après la parole) :

| # | Fichier | Drive id | Durée | Parole | Rôle |
|---|---|---|---|---|---|
| 1 | IMG_0380.MOV | 1TlViUepf… | 7.67 s | 0.68–6.7 s | Accroche : « Voici les trois outils que j'ai implémentés dans mon entreprise de location de bateau et qui m'ont permis d'économiser trois heures par jour. » |
| 2 | IMG_0382.MOV | 1nT17Pj8… | 23.74 s | 0.46–22.4 s | Outil 1 : le tableau de bord (finance/marge, marketing/d'où viennent les clients, réservations à venir, reste à encaisser) |
| 3 | IMG_0386.MOV | 1nYQgv6x… | 22.37 s | 0.0–21.2 s | Outil 2 : le GEO (audit « comment je suis cité par les IA », actions toutes les deux semaines, « 20 % de ma clientèle environ vient de ChatGPT ») |
| 4 | IMG_0388.MOV | 16HB_Nwb… | 28.57 s | 0.0–27.3 s | Outil 3 : l'agent WhatsApp (autonome, parle comme moi, règles de l'entreprise, connecté calendrier/CRM/disponibilités, météo) |
| 5 | IMG_0391.MOV | 1zgcwXmq… | 17.50 s | 0.48–16.4 s | Appel à l'action : « commente “outil” juste en dessous, on offre un audit complètement gratuit » |

## Technique
- **Format : vertical natif 1080×1920** (aucune rotation, contrairement aux rushes précédents qui étaient des paysages tournés). Même lieu (bateau, mer, ciel clair), visage centré, tête au tiers supérieur, mains parfois visibles (IMG_0386 à 12–16 s, IMG_0388 à 20 s). HEVC HLG → décodage direct.
- Audio : -28 à -29.6 LUFS, pics -11 à -14 dBTP → gain statique +10 dB sans écrêtage.
- Blancs : amorces 0.5–0.7 s et fins 1.0–1.2 s sur chaque rush ; une pause de 0.53 s dans IMG_0382 à 10.64 s. Peu de silence à couper : le rythme viendra des raccords entre rushes, des changements de cadrage et des visuels.
- Total parole ≈ 92 s ; après amorces/fins et pauses ≈ 88 s. Réel long : à assumer (Instagram accepte 90 s) ou à resserrer en coupant des hésitations.

## Transcription (faster-whisper small, fichiers `IMG_03xx.transcript.json`)
- 0380 : « Voici les trois outils qu'il y a que j'ai implémenté dans mon entreprise de location de bateau et qui m'ont permis d'économiser trois heures par jour. » (« qu'il y a que » = hésitation, 1.7–2.1 s)
- 0382 : « Alors du coup, la première c'est un tableau de bord où en fait je vais avoir vraiment une vue d'ensemble sur toute mon entreprise, que ce soit sur la partie finance, là je vais voir exactement ma marge, où j'en suis, etc. Sur le marketing je vais voir un petit peu d'où viennent mes clients, etc. Et ensuite je vais avoir un endroit où je vais voir absolument toutes mes réservations, celles qui sont à venir, ce qui reste à encaisser, etc. »
- 0386 : « Le deuxième, très simple, c'est ce qu'on appelle le GEO, donc j'ai un outil qui a fait un audit sur toute mon entreprise et comment est-ce que j'étais cité par les IA ou non, et donc toutes les deux semaines il y a des actions qui se mettent en place pour que mon entreprise soit mise en avant sur les IA, et 20 % de ma clientèle environ vient de ChatGPT. »
- 0388 : « Et le troisième, qui n'est pas des moindres, c'est l'agent WhatsApp, donc c'est un agent IA sur WhatsApp qui est complètement autonome, qui parle exactement comme moi, qui a ma façon de parler, qui connaît toutes les règles de mon entreprise et surtout il est connecté à mes outils, ce qui va faire qu'il est totalement autonome : donc il va être connecté aux calendriers, au CRM, il va voir s'il y a de la disponibilité etc., il est même connecté à la météo, voilà, pour faire des petites prévisions. »
- 0391 : « Donc si toi aussi tu as une PME et tu aimerais implémenter l'IA dans ton entreprise mais tu ne sais pas du tout comment et quoi faire, tu as juste à commenter “outil” juste en dessous et on offre un audit qui est complètement gratuit, c'est juste pour vous dire un petit peu ce qui est possible de faire et surtout ce que ça peut vous apporter. »
- Chiffres prononcés : **3 outils, 3 heures par jour, 20 % de la clientèle (ChatGPT), toutes les deux semaines, audit gratuit.**

## Éditorial
- Structure listicle parfaite pour un réel : accroche chiffrée → 1 → 2 → 3 → CTA. Compteur « 1/3, 2/3, 3/3 » et titres Barlow à chaque outil.
- Hésitations candidates (à valider) : « qu'il y a que » (0380), « Alors du coup » (0382 0.46–1.2), « en fait… vraiment » (0382), « etc » ×4, « voilà » (0388 fin), « un petit peu » (0391).
- Raccords entre rushes : même cadrage → jump cuts ; à couvrir par un changement de cadrage caméra + titre d'outil (une action principale à la fois).
