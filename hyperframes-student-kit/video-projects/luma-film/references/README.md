# Références LUMA — fichiers attendus

`LUMA_References_Video.md` (§3) référence les fichiers ci-dessous. Au 22/09/2026, seuls le
document lui-même, `CLAUDE.md` et le carnet sont dans ce dépôt : le projet complet (code, médias, rendu v001)
a été produit dans un autre environnement et reste à déposer ici.

| ID | Chemin attendu | Présent ici |
|---|---|---|
| MARQUE-01 | `references/LUMA_Charte_Source.md` | non |
| STYLE-01 | `references/REF_01_Style_Principal.mp4` | non |
| STYLE-02 | `references/REF_02_Precedente_120034.mp4` | non |
| STYLE-03 | `references/REF_03_Precedente_120130.mp4` | non |
| ANALYSE-01 | `REFERENCE-ANALYSIS.md` | non |
| CONTACT-01 | `references/REF_01_Sequence.jpg` | non |
| SOURCE-01 | `assets/source.mp4` | non |
| PRODUIT-01 | `assets/interface.jpeg` | non |
| BASE-001 | `renders/v001_reference.mp4` | non |
| — | `CLAUDE.md` | **oui** (consignes de reprise, déposées le 22/09/2026) |
| MARQUE-02 | `references/LUMA_Logo_Mascotte.png` | **oui** (22/09/2026, fourni par Robin : logotype « Luma » bleu nuit + étoile violette + mascotte robot + « AGENTS IA POUR LES ENTREPRISES », 1536×1024, fond blanc opaque — version à fond transparent ou SVG souhaitable pour l'incruster sur vidéo) |
| MARQUE-03 | `references/LUMA_Bibliotheque_01_Elements_Montage.png` | **oui** (22/09/2026, planche « Bibliothèque d'éléments pour le montage », 1122×1402) |
| MARQUE-04 | `references/LUMA_Bibliotheque_02_Gabarits_Reels.png` | **oui** (22/09/2026, planche « Gabarits & positions pour les réels ») |
| MARQUE-05 | `references/LUMA_Bibliotheque_03_Animation_Motion.png` | **oui** (22/09/2026, planche « Principes d'animation & motion ») |
| MARQUE-06 | `references/LUMA_Bibliotheque_04_Kit_Marque.png` | **oui** (22/09/2026, planche « Kit d'image de marque pour les réels ») — transcription des 4 planches : `../LUMA_Bibliotheque_Marque.md` |
| POLICES-01 | `assets/fonts/{BarlowCondensed-700,BarlowCondensed-800,Caveat-400-700}-{latin,latin-ext}.woff2`, `fonts.css`, `OFL-*.txt` | **oui** (22/09/2026, récupérées sur Google Fonts) |
| — | `references/LUMA_Polices_Specimen.png` | **oui** (rendu Chrome headless des polices, contrôle des accents) |
| — | `build.mjs`, `motion.js`, `index.html`, `DESIGN.md`, `qa/export-verification.json`, `REPRISE_TECHNIQUE.md`, polices Inter | non |

## Comment les déposer

- Fichiers < 100 Mo : les copier dans ce dossier puis `git add -f hyperframes-student-kit/video-projects/luma-film/`
  (le `.gitignore` du kit ignore `video-projects/`, `*.mp4` et `**/assets/` par défaut).
- Fichiers > 30 Mo depuis le téléphone : lien de partage public (Drive, Dropbox, WeTransfer) collé dans la session Claude Code ;
  le fichier est téléchargé directement dans ce dossier.
- Une archive zip du projet complet peut aussi être déposée à la racine de ce dossier ; elle sera décompressée en place.

Mettre à jour la colonne « Présent ici » à chaque dépôt.

## Décisions notées (22/09/2026)

- Effets sonores légers autorisés à l'apparition des éléments (Robin, 22/09). Musique : toujours non décidée.
- Le logotype officiel remplace le « LUMA » composé en texte dès la prochaine version d'un film.
- La bibliothèque de marque (MARQUE-03 à 06, Robin, 22/09) s'applique à tout nouveau montage : palette hex, Barlow Condensed pour les hooks, Caveat pour les annotations, durées d'animation. Polices Barlow Condensed (700, 800) et Caveat (400–700) déposées le 22/09 dans `../assets/fonts/` (woff2 Google Fonts, OFL) avec `fonts.css` ; spécimen de rendu : `LUMA_Polices_Specimen.png`.
