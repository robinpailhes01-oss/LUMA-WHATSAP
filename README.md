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
(montage vidéo, reels, motion graphics avec HyperFrames et GSAP), sans les vidéos
d'exemple ni les projets `video-projects/` (≈ 390 Mo de médias exclus).

Il contient les 14 skills dans `hyperframes-student-kit/.claude/skills/` :
`edit-video`, `cut-silences`, `cut-mistakes`, `short-form-edit`, `short-form-video`,
`make-a-video`, `video-storytelling`, `style-library`, `hyperframes`, `hyperframes-cli`,
`hyperframes-registry`, `hyperframes-video-beats`, `gsap`, `website-to-hyperframes`.

Les skills s'appuient sur les scripts, docs et bibliothèques du kit (chemins relatifs
à sa racine) : ouvrir `hyperframes-student-kit/` dans Claude Code ou Codex et suivre
son `README.md` (`npm ci`, `npm run setup`, `npm test`).
