# luma-outils-ia — DESIGN

> **v002 (23/09/2026, retours de Robin)** : plus de logo en haut ; sous-titres Inter 800 italique blancs, mot actif et mots clés
> en bleu clair `#8FBBFF` (plus de pilule) ; visage mesuré à y 700–1230 / x 440–800 (échelle 1) et cadrages recalculés
> (FACE_LEFT/RIGHT 1.3 avec y -290, PUSH 1.1) pour que **rien ne passe jamais sur la tête** ; titres et chiffres posés en texte
> sur la vidéo (Barlow + ombre, mots clés bleu clair) au lieu de cartouches bleu nuit ; cartes Audit / Actions en verre clair ;
> « 3 h / jour » remplace l'accroche dans la zone haute ; carte commentaire descendue sur le buste ; voile dégradé sombre
> discret sur les 620 px du haut pour la lisibilité des titres. Le déroulé, la coupe et les événements sont inchangés.

Réel LUMA **vertical 1080×1920, 30 i/s, 97.2 s** « les 3 outils IA que j'ai mis dans mon entreprise », monté à partir de
cinq rushes verticaux natifs (`raw-media/IMG_0380/0382/0386/0388/0391.MOV`). Analyse : `raw-media/OUTILS-IA.ANALYSE.md`.
Direction : `../luma-film/LUMA_Bibliotheque_Marque.md` (gabarits 9:16, zone sûre Instagram).

Format : vertical retenu parce que les rushes sont filmés en vertical (proposé avant montage, « Ok go » de Robin).
Consigne : dynamique.

## Parole retenue (EDL `assets/edit-decisions.json`)

Cinq segments concaténés (amorces et fins de chaque rush retirées) → 94.4 s. Aucun mot retiré ; hésitations
conservées (choix par défaut annoncé). Les quatre raccords entre rushes (6.53, 28.93, 50.33, 78.0 s) sont couverts par
un changement de cadrage caméra et un titre de section.

## Visuels réels (`assets/shots/`)

- Tableau de bord : `vue.png`, `rapports.png`, `canaux.png` (montants floutés, réutilisés de `luma-etude-de-cas`) +
  `resa.png` (réservations : noms de clients et montants floutés, en-tête retiré).
- GEO : `chatgpt.png` (réponse ChatGPT recommandant Harmonie Yacht, barre d'icônes retirée). Carte « Audit GEO »,
  carte « Actions toutes les 2 semaines » et tuiles ChatGPT/Gemini/Perplexity : illustrations aux couleurs LUMA (pas de
  capture fournie pour l'audit).
- Agent WhatsApp : `wa-dispo.png` (conversation réelle où l'agent confirme une disponibilité ; en-tête avec le nom du
  contact et barre de saisie retirés).

## Structure et caméra

| Section | Temps | Caméra | Ce qui se passe |
|---|---|---|---|
| Accroche | 0–6.5 | FULL | logo ; carte « MON ENTREPRISE DE LOCATION DE BATEAU / 3 OUTILS IA / que j'ai mis en place » (0.67) ; carte « 3 h / jour économisées » (5.51) |
| 1/3 Tableau de bord | 6.5–28.9 | FACE_LEFT (visage à gauche, téléphone à droite) | titre + compteur 1/3 (8.35) ; téléphone Vue d'ensemble (10.79) ; écran Rapports + pilule Finance (13.25) ; sélection cartes CA sur « marge » (15.37) ; écran Canaux + pilule Marketing (17.67) ; sélection titre + puces Bouche à oreille 19 / Instagram Ads 6 (19.93–20.6) ; écran Réservations + pilule (25.73) ; sélections « à venir » (27.01) puis « soldes à encaisser » (27.61) |
| 2/3 GEO | 28.9–50.3 | FACE_RIGHT (visage à droite, colonne gauche) | titre + 2/3 (29.69) ; « = être cité par les IA » Caveat (31.77) ; carte Audit GEO + barre (34.27) ; téléphone ChatGPT + sélection du paragraphe Harmonie Yacht (36.93) ; carte Actions / 2 semaines (39.31) ; tuiles ChatGPT, Gemini, Perplexity (43.29–44.91) ; carte « ≈ 20 % de mes clients via ChatGPT » (46.57) ; « Cité par ChatGPT ! » (49.51) |
| 3/3 Agent WhatsApp | 50.3–78.0 | FACE_LEFT | titre + 3/3 (51.35) ; téléphone conversation réelle (53.91) ; pilules Autonome (57.75), Parle comme moi (59.73), Connaît mes règles (62.87), Connecté à mes outils (64.93) ; tuiles Google Calendar (69.83), CRM (70.69) ; sélection de la bulle « Vendredi 11 septembre est libre » sur « disponibilité » (72.37) ; tuile météo + « Même la météo ! » (75.29) |
| CTA | 78.0–94.4 | PUSH (visage centré) | pilules « Tu as une PME ? » (79.5), « L'IA dans ton entreprise » (81.34) ; carte commentaire avec « outil » tapé lettre par lettre (85.84–86.7) ; « juste en dessous » + flèche (86.84) ; carte « AUDIT GRATUIT · 0 € » (88.26) avec deux lignes cochées (91.38, 93.06) |
| Outro | 94.4–97.2 | END | logo + halo, « Commente « outil » pour ton audit gratuit », bouton « Découvrir Luma → » |

Caméra : FULL 1.0 ; FACE_LEFT 1.2 (-200, -60) ; FACE_RIGHT 1.2 (-40, -60) ; PUSH 1.2 (-108, -100). Zone sûre : sous-titres
à y 1440 (Inter Medium 46 px, mot actif bleu, sélection à poignées sur les mots clés), rien d'important sous y 1560 ni
dans la colonne des icônes Instagram (x > 930, y > 1150) ; les tuiles s'arrêtent à x 982 / y 1108.

## Son

Voix réelle, gain statique +9 dB (-28.4 → -19.4 LUFS, pic -2.0 dBTP), fondu final. Pas de musique. SFX synthétisés,
pistes attribuées automatiquement sans chevauchement.

## What NOT to do

Ne jamais réintroduire les noms de contacts ni les montants floutés ; pas de chiffre autre que ceux prononcés (3 outils,
3 h / jour, 20 %, 2 semaines) et ceux visibles dans les captures ; pas de couleur hors charte ; pas de musique sans instruction.
