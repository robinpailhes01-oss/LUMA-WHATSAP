# luma-reel-agent — DESIGN

Réel LUMA **9:16 (1080×1920, 30 i/s, 32.0 s)** à partir de `raw-media/IMG_0267.MOV` (« Si aujourd'hui tu es chef
d'entreprise… les clients ne vont plus vous interrompre »). Premier montage réalisé avec la **bibliothèque de marque**
(`../luma-film/LUMA_Bibliotheque_Marque.md`, planches MARQUE-03 à 06). Analyse : `raw-media/IMG_0267.ANALYSE.md`.

Format : Robin a demandé « ce réel » ; la bibliothèque décrit des gabarits 9:16 et le rush 4K permet un recadrage
vertical net → vertical retenu (les films précédents étaient en paysage sur consigne).

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
| Gabarit 3 (face + WhatsApp) | téléphone 434×770 avec les **captures réelles** anonymisées (`assets/shots/wa1.png`, `wa2.png`), défilement par paliers |
| Gabarit 4 (outils connectés) | tuiles Notion, Slack, Google Calendar, HubSpot (icônes Simple Icons, couleurs officielles) reliées au téléphone par des lignes tracées ; pilule « Tous vos outils. Une seule IA. » |
| Carte statistique | « DISPONIBLE / 24/24 / 7/7 » bleu nuit, chiffres Barlow en dégradé |
| Gabarit 6 (outro) | bleu nuit + halos bleu/violet + grille ; carte blanche logo + mascotte ; « Toujours à vos côtés. » ; bouton « Découvrir Luma → » ; baseline |
| Logo en haut | carte blanche 214×74 en haut à gauche pendant tout le film |
| Durées | titre 0.5, soulignement 0.35, mot actif 0.15, tuiles 0.45 (back.out), écran 0.6, lignes 0.45, données 0.45–0.8, outro 0.8 |

## Caméra (séquence 1440×1920 dans un cadre 1080)

| Mode | x | Visage | Colonne libre |
|---|---|---|---|
| CENTER | -180 | centre | — (accroche et lower-third sur le buste) |
| RIGHT | 0 | à droite | gauche x 0–440 (notifications, carte 24/7) |
| LEFT | -360 | à gauche | droite x 640–1080 (téléphone, pilules, tuiles) |
| CENTER + push 1.06 | -180 | centre | pilules clients sur le buste |

Zone sûre Instagram respectée : rien d'important sous y 1560 ni dans la colonne des icônes (x > 930, y > 1150),
sauf la pilule client 3 qui s'arrête à x ≈ 990.

## Séquences

| Temps | Parole | Ce qui se passe | SFX |
|---|---|---|---|
| 0.3 / 0.55 | « Si aujourd'hui » | Logo ; lower-third Robin | tick / pop |
| 1.22 | « chef d'entreprise » | Bande titre Barlow + soulignement ; sortie à 2.0 | whoosh / tick |
| 2.27 → 3.86 | « beaucoup de demandes tous les jours » | Caméra RIGHT ; 3 notifications WhatsApp | pop ×3 |
| 5.44 / 6.48 / 7.22 | « interrompu… n'importe… journée » | Badges horaires sur chaque notification | tick ×3 |
| 8.0 / 8.48 | « alors on a la solution » | Caméra LEFT, notifications sortent ; « Par ici ! » + flèche | whoosh / pop |
| 9.86 | « un agent WhatsApp » | Téléphone entre par la droite (captures réelles) | whoosh |
| 11.42 | « répond » | « Il répond tout seul. » | pop |
| 12.7 / 14.44 | « c'est… parle » | Conversation défile ; sélection sur « exactement » | tick ×2 |
| 16.18 / 17.38 | « entreprise » / « manière » | Pilules « Votre ton », « Vos expressions » ; sélection sur « manière » | pop ×2 |
| 18.73 → 20.5 | « connecté à tous vos outils » | Téléphone réduit ; 4 tuiles + lignes ; pilule « Tous vos outils » | whoosh, pop, tick ×3, pop |
| 21.23 → 24.12 | « disponible 24/24 et 7/7 » | Caméra RIGHT ; carte 24/24 puis 7/7 | whoosh, pop, tick ×2 |
| 25.17 → 28.28 | « les clients ne vont plus vous interrompre » | Caméra centre + push ; 3 pilules clients puis coches vertes ; sélection sur « plus » | whoosh, pop, tick ×3 |
| 29.27 → 32.0 | (fin) | Outro : logo + halo, signature, CTA | whoosh, swell, tick, pop |

## Son

Voix réelle, gain statique +7 dB (-25.5 → -18.4 LUFS, pic -2.2 dBTP), fondu 28.7–29.3 s. Pas de musique.
SFX synthétisés (pop, tick, whoosh, swell) 0.10–0.15, pistes 6/7/8.

## What NOT to do

Pas de couleur hors charte ; pas de police autre que Barlow Condensed / Inter / Caveat ; pas de chiffre non prononcé ;
pas de nom de contact dans les captures ; pas de tone-mapping hable sur ce rush (dominante rouge) ; pas de recadrage
16:9 → 9:16 après coup (la composition est verticale à la source).
