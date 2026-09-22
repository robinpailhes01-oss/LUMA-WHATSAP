# luma-audit-gratuit — DESIGN

Film LUMA 16:9 (1920×1080, 30 i/s, 29.0 s) à partir de `raw-media/IMG_0240.MOV` (« comment je
travaille avec mes clients », face caméra sur le bateau). Direction : `../luma-film/LUMA_References_Video.md`
v1.0 et `../luma-film/CLAUDE.md`. Analyse préalable : `raw-media/IMG_0240.ANALYSE.md`.
Décisions de Robin (22/09) : mascotte/logo fournis, effets sonores légers autorisés, « Go » sur les défauts
proposés (fin en suspens gardée + signature ; aucune hésitation coupée ; écran de fin = logo fourni tel quel).

## Parole retenue (EDL `assets/edit-decisions.json`)

Source 3.6667 → 30.2667 s. Retiré : « Et donc voilà pour cette petite présentation » (renvoie à une vidéo
absente). Aucune autre coupe ; hésitations conservées (règle « ne pas altérer les mots »).

> J'aimerais juste finir sur comment je travaille avec mes clients avec l'agence LUMA. Pour vous expliquer,
> tout d'abord je fais toujours un audit avec le chef d'entreprise qui est complètement gratuit, moi c'est
> juste pour comprendre un petit peu comment vous fonctionnez, tous vos outils, déjà aussi vos objectifs,
> votre situation actuelle etc. Et puis ensuite, premièrement on va vraiment voir déjà où est-ce qu'on va
> pouvoir gagner du temps.

## Identité

Palette et Inter identiques à `luma-audit-ia` (bleu nuit `#10182B`, surface `#F7F8FC`, bleu `#4263F5`,
violet `#8A5CF6`). **Nouveau : logo et mascotte officiels** (`assets/logo-full.png`, fourni par Robin,
fond blanc opaque). Le fond blanc n'est pas détourable proprement (le blanc de la mascotte et le texte
fin s'abîment) → le logo vit sur des **cartes blanches** (surface claire de la charte) :

- carte logo en haut à droite dès le mot « LUMA » ;
- carte « Audit » blanche avec la mascotte accoudée (recadrage `assets/mascot.png`) et texte bleu nuit ;
- écran de fin : grand panneau blanc avec le logo complet, mascotte et « AGENTS IA POUR LES ENTREPRISES ».

Les panneaux d'information restent en verre teinté bleu nuit (v001). Texte non prononcé limité aux étiquettes
d'objets (ÉTAPE 1, COMPLÈTEMENT GRATUIT repris de la parole, Vos outils / Vos objectifs / Situation actuelle
repris de la parole, Gagner du temps) et au logo.

## Caméra

| Mode | Cadrage | Visage | Zone libre |
|---|---|---|---|
| FULL | 1.04, (-38, -22) | centre | — |
| LEFT | 1.26, (0, -60) | x ≈ 1260 | colonne gauche 90–730 |
| RIGHT | 1.32, (-560, -90) | x ≈ 760 | droite 1180–1800 |
| VIGNETTE | cadre à 36 %, coins 48 px, (150, 345) | vignette | écran de fin à droite |

## Séquences

| Temps | Parole | Ce qui se passe | SFX |
|---|---|---|---|
| 0–5.2 | « J'aimerais juste finir sur comment je travaille avec mes clients avec l'agence » | Présentateur seul, sous-titres | — |
| 5.21 | « LUMA » | Carte logo blanche en haut à droite | pop |
| 6.27 | « Pour vous expliquer » | Caméra LEFT | whoosh |
| 7.37 | « tout d'abord » | Étiquette « ÉTAPE 1 » | tick |
| 9.31 | « audit » | Carte blanche « Audit » avec la mascotte accoudée | pop |
| 10.89 | « chef d'entreprise » | Ligne « avec le chef d'entreprise » | tick |
| 13.01 | « complètement gratuit » | Puce bleue « COMPLÈTEMENT GRATUIT » | pop |
| 15.09 | « comment vous fonctionnez » | Ligne « Comprendre comment vous fonctionnez » | tick |
| 17.27 / 19.25 / 20.25 | « outils » / « objectifs » / « situation actuelle » | Trois panneaux compacts sous la carte : icônes d'outils, mini-objectifs, jauge de situation | tick ×3 |
| 21.77 | « Et puis ensuite » | Caméra RIGHT, la colonne gauche sort | whoosh |
| 23.03 | « premièrement » | Carte « 1 · PREMIÈREMENT » à droite | pop |
| 24.15 | « voir déjà » | Icône horloge | tick |
| 25.35 | « gagner du temps » | Anneau qui se remplit + « Gagner du temps » | swell |
| 26.3 | (silence) | Vignette arrondie vers la gauche, fond de marque | whoosh |
| 27.0 | — | Écran de fin : panneau blanc avec logo, mascotte, « AGENTS IA POUR LES ENTREPRISES » ; tenue 2 s | pop |

## Sous-titres, mouvement, son

Identiques à `luma-audit-ia` (Inter 600 43 px, mot actif sur fond bleu, groupe statique ; entrées
0.45–0.65 s power3.out, contenu interne décalé ; une action à la fois).
Son : voix réelle, gain statique +5.6 dB (un gain plus fort écrêtait), fondu de sortie ; SFX synthétisés
(`assets/sfx/`, volumes 0.14–0.20), alignés sur l'atterrissage visuel ; pas de musique (non décidée).

## What NOT to do

Pas de détourage approximatif du logo ; pas de « LUMA » composé en texte (le logo officiel existe) ;
pas de doré ni de serif ; pas de coupe des hésitations sans validation ; pas de recadrage vertical.
