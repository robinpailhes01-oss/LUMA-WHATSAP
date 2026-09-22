# luma-reel-agent — Carnet d'itérations

Réel LUMA (v001 9:16, **v002 paysage 16:9**) « l'agent WhatsApp qui répond » (IMG_0267.MOV). Règles : `../luma-film/LUMA_Bibliotheque_Marque.md`,
`../luma-film/LUMA_References_Video.md`, `../luma-film/CLAUDE.md`. Convention : `renders/v00N_<objectif>.mp4`.

## Avant v001 — analyse et consignes (22/09/2026)

- Consigne de Robin : « Avec toutes les mises à jour que tu viens de faire, fais ce montage pour ce réel-là. »
  → bibliothèque de marque appliquée intégralement ; format vertical déduit de « réel » + gabarits 9:16 + rush 4K.
- Analyse du rush : `../../raw-media/IMG_0267.ANALYSE.md`.

## v001 — luma-reel-agent (22/09/2026)

- Rendu : `renders/v001_luma-reel-agent.mp4` — 32.0 s, 1080 × 1920, 30 i/s, sha256 `d692a036…`.
- Mise en œuvre : `DESIGN.md` ; contrôles : `VERIFY.md`.
- Statut : livré, **remplacé par v002** (retour de Robin : garder le paysage).

| # | Point | Statut |
|---|---|---|
| 1 | Format vertical 9:16 (gabarits de la bibliothèque) | **refusé** — « On garde le format paysage comme il était de base » |
| 2 | Palette, Barlow Condensed, Inter, Caveat, durées d'animation de la bibliothèque | conforme |
| 3 | Captures WhatsApp réelles réutilisées (sans nom) | à valider (passages montrés) |
| 4 | Notifications et pilules clients : textes illustratifs | à valider ou remplacer par de vrais messages |
| 5 | Logo en haut à gauche pendant tout le film (règle « logo en haut ») | à valider (Robin avait demandé « moins de logo » sur le film précédent) |
| 6 | Sous-titre « tu as interrompu » (Whisper) vs « tu es interrompu » | à corriger en v002 |
| 7 | Pas de musique, SFX légers | conforme aux consignes précédentes |

## v002 — paysage (22/09/2026)

- Rendu : `renders/v002_paysage.mp4` — 32.0 s, 1920 × 1080, 30 i/s, sha256 `44f2d79b…`.
- Statut : **livré, en attente du retour de Robin**.

| # | Demande (temps) | Résultat souhaité | Mise en œuvre | Statut |
|---|---|---|---|---|
| 1 | Format paysage « comme il était de base » (tout le film) | 16:9 | Séquence plein cadre 1920×1080 ; composition recomposée : caméra LEFT/RIGHT/PUSH des films précédents, colonne gauche (accroche, notifications, 24/7), zone droite (téléphone, pilules, tuiles), écran de fin centré. Coupe, voix, SFX, sous-titres inchangés. | mise en œuvre |

Points ouverts reportés de la v001 : textes des notifications/pilules (illustratifs), « tu as / tu es interrompu »,
logo permanent en haut à gauche, passages WhatsApp montrés. **Décision durable** : les films LUMA restent en paysage
16:9 sauf demande contraire (reporté dans `../luma-film/LUMA_Bibliotheque_Marque.md` §5).

## v003 — à définir

| # | Demande (temps) | Résultat souhaité | Mise en œuvre | Statut |
|---|---|---|---|---|
| 1 | | | | demandée |

### Fiche de retour

```
Version regardée : v002
Ce que je veux garder :
À changer à [00:00–00:00] :
Résultat souhaité :
Priorité : indispensable / amélioration / test
Après livraison : validé / à reprendre / à comparer
```
