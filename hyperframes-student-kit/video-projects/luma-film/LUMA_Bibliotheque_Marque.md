# LUMA — Bibliothèque de marque pour les montages vidéo

Version 1.2 · 23 septembre 2026 · fournie par Robin (4 planches PNG), transcrite pour être appliquée par Claude Code.
Statut : **règle de marque pour tous les futurs montages**. Consigne de Robin : « tout ce que tu peux prendre en compte
pour les futurs montages afin que cela colle parfaitement à notre image de marque ».

Planches sources (registre MARQUE-03 à MARQUE-06 de `LUMA_References_Video.md`) :

| ID | Planche | Fichier |
|---|---|---|
| MARQUE-03 | Bibliothèque d'éléments pour le montage (17 familles) | `references/LUMA_Bibliotheque_01_Elements_Montage.png` |
| MARQUE-04 | Gabarits & positions pour les réels (6 gabarits, zone sûre) | `references/LUMA_Bibliotheque_02_Gabarits_Reels.png` |
| MARQUE-05 | Principes d'animation & motion (8 mouvements, à faire / à éviter) | `references/LUMA_Bibliotheque_03_Animation_Motion.png` |
| MARQUE-06 | Kit d'image de marque (palette, typographies, éléments, ton) | `references/LUMA_Bibliotheque_04_Kit_Marque.png` |

En cas de doute, l'image fait foi : ouvrir la planche avant d'inventer un élément. Ce document est la transcription
opérationnelle ; il complète `LUMA_References_Video.md` (brief, voix, méthode) sans le remplacer. Les instructions
directes de Robin sur un film priment toujours (exemple : format paysage 16:9 demandé pour les films de septembre 2026).

---

## 1. Palette (MARQUE-06 §1)

| Rôle | Nom | Hex | Usage |
|---|---|---|---|
| Fond principal | Bleu nuit | `#0B0F2D` | fonds sombres, cartes statistiques, end cards ; « confiance, élégance » |
| Éléments clés | Bleu électrique | `#3B82F6` | mot actif des sous-titres, pilules, boutons CTA, flèches, lignes de connexion ; « énergie, focus » |
| Accent | Violet | `#7C3AED` | dégradés de mots surlignés, glow, soulignements, étoile du logo ; « innovation, émotions » |
| Fonds clairs | Blanc cassé | `#F8FAFC` | fonds, cartes claires ; « clarté, respiration » |
| Secondaire | Gris UI | `#E5E7EB` | bordures, séparateurs, éléments secondaires ; « structure, équilibre » |
| Accent limité | Vert WhatsApp | `#25D366` | uniquement pour les bulles/messages WhatsApp ; « conversation, action » |

Dégradé de marque : bleu électrique → violet (pilules « Performance », mot « CROISSANCE » du hook, halos).
Aucune autre couleur (le doré des captures reste dans les captures ; « couleurs hors charte » = à éviter).

## 2. Typographies (MARQUE-06 §2)

