# luma-reel-agent — DESIGN

Réel LUMA — **v002 : paysage 16:9 (1920×1080, 30 i/s, 32.0 s)** ; v001 : vertical 9:16 (1080×1920), même coupe et mêmes événements — à partir de `raw-media/IMG_0267.MOV` (« Si aujourd'hui tu es chef
d'entreprise… les clients ne vont plus vous interrompre »). Premier montage réalisé avec la **bibliothèque de marque**
(`../luma-film/LUMA_Bibliotheque_Marque.md`, planches MARQUE-03 à 06). Analyse : `raw-media/IMG_0267.ANALYSE.md`.

Format : v001 livrée en vertical (gabarits 9:16 de la bibliothèque). Robin : « On garde le format paysage comme il
était de base » → v002 recomposée en 1920×1080 (pas un recadrage : colonnes, caméra et positions refaites).

## Parole retenue (EDL `assets/edit-decisions.json`)

Six blocs source (1.05–5.40, 9.85–15.00, 17.25–20.30, 21.70–30.35, 33.25–37.10, 40.70–44.92) → 29.27 s. Cinq
blancs de 2 à 5 s ramenés à ≈ 0.5 s, amorce et fin coupées. Aucun mot retiré. Les raccords sont des jump cuts
sur le visage centré ; le premier (4.35 s) est couvert par un léger push-in caméra.

## Marque appliquée

| Règle bibliothèque | Mise en œuvre |
|---|---|
| Palette | `#0B0F2D` fonds/cartes, `#3B82F6` mot actif, pilules, CTA, lignes ; `#7C3AED` dégradés et signature ; `#25D366` uniquement WhatsApp |
| Hook Barlow Condensed ExtraBold | bande « CHEF / D'ENTREPRISE ? » (dernier mot en dégradé bleu → violet), soulignement animé 0.35 s |
| Inter Medium sous-titres, mot actif bleu | 46 px, y 1440 (zone sûre) ; mots « exactement », « manière », « plus » avec **sélection à poignées** (élément 5) |
| Caveat annotations | « Par ici ! » + flèche tracée, « Il répond tout seul. », « Toujours à vos côtés. » |
| Lower-third | « Robin · Fondateur de Luma » 0.55–1.2 s |
| Pack overlays | 3 notifications « Nouveau client » (messages illustratifs) + badges horaires 07:48 / 13:15 / 23:40 |
| Gabarit 3 (face + WhatsApp) | téléphone 420×760 (v002) avec les **captures réelles** anonymisées (`assets/shots/wa1.png`, `wa2.png`), défilement par paliers |
| Gabarit 4 (outils connectés) | tuiles Notion, Slack, Google Calendar, HubSpot (icônes Simple Icons, couleurs officielles) reliées au téléphone par des lignes tracées ; pilule « Tous vos outils. Une seule IA. » |
| Carte statistique | « DISPONIBLE / 24/24 / 7/7 » bleu nuit, chiffres Barlow en dégradé |
| Gabarit 6 (outro) | bleu nuit + halos bleu/violet + grille ; carte blanche logo + mascotte ; « Toujours à vos côtés. » ; bouton « Découvrir Luma → » ; baseline |
| Logo en haut | carte blanche 214×74 en haut à gauche pendant tout le film |
| Gabarits 9:16 → 16:9 | mêmes familles d'éléments ; visage sur un côté, colonne libre de l'autre (règle d'adaptation §5 de la bibliothèque) |
| Durées | titre 0.5, soulignement 0.35, mot actif 0.15, tuiles 0.45 (back.out), écran 0.6, lignes 0.45, données 0.45–0.8, outro 0.8 |

## Caméra v002 (séquence 1920×1080, origine 0 0, visage source x ≈ 960)

| Mode | Réglage | Visage | Zone libre | Séquences |
|---|---|---|---|---|
| LEFT | 1.26, (0, -40) ; push 1.30 à 4.35 | à droite (x ≈ 1210) | colonne gauche x 90–840 | accroche, lower-third, notifications, carte 24/7 |
| RIGHT | 1.32, (-560, -70) | à gauche (x ≈ 707) | zone droite x 1150–1900 | « Par ici ! », téléphone, pilules, tuiles |
| PUSH | 1.08, (-77, -45) | centre | buste | pilules clients |

Sous-titres à y 924 (largeur ≤ 1400, centrés) ; le téléphone (1420–1840, y 80–840) et ses pilules restent à droite
des sous-titres. v001 (9:16) : CENTER/RIGHT/LEFT par translation x sur une séquence 1440×1920, cf. `qa/motion-9x16.js`.

## Séquences

| Temps | Parole | Ce qui se passe | SFX |
|---|---|---|---|
| 0.3 / 0.55 | « Si aujourd'hui » | Logo ; lower-third Robin | tick / pop |
| 1.22 | « chef d'entreprise » | Bande titre Barlow + soulignement ; sortie à 2.0 | whoosh / tick |
| 2.27 → 3.86 | « beaucoup de demandes tous les jours » | 3 notifications WhatsApp dans la colonne gauche (v002 : caméra déjà LEFT) | pop ×3 |
| 5.44 / 6.48 / 7.22 | « interrompu… n'importe… journée » | Badges horaires sur chaque notification | tick ×3 |
| 8.0 / 8.48 | « alors on a la solution » | Caméra RIGHT (v002), notifications sortent ; « Par ici ! » + flèche | whoosh / pop |
| 9.86 | « un agent WhatsApp » | Téléphone entre par la droite (captures réelles) | whoosh |
| 11.42 | « répond » | « Il répond tout seul. » | pop |
| 12.7 / 14.44 | « c'est… parle » | Conversation défile ; sélection sur « exactement » | tick ×2 |
| 16.18 / 17.38 | « entreprise » / « manière » | Pilules « Votre ton », « Vos expressions » ; sélection sur « manière » | pop ×2 |
| 18.73 → 20.5 | « connecté à tous vos outils » | Téléphone réduit ; 4 tuiles + lignes ; pilule « Tous vos outils » | whoosh, pop, tick ×3, pop |
| 21.23 → 24.12 | « disponible 24/24 et 7/7 » | Caméra LEFT (v002) ; carte 24/24 puis 7/7 | whoosh, pop, tick ×2 |
| 25.17 → 28.28 | « les clients ne vont plus vous interrompre » | Caméra FULL + push ; 3 pilules clients puis coches vertes ; sélection sur « plus » | whoosh, pop, tick ×3 |
| 29.27 → 32.0 | (fin) | Outro : logo + halo, signature, CTA | whoosh, swell, tick, pop |

## Son

Voix réelle, gain statique +7 dB (-25.5 → -18.4 LUFS, pic -2.2 dBTP), fondu 28.7–29.3 s. Pas de musique.
SFX synthétisés (pop, tick, whoosh, swell) 0.10–0.15, pistes 6/7/8.

## What NOT to do

Pas de couleur hors charte ; pas de police autre que Barlow Condensed / Inter / Caveat ; pas de chiffre non prononcé ;
pas de nom de contact dans les captures ; pas de tone-mapping hable sur ce rush (dominante rouge) ; pas de recadrage
d'un format vers l'autre (chaque format est une recomposition : v001 verticale, v002 paysage).
