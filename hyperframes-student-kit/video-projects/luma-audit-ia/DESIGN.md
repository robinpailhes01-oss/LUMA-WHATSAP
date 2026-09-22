# luma-audit-ia — DESIGN

Film LUMA 16:9 (1920×1080, 30 i/s, 17.0 s) à partir de `assets/source.mov` (IMG_0241.mov, face
caméra sur un bateau, parole en français). Direction : `../luma-film/LUMA_References_Video.md`
(v1.0) et `../luma-film/CLAUDE.md`. Ce fichier n'invente pas de règle ; il applique celles-là à ce film.

## Parole retenue

Source 2.0667 → 17.2667 s, une seule plage, aucune coupe interne (EDL : `assets/edit-decisions.json`).
Retiré : la reprise « Et ensuite moi vraiment ». Voix réelle, vitesse et timbre conservés ; gain statique
seulement. Le film se prolonge de 15.2 à 17.0 s sur la dernière image pour la signature.

> Le but de l'audit c'est de pouvoir vous montrer vraiment tout ce que l'IA est capable de faire dans
> votre entreprise, et même se projeter à l'avenir : si jamais votre entreprise grandit, comment est-ce
> que l'IA va pouvoir grandir également avec vous.

## Identité (LUMA_References_Video.md §5–6)

| Usage | Valeur |
|---|---|
| Fond sombre, encre | `#10182B` |
| Surface claire | `#F7F8FC` |
| Accent bleu | `#4263F5` (mot actif, liens, contours) |
| Accent violet | `#8A5CF6` (lueur de fond, second accent) |
| Secondaire | `#68738A` → assombri en `#4E5A70` sur surface claire pour le contraste |
| Typographie | Inter locale (`assets/fonts/`), 400–800 |

Inter est le choix explicite du document LUMA ; il prime sur la liste de polices déconseillées du skill
`hyperframes`. Pas de logotype ni de mascotte : « LUMA » est composé en texte. Signature verbatim :
« LUMA — Votre partenaire IA de croissance. »

Matière des cartes (§4, 10–13 s de STYLE-01) : verre translucide en plusieurs plans — surface
(dégradé 4 arrêts + flou d'arrière-plan), objet (mini-interface), accent (bleu), ombre portée douce,
reflet 1 px en haut. Le relief vient des ombres et reflets, pas d'une perspective forte.

## Composition et caméra

Le plan est paysage natif ; la « caméra » est le cadrage de la séquence, animé en douceur (0.7 s,
power2.inOut). Visage et bouche toujours dégagés.

| Mode | Cadrage (échelle, translation) | Où est le visage | Zone libre |
|---|---|---|---|
| FULL | 1.04, (-38, -22) | centre | — |
| LEFT | 1.26, (0, -60) | x ≈ 1260 | colonne gauche x 90–800 |
| RIGHT | 1.32, (-560, -90) | x ≈ 760 | zone droite x 1150–1870 |
| VIGNETTE | cadre entier réduit à 36 %, coins 48 px, posé à (150, 345) sur fond de marque | dans la vignette | droite : documents + signature |

## Séquences

| Temps | Séquence (§4 de la référence) | Ce qui bouge |
|---|---|---|
| 0–2.4 | Présentateur dominant ; kicker « AUDIT IA » (0.15) et « LUMA » (0.35) en verre | entrées seulement |
| 2.3–6.3 | Trois panneaux translucides à gauche, mini-interfaces animées à l'intérieur : Réponses clients 24/7 (bulles), Relances automatiques (lignes + coches), Prise de rendez-vous (créneau confirmé) — sur « tout », « capable », « faire » ; étiquette « Votre entreprise » sur « entreprise » | caméra LEFT, panneaux, contenu décalé |
| 6.3–10.7 | Objet autonome à droite, visage dégagé : carte « Votre entreprise » avec mini-graphique (7.0) ; contour pointillé de projection sur « projeter » (7.44) ; étiquette « Demain » sur « l'avenir » (8.72) ; la carte grandit et remplit le contour sur « grandit » (10.2) | caméra RIGHT, tracé, croissance |
| 10.7–13.9 | Les trois compétences IA viennent s'amarrer à la carte agrandie sur « grandir / également / avec » ; liens bleus tracés sur « vous » | amarrage, tracé de liens |
| 13.95–17.0 | Vignette arrondie en mouvement vers la gauche sur fond bleu abstrait ; documents en perspective à droite (14.6) ; signature (15.3) ; tenue | vignette, documents, texte |

Les mini-interfaces sont des illustrations éditoriales de ce que l'IA « est capable de faire », pas des
captures ni des preuves de fonctionnalités (§7). Aucun chiffre de performance.

## Sous-titres (§6)

Inter 600, 43 px, blanc, ombre douce ; groupes de 2 à 5 mots ; **mot actif sur fond bleu** `#4263F5`
(pilule, coins 10 px) ; le groupe apparaît en fondu, aucun déplacement vertical à chaque mot ;
zone basse centrée (y ≈ 940), jamais sur le visage.

## Mouvement (§7)

- Entrées de cartes 0.45–0.65 s : translation courte (30–60 px), rotation 1–2°, `power3.out`.
- Contenu interne décalé de 0.10–0.18 s : bulle, ligne, coche, créneau.
- Une action principale à la fois : caméra, puis panneau, puis contenu ; jamais deux caméras en même temps.
- Zooms du visage de quelques pourcents ; pas de bord vide (vérifié par le calcul des cadrages ci-dessus).
- Tout est piloté par une seule timeline GSAP en pause, enregistrée dans `window.__timelines["luma-audit-ia"]`.

## Son (§8)

Voix réelle uniquement. Gain statique +7.4 dB pour atteindre -16 LUFS, fondu de sortie 14.5–15.2 s.
Pas de musique ni de SFX : à traiter dans une itération dédiée, comme l'indique l'état des décisions.

## What NOT to do

- Pas de doré (couleur du premier reel), pas de serif, pas de logo inventé, pas de mascotte.
- Pas de rebond exagéré, pas de transition gadget, pas de carton figé.
- Pas de texte non prononcé sauf les étiquettes d'objets et la signature LUMA.
- Pas de recadrage vertical : une version 9:16 se recompose, elle ne se découpe pas.
