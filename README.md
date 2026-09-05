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
