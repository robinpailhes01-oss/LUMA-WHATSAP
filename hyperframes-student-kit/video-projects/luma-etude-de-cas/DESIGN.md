# luma-etude-de-cas — DESIGN

Étude de cas LUMA **paysage 1920×1080, 30 i/s, 41.2 s** à partir de `raw-media/IMG_0232.MOV` (« J'ai fait mon propre
tableau de bord… 5 minutes par jour… qu'est-ce qu'on pourrait améliorer »). Consigne de Robin : étude de cas, dynamique
et compréhensible, paysage ; chiffres financiers floutés ; deux captures sont la partie marketing. Direction :
`../luma-film/LUMA_Bibliotheque_Marque.md`. Analyse : `raw-media/IMG_0232.ANALYSE.md`.

## Parole retenue (EDL `assets/edit-decisions.json`)

Un seul segment source 6.88–45.31 s → 38.43 s. Retiré : la remarque de tournage d'ouverture (0–6.9 s, « je vais mettre
des captures d'écran en dessous… ») et la phrase finale incomplète (« et puis voilà, et donc surtout l'agent WhatsApp…
connecté à tous mes outils », coupée par la fin du rush). Aucun mot retiré à l'intérieur ; hésitations conservées.

## Visuels réels

Quatre captures du tableau de bord fournies par Robin (`assets/shots/`), recadrées sous la barre d'état et l'en-tête,
**montants en € floutés** (gaussien r=22, PIL) : `vue.png` (Vue d'ensemble : alertes 23 clients, 2 sorties, 4 leads,
CA 2026 flouté), `rapports.png` (finance : CA semaine/mois, réservations 11, panier moyen, courbe CA 12 semaines),
`canaux.png` (marketing : « D'où viennent nos clients ? », 9 canaux avec nombre de réservations), `pub.png` (marketing :
budget pub, CA pub, coût par réservation, marge nette pub — floutés). Les nombres non financiers (réservations,
canaux, %) restent lisibles. `pub.png` n'est pas montré en v001 (trois écrans suffisent au rythme) ; disponible pour v002.

## Séquences

| Temps | Parole | Ce qui se passe | SFX |
|---|---|---|---|
| 0.3 / 0.5 | « j'ai fait » | Logo ; lower-third « Robin · Fondateur de Luma · Harmonie Yacht » | tick / pop |
| 0.94 | « tableau de bord » | Accroche « ÉTUDE DE CAS / MON PROPRE / TABLEAU DE BORD » (Barlow, dégradé) + soulignement | whoosh |
| 2.3 / 2.6 | « où je vais voir » | Caméra RIGHT ; téléphone avec la vraie Vue d'ensemble entre par la droite ; push-in léger sur « tout » | whoosh ×2, tick |
| 5.62 | « finance » | Écran Rapports (slide) ; pilule « Finance » | whoosh / pop |
| 8.16 / 8.9 | « chiffre d'affaires » / « marge » | Sélection à poignées sur les cartes CA, puis sur la courbe CA (défilement) ; sélection sur les mots | tick ×2 |
| 10.08 | « très important » | « Très important ! » (Caveat) + flèche tracée vers le téléphone | pop |
| 14.16 | « marketing » | Écran « D'où viennent nos clients ? » ; pilule « Marketing » | whoosh / pop |
| 16.54 | « connu » | Sélection sur le titre du tableau des canaux | tick |
| 17.96 → 18.38 | « canal d'acquisition » | Puces « Bouche à oreille · 19 », « Instagram Ads · 6 », « Google · 4 », « TikTok · 4 » | pop, tick ×3 |
| 20.98 | « travailler » | Puce Instagram Ads passe en violet + « À travailler ! » | pop |
| 23.4 → 23.8 | « vue d'ensemble » | Téléphone sort ; trois mini-écrans (Vue, Rapports, Canaux) apparaissent côte à côte | whoosh, pop, tick ×2 |
| 25.04 | « entreprise » | Pilule « Toute l'entreprise, en un coup d'œil. » | pop |
| 27.18 / 29.28 | « fonctionne » / « fait bien un petit peu » | Coches vertes sur Vue et Rapports + « Ça fonctionne » ; badge « ! » violet sur Canaux + « À améliorer » | pop ×2 |
| 30.9 | « et ce qui fait » | Les mini-écrans se resserrent légèrement | tick |
| 32.6 → 33.9 | « 5 minutes par jour sur mon tableau de bord » | Caméra LEFT ; carte « CHAQUE JOUR / 5 MIN / JOUR / pour piloter toute l'entreprise » | whoosh, pop, tick ×2 |
| 35.3 / 36.08 / 37.7 | « qu'est-ce qu'il se passe / comment ça se passe / améliorer » | Trois lignes cochées dans la carte | tick ×2, pop |
| 38.43 → 41.2 | (fin) | Outro : logo + halo, « Du concret. Pas du blabla. », bouton « Découvrir Luma → » | whoosh, swell, tick, pop |

## Caméra

LEFT 1.22 (0, -24) visage à droite, colonne gauche libre (accroche, carte 5 min) ; RIGHT 1.32 (-560, -70) visage à
gauche, zone droite libre (téléphone, puces, mini-écrans). Sous-titres Inter Medium 43 px à y 924, mot actif bleu,
sélection à poignées sur finance, chiffre, marge, marketing, connu, canal, vue, fonctionne, 5, améliorer.

## Son

Voix réelle, gain statique +5.5 dB (-24.1 → -19.0 LUFS, pic -1.6 dBTP), fondu final. Pas de musique. SFX synthétisés,
pistes attribuées automatiquement sans chevauchement (6/9/10 pour pop/tick, 7/11 whoosh, 8 swell).

## What NOT to do

Ne jamais réintroduire les montants floutés ; pas de chiffre inventé (les puces reprennent les nombres visibles des
captures) ; pas de couleur hors charte ; pas de musique sans instruction.
