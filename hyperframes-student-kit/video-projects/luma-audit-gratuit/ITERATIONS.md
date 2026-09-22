# luma-audit-gratuit — Carnet d'itérations

Film LUMA « comment je travaille avec mes clients » (IMG_0240.MOV). Règles : `../luma-film/LUMA_References_Video.md`
et `../luma-film/CLAUDE.md`. Convention : `renders/v00N_<objectif>.mp4`, rendus précédents conservés.

## Avant v001 — analyse et décisions (22/09/2026)

- Analyse du rush sans montage : `../../raw-media/IMG_0240.ANALYSE.md` (extrait non autonome, HDR, son propre).
- Éléments fournis par Robin : logo + mascotte (`../luma-film/references/LUMA_Logo_Mascotte.png`), effets sonores
  légers autorisés à l'apparition des éléments, format paysage.
- Plan proposé avec trois défauts, validé par « Go » :
  1. fin en suspens gardée (« premièrement… gagner du temps ») + écran de fin LUMA, film = épisode 1 ;
  2. aucune hésitation coupée ;
  3. écran de fin = logo fourni tel quel (mascotte + « AGENTS IA POUR LES ENTREPRISES »), pas la phrase de la charte.

## v001 — luma-audit-gratuit (22/09/2026)

- Rendu : `renders/v001_luma-audit-gratuit.mp4` — 29.0 s, 1920 × 1080, 30 i/s sha256 `97e87bf8…`.
- Mise en œuvre : `DESIGN.md` (séquences, caméra, SFX) ; contrôles : `VERIFY.md`.
- Draft 1 → v001 : carte « Audit » raccourcie (vide sous la puce), panneaux remontés, carte « 1 » descendue
  (elle passait sous la carte logo), volumes SFX -25 % (pic du mix -0.7 → sous -1 dBFS), image de l'écran de fin
  dédoublée pour le lint.
- Statut : **livré, en attente du retour de Robin**.

| # | Point | Statut |
|---|---|---|
| 1 | Ouverture coupée à « J'aimerais juste finir sur… » | mise en œuvre — défaut validé par « Go » |
| 2 | Logo/mascotte sur cartes blanches (pas de détourage) | mise en œuvre — à valider visuellement |
| 3 | SFX légers (pop, tick, whoosh, swell synthétisés) | mise en œuvre — à valider à l'oreille |
| 4 | Hésitations conservées | conforme à la règle — coupes possibles listées dans `assets/edit-decisions.json` |
| 5 | Musique | absente — non décidée |
| 6 | Suite « deuxièmement » / enchaînement avec IMG_0241 | ouvert — décision de Robin |

## v002 — à définir

Objectif principal :
Modifications observables (3 max) :

| # | Demande (temps) | Résultat souhaité | Mise en œuvre | Statut |
|---|---|---|---|---|
| 1 | | | | demandée |

### Fiche de retour

```
Version regardée : v001
Ce que je veux garder :
À changer à [00:00–00:00] :
Résultat souhaité :
Référence et passage à rapprocher :
Priorité : indispensable / amélioration / test
Après livraison : validé / à reprendre / à comparer
```