| Usage | Police | Style |
|---|---|---|
| Titre / hook | **Barlow Condensed ExtraBold** | capitales, très serré, 2–3 lignes, dernier mot en dégradé bleu → violet ou en bleu électrique |
| Sous-titre | Inter Semibold | phrase courte sous le hook (« L'IA qui travaille avec vous. ») |
| Texte courant | Inter Regular (corps), Inter Medium (important), Inter Semibold (mise en avant) | paragraphes de cartes |
| Sous-titres vidéo | Inter Medium | mot actif sur pilule bleu électrique, mots blancs, fond sombre translucide |
| Accent manuscrit | **Caveat** (ou équivalent) | annotations bleues/violettes : « Par ici ! », « Du concret. Pas du blabla. », « On avance ensemble. », « Toujours à vos côtés. » |
| CTA (bouton) | Inter Semibold | « Découvrir Luma → » |

Interdits : polices fantaisistes ou illisibles.

**Polices disponibles dans le dépôt** (`luma-film/assets/fonts/`, sous-ensembles latin + latin-ext de Google Fonts, licence SIL OFL 1.1) :
Barlow Condensed 700 et 800, Caveat variable 400–700, avec `fonts.css` prêt à coller dans `build.mjs` ; Inter est déjà
dans chaque projet de film. Couverture vérifiée : accents français, œ, €, guillemets ; la flèche « → » n'est pas dans ces
sous-ensembles (la composer en Inter ou en SVG). Rendu de contrôle Chrome : `references/LUMA_Polices_Specimen.png`.
Pour un nouveau film : copier le dossier `assets/fonts/` du projet `luma-film` dans `<projet>/assets/fonts/`.

## 3. Ton & sensation (MARQUE-06 §4)

Premium et professionnel · clair et impactant · humain et accessible · technologique et innovant · rassurant et
orienté solutions · **jamais gadget, toujours utile**. Signature manuscrite : « Du concret. Pas du blabla. »

## 4. Bibliothèque d'éléments (MARQUE-03, MARQUE-06 §3)

1. **Titres / hooks** — trois styles : impact moderne (blanc + dernier mot dégradé, fond clair), épuré (bleu nuit +
   soulignement bleu), sur fond coloré (bleu nuit, texte blanc + pilule violette).
2. **Sous-titres** — blancs « clean » sur bandeau sombre translucide ; avec mot clé en surbrillance bleue ; format
   compact « pill » pour un seul groupe court.
3. **Texte courant** — carte blanche, Inter Regular/Medium/Semibold.
4. **Pilules de mots clés** — bleu électrique, violet, bleu clair (`Performance`, `Croissance`, `Automatisation`,
   `Agent IA`, `WhatsApp`, `Résultats`, `Simple`) ; texte blanc ou bleu nuit selon le fond.
5. **Sélections de mots** — cadre bleu avec poignées aux coins (style sélection d'interface) autour d'un mot :
   `agent` (fond bleu), `croissance` (fond lavande).
6. **Soulignements** — traits manuscrits bleu/violet, simples, doubles, pointillés.
7. **Flèches** — flèches manuscrites bleues et violettes, pleines ou pointillées, pour guider le regard.
8. **Annotations manuscrites** — Caveat, bleu/violet, parfois entourées d'un cercle tracé à la main.
9. **Bulles d'appel** — blanche, lavande, contour bleu manuscrit, bleu nuit (« Plus de temps pour vous. », « Des
   résultats concrets. », « C'est simple ! », « L'IA, votre coéquipier. »).
10. **Lower-thirds** — carte blanche arrondie, vignette vidéo à gauche, « Prénom Nom / Fondateur de Luma » + étoile
    violette ; variante logo « Luma✦ / Des outils, des résultats. ».
11. **Pack CTA** — bouton plein bleu électrique « Découvrir Luma → », contour bleu clair « Demander une démo → »,
    plein bleu nuit « Essayer gratuitement → ».
12. **Cartes statistiques** — carte bleu nuit « ≈ 1 992 € / Revenus générés » (chiffre en bleu électrique), carte
    blanche « +320 % / De prospects qualifiés » avec icône barres.
13. **Pack overlays** — carte outil « Mes outils » (icônes Notion, Slack, Google Calendar, HubSpot), carte KPI
    « +320 % », notification système « Luma · Votre agent a terminé la tâche ! », bulle WhatsApp verte « Voilà avec
    Luma c'est beaucoup plus simple ! 11:24 ✓✓ ».
14. **Icônes d'apps** — Notion, Slack, Google Calendar, HubSpot, WhatsApp, Gmail, LinkedIn, YouTube, Figma, Dropbox,
    dans des tuiles blanches arrondies avec ombre douce.
15. **Logos & lockups** — « Luma✦ » sur blanc, sur bleu nuit, lockup avec « L'IA AU SERVICE DE VOS AMBITIONS »,
    lockup mascotte + « Luma ». Fichier disponible : `references/LUMA_Logo_Mascotte.png` (MARQUE-02, fond blanc).
16. **Fonds & textures** — halo glow violet, halo glow bleu, grille subtile, grain doux.
17. **End cards** — bleu nuit + logo + baseline ; blanche + mascotte + « Merci d'avoir regardé ! » ; bleu nuit +
    manuscrit « On avance ensemble. » souligné.

Mascotte : robot blanc et noir, yeux bleus lumineux, sweat bleu nuit « Luma✦ », pouce levé. À utiliser telle que
fournie (jamais redessinée). Baselines : « Toujours à vos côtés. », « Plus qu'une IA, un coéquipier. »,
« Des contenus qui font avancer vos ambitions ».

## 5. Gabarits pour les réels 9:16 (MARQUE-04)

Six compositions à reproduire (1080 × 1920) :

| # | Gabarit | Contenu | Repère de temps sur la planche |
|---|---|---|---|
| 1 | Hook plein écran | logo en haut, hook Barlow 3 lignes centré, sous-titre Inter, pilule « Des résultats concrets. » en bas | 0:00 |
| 2 | Face caméra + cartes UI | Robin cadré, carte « Mes outils » + carte « Abonnements » en haut-gauche, carte « ≈ 1 992 € de temps gagné » en bas-gauche, sous-titres à mot actif | 0:12 |
| 3 | Face caméra + WhatsApp | Robin décalé à gauche, écran WhatsApp entrant par la droite (conversation réelle), sous-titres | 0:18 |
| 4 | Mascotte + outils connectés | mascotte au centre, icônes outils autour (WhatsApp, Notion, Agenda, CRM, Devis), lignes de connexion, pilule « Tous vos outils. Une seule IA. » | 0:08 |
| 5 | Cas client / KPI | étiquette « CAS CLIENT », citation « On a gagné 1 992 € en 1 mois. », avatar + nom, carte « Résultats en 30 jours » (+60 % réponses, -12 h/semaine, +1 992 € CA) | 0:08 |
| 6 | Outro / CTA | bleu nuit, logo + baseline, manuscrit « Toujours à vos côtés. », mascotte, bouton « Découvrir Luma → » | 0:08 |

**Zone sûre Instagram (9:16)** : logo en haut (gauche ou centré) ; titre principal dans la zone sûre ; sous-titre
complémentaire dessous ; visuel principal (personne, UI, mascotte) au centre ; sous-titres/captions en bas, bien
lisibles ; bouton CTA en bas centré. Garder titres et éléments clés au centre, éviter les bords (interface, boutons),
tester l'affichage sur plusieurs appareils.

**Règles de placement** : accroche en haut (impact immédiat) ; sous-titres lisibles et contrastés ; **1 focus visuel
principal par plan** ; ne pas surcharger l'écran ; respecter la zone sûre ; intégrer l'identité (logo, couleurs,
ton) ; rythme court, clair, percutant. **Les 3 premières secondes sont décisives.**

Adaptation 16:9 (films actuels) : mêmes familles d'éléments, visage sur un côté, colonne libre pour les cartes ;
sous-titres en bas ; CTA/logo à l'end card. Ne pas recadrer un 9:16 en 16:9 ni l'inverse : recomposer.

**Décision de Robin (22/09/2026)** : les films LUMA restent en **paysage 16:9** « comme à la base ». Les gabarits 9:16
ci-dessus servent de référence d'éléments et de placement ; ne produire une version verticale que sur demande explicite
(exemple : `luma-reel-agent` v001 verticale refusée, v002 paysage livrée).

## 6. Principes d'animation (MARQUE-05)

| # | Mouvement | Durée | Caractère | Mise en œuvre GSAP |
|---|---|---|---|---|
| 1 | Apparition du titre | 0,3–0,6 s | fluide & impactant | entrée par glissement depuis le bas ou fondu progressif, `power3.out` |
| 2 | Soulignement animé | 0,2–0,4 s | dynamique & élégant | se dessine de gauche à droite (`scaleX` origine gauche ou `strokeDashoffset`) |
| 3 | Sélection de mots (sous-titres) | 0,15–0,3 s | rythme naturel | pilule bleue sur le mot au moment où il est prononcé |
| 4 | Cartes outils | 0,3–0,6 s | doux & propre | pop avec léger rebond (`back.out(1.4–1.8)`), « pop léger et premium » |
| 5 | Écran qui slide | 0,4–0,8 s | naturel & fluide | écran WhatsApp/app entrant depuis la droite ou la gauche |
| 6 | Lignes de connexion | 0,4–0,8 s | progressif & organique | tracés de Luma vers les outils (`strokeDashoffset`) |
| 7 | Apparition de données | 0,4–1 s | séquentiel & clair | cartes/statistiques une à une (stacking), chiffre qui se remplit (« ≈ — — — € » → « ≈ 1 992 € ») |
| 8 | Outro logo / CTA | 0,6–1 s | élégant & mémorable | logo en fondu + glow subtil, puis message CTA |

**Le bon mouvement** : fluide (naturel, sans à-coups) · respiration (laisser le temps de lire) · lisible (au service du
message) · hiérarchie claire · pas d'effet gadget · **1 mouvement principal à la fois**.

**À faire** : transitions douces 200–600 ms ; mouvements cohérents avec la direction du regard ; animations qui
soulignent le propos ; identité visuelle constante (couleurs, rayons, arrondis) ; sous-titres dynamiques et
synchronisés ; fins claires avec un CTA lisible.

**À éviter** : effets extravagants (rotations, zooms excessifs) ; animations trop rapides (< 100 ms) ; trop d'éléments
qui bougent en même temps ; polices fantaisistes ; couleurs hors charte ; transitions brusques ou datées.

## 7. Traduction en jetons pour `build.mjs` (à partir du prochain film)

```js
const BRAND = {
  night: "#0B0F2D", blue: "#3B82F6", violet: "#7C3AED",
  offwhite: "#F8FAFC", grayUI: "#E5E7EB", whatsapp: "#25D366",
  gradient: "linear-gradient(90deg,#3B82F6,#7C3AED)",
  fontHook: "'Barlow Condensed'", fontBody: "'Inter'", fontHand: "'Caveat'",
  radius: { card: 24, pill: 999, phone: 40 },
  t: { title: 0.45, underline: 0.3, word: 0.2, tile: 0.45, slide: 0.6, link: 0.6, data: 0.7, outro: 0.8 }
};
```

Sous-titres : Inter Medium, mot actif `BRAND.blue`, pas de déplacement vertical par mot. Pilule CTA : `BRAND.blue`,
texte blanc Inter Semibold, flèche « → ». Cartes statistiques : fond `BRAND.night`, chiffre `BRAND.blue`.
Vert `#25D366` réservé aux bulles WhatsApp (déjà appliqué dans `luma-agent-whatsapp` via les captures réelles).

## 8. Écarts avec les films déjà livrés (à décider par Robin pour les v002)

| Point | Films v001 (`luma-audit-ia`, `luma-audit-gratuit`, `luma-agent-whatsapp`) | Bibliothèque |
|---|---|---|
| Palette | `#10182B` / `#4263F5` / `#8A5CF6` / `#F7F8FC` | `#0B0F2D` / `#3B82F6` / `#7C3AED` / `#F8FAFC` (proches, à aligner) |
| Titres | Inter 800 | **Barlow Condensed ExtraBold** capitales, dernier mot en dégradé |
| Sous-titres | Inter 600, 43 px, mot actif bleu | Inter **Medium**, mot actif bleu (même principe) |
| Annotations manuscrites | absentes | **Caveat** bleu/violet (« Par ici ! », « Du concret. ») |
| Format | 16:9 (demande explicite de Robin) | gabarits 9:16 pour Instagram ; 16:9 reste valable sur instruction |
| CTA | aucun bouton | bouton « Découvrir Luma → » à l'outro |
| Lower-third | absent | « Robin … / Fondateur de Luma » possible à la première apparition |
| End card | logo sur carte blanche | bleu nuit + glow violet + logo + baseline (+ mascotte) |
| Textures | halos flous bleu/violet | halo glow, grille subtile, grain doux : conformes |

Les films livrés ne sont **pas** modifiés sans demande. Toute nouvelle version applique cette bibliothèque par défaut.


## 9. Retours de Robin sur les montages (règles durables, 23/09/2026)

Retours donnés sur `luma-outils-ia` v001, à appliquer à tous les montages suivants (ils priment sur les gabarits ci-dessus) :

1. **Pas de logo permanent en haut** du film. Le logo n'apparaît qu'à l'écran de fin.
2. **Sous-titres** : gras italique blanc (Inter 800 italique, ≈ 54 px en 9:16), ombre portée sombre, **mot clé / mot actif
   en bleu clair `#8FBBFF`** (texte coloré, pas de pilule de fond). Référence : capture d'un Reel tiers fournie par Robin
   (« directement dans Claude. »).
3. **Ne jamais couper la tête** avec un graphique. Les cartes, téléphones et pilules restent au-dessus ou à côté du visage ;
   une superposition n'est acceptable que si elle est réellement translucide et volontaire. Mesurer la position réelle du
   visage sur la séquence (grille) avant de placer les zones ; sur les rushes verticaux de septembre 2026 le visage occupe
   y 700–1230 / x 440–800 à l'échelle 1.
4. **Épuré et classe** : éviter l'empilement de rectangles sur fond de couleur. Titres en Barlow posés directement sur la
   vidéo avec une ombre, chiffres clés en texte dégradé sans cartouche, cartes réservées aux vrais objets d'interface
   (téléphone, commentaire) et, au besoin, un verre clair très léger.

## Historique

| Version | Date | Changement |
|---|---|---|
| 1.0 | 22/09/2026 | Transcription des 4 planches fournies par Robin ; écarts avec les v001 listés. |
| 1.1 | 22/09/2026 | Polices Barlow Condensed (700, 800) et Caveat (400–700) déposées dans `assets/fonts/` avec `fonts.css` et spécimen de contrôle. |
| 1.2 | 23/09/2026 | §9 : retours durables de Robin (pas de logo permanent, sous-titres gras italique à mot clé bleu clair, jamais sur la tête, moins de cartouches). |
