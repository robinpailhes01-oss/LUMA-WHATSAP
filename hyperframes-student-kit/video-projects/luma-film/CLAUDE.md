# Projet vidéo LUMA — consignes de reprise

Le fichier `LUMA_References_Video.md` est la référence créative évolutive et `LUMA_Bibliotheque_Marque.md` la bibliothèque de marque (palette, typographies, éléments, gabarits, animation) à appliquer à tout nouveau montage. Lire aussi `ITERATIONS.md`, `DESIGN.md`, `REFERENCE-ANALYSIS.md` et `REPRISE_TECHNIQUE.md` avant de modifier le projet.

Les nouvelles instructions de Robin priment. Distinguer ses décisions explicites des choix de réalisation encore en discussion. Ne pas prétendre que le dernier rendu a été approuvé.

1. Reprendre la composition existante, ses médias locaux et ses polices. Le rendu témoin est `renders/v001_reference.mp4`. Les vidéos tierces sont dans `references/` ; elles servent à l'analyse, pas à remplacer Robin dans le film.
2. Pour ce film : paysage 1920 × 1080, 30 i/s, 20 s. Changer le format seulement si demandé. Pour un nouveau film, recalculer le plan et les mots horodatés depuis sa nouvelle source.
3. Conserver les rushes originaux. Garder la voix réelle, la vitesse et le timbre. Aucun TTS, clonage ou effet vocal par défaut. Une coupe ou un mixage empêche de revendiquer l'identité intégrale des octets audio ; en tenir compte dans la vérification.
4. Modifier `build.mjs` pour la structure et le style, `motion.js` pour les animations et `assets/plan.json` pour le plan et les sous-titres. `index.html` est généré : reconstruire avec `node build.mjs`. Éviter une correction uniquement dans le HTML qui serait écrasée au prochain build.
5. Préserver le contrat HyperFrames : composition `luma-reference`, timeline GSAP finie et en pause, enregistrée de façon synchrone dans `window.__timelines`. HyperFrames pilote les médias. Ne pas ajouter de lecture autonome ni d'animation aléatoire.
6. Garder les entrées visuelles proches des mots concernés. Si les coupes changent, recalculer les sous-titres et les autres repères temporels ; ne pas réutiliser les temps de l'ancien montage.
7. Livrer un nouveau fichier numéroté dans `renders/`. Conserver les rendus précédents. Vérifier le rendu encodé, les textes, le visage, les transitions et le son ; consigner ce qui a réellement été contrôlé.
8. Mettre à jour `ITERATIONS.md` après chaque version et le document maître pour les décisions durables. Ne pas publier les vidéos sur un réseau social ou ajouter des services payants sans instruction correspondante.

L'objectif est une progression mesurable vers la référence et la marque LUMA, pas une nouvelle proposition générique à chaque tour. Le dossier contient le projet exécutable ; les skills du Student Kit ne sont pas automatiquement installés par cette archive. Leur provenance est indiquée dans `REPRISE_TECHNIQUE.md`.

---

## Note propre à ce dépôt (LUMA-WHATSAP)

- Ici, les skills du Student Kit **sont** installés : `hyperframes-student-kit/.claude/skills/` (14 skills), dépendances via `npm ci` à la racine du kit, rendu avec `npx hyperframes render` depuis ce dossier.
- Les fichiers du projet exécutable (`build.mjs`, `motion.js`, `assets/plan.json`, `renders/v001_reference.mp4`, `references/`, polices) ne sont pas encore déposés ; voir `references/README.md`. Tant qu'ils manquent, aucune itération v002 ne peut être comparée à v001.
- **Skill à charger pour tout montage : `luma-montage`** (`hyperframes-student-kit/.claude/skills/luma-montage/SKILL.md`), style validé par Robin le 24/09/2026 (`luma-outils-ia` v002).
- Avant tout nouveau montage : lire `LUMA_Bibliotheque_Marque.md` et ouvrir les 4 planches `references/LUMA_Bibliotheque_0*.png`. Les films v001 de septembre 2026 (`luma-audit-ia`, `luma-audit-gratuit`, `luma-agent-whatsapp`) datent d'avant cette bibliothèque ; leurs écarts sont listés au §8 et ne se corrigent que sur demande de Robin.
- Polices de la charte disponibles ici : `assets/fonts/` (Barlow Condensed 700/800, Caveat 400–700, `fonts.css` à coller dans `build.mjs`). Les copier dans `<projet>/assets/fonts/` à côté d'Inter pour chaque nouveau film.
- Les séquences iPhone en HDR (HLG/BT.2020) doivent être converties en SDR BT.709 avant le rendu, sinon HyperFrames bascule en pipeline « HDR layered » et perd les calques superposés à la vidéo (constaté sur `harmonie-reel`, voir son `VERIFY.md`).
