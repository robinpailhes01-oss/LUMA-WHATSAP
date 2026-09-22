# Luma Leads

Tableau de bord interne de prospection pour l'offre « L'Employé WhatsApp 24/7 ».
Next.js 14 (App Router, TypeScript strict) · Tailwind · shadcn/ui · motion/react · Supabase.

## Lancer en local

```bash
cp .env.local.example .env.local   # puis renseigner URL + clé anon Supabase
npm install
npm run dev                         # http://localhost:3000
```

## Base de données

La migration est dans `supabase/migrations/20260905000000_init_luma.sql`.
Elle n'est pas appliquée automatiquement : à exécuter dans le SQL Editor Supabase (ou via `supabase db push`).

## Design

Voir `DESIGN.md` — spec de tokens et règles d'interface (skill `premium-web-design`, type Dashboard / admin).

## Kit vidéo HyperFrames

Le dossier `hyperframes-student-kit/` est une copie du dépôt
[nateherkai/hyperframes-student-kit](https://github.com/nateherkai/hyperframes-student-kit)
(montage vidéo, reels, motion graphics avec HyperFrames et GSAP), copie complète :
vidéos d'exemple (`examples/showcase/`), les 12 projets `video-projects/` et leurs
médias, assets de marque, scripts, docs et bibliothèque de styles.

Note : le `.gitignore` du kit ignore par défaut les médias (`*.mp4`, `**/assets/`,
`video-projects/`). Les fichiers d'origine sont suivis quand même ; pour en ajouter
de nouveaux, utiliser `git add -f`.

Il contient les 14 skills dans `hyperframes-student-kit/.claude/skills/` :
`edit-video`, `cut-silences`, `cut-mistakes`, `short-form-edit`, `short-form-video`,
`make-a-video`, `video-storytelling`, `style-library`, `hyperframes`, `hyperframes-cli`,
`hyperframes-registry`, `hyperframes-video-beats`, `gsap`, `website-to-hyperframes`.

Les skills s'appuient sur les scripts, docs et bibliothèques du kit (chemins relatifs
à sa racine) : ouvrir `hyperframes-student-kit/` dans Claude Code ou Codex et suivre
son `README.md` (`npm ci`, `npm run setup`, `npm test`).


### Références LUMA (films HyperFrames)

`hyperframes-student-kit/video-projects/luma-film/LUMA_References_Video.md` est le document
de direction évolutif des films LUMA (brief, références, identité, méthode d'itération).
Le carnet `ITERATIONS.md` et la liste des fichiers de référence attendus (`references/README.md`)
sont dans le même dossier. Toute session de montage LUMA doit le lire en premier.
`LUMA_Bibliotheque_Marque.md` (même dossier) transcrit la bibliothèque de marque fournie par Robin
(4 planches dans `references/LUMA_Bibliotheque_0*.png`) : palette, typographies, éléments, gabarits 9:16,
principes d'animation. Elle s'applique à tout nouveau montage.
Premier montage réalisé avec elle : `hyperframes-student-kit/video-projects/luma-reel-agent/` (réel 9:16).
