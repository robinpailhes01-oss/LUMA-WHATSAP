# luma-audit-ia — Carnet d'itérations

Film LUMA « Audit IA » (source IMG_0241.mov). Règles : `../luma-film/LUMA_References_Video.md` et
`../luma-film/CLAUDE.md`. Convention : `renders/v00N_<objectif>.mp4`, rendus précédents conservés.

## v001 — luma-audit-ia (22/09/2026)

- Rendu : `renders/v001_luma-audit-ia.mp4` — 17.0 s, 1920 × 1080, 30 i/s, sha256 `1409fc53…`.
- Demande de Robin (verbatim) : « À présent, avec toutes les compétences que tu as, refais la vidéo avec celle-ci. »
  Interprétée comme : refaire le film de IMG_0241 sous la direction LUMA déposée juste avant (paysage, Inter,
  palette LUMA, verre translucide, mot actif bleu, vignette + signature, voix réelle).
- Mise en œuvre : voir `DESIGN.md` (séquences) et `VERIFY.md` (contrôles).
- Draft 1 → v001 : verre clair remplacé par un verre teinté bleu nuit (titres blancs illisibles sur le ciel) ;
  étiquette « VOTRE ENTREPRISE » décalée sous le kicker.
- Statut : **livré, en attente du retour de Robin**. Rien n'est validé.

| # | Point | Statut |
|---|---|---|
| 1 | Direction LUMA appliquée (couleurs, Inter, verre, sous-titres bleus, signature) | mise en œuvre — à valider |
| 2 | Voix réelle, gain statique seulement | mise en œuvre — conforme à la consigne explicite |
| 3 | Paysage 16:9 | mise en œuvre — conforme à la consigne explicite du film précédent, à confirmer pour celui-ci |
| 4 | Mini-interfaces illustratives (pas de capture réelle fournie) | à remplacer par des captures authentiques si fournies |
| 5 | Musique / SFX | absents — itération dédiée |

## v002 — à définir

Objectif principal :
Modifications observables (3 max) :

| # | Demande (temps) | Résultat souhaité | Mise en œuvre | Statut |
|---|---|---|---|---|
| 1 | | | | demandée |
| 2 | | | | |
| 3 | | | | |

Contrôles effectués :
Limites :

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

## Note (22/09/2026, après v001)

La bibliothèque de marque LUMA (`../luma-film/LUMA_Bibliotheque_Marque.md`, 4 planches de Robin) a été déposée après ce rendu.
Une v002 l'appliquera par défaut : palette officielle (#0B0F2D / #3B82F6 / #7C3AED), hook Barlow Condensed ExtraBold,
annotations Caveat, bouton CTA « Découvrir Luma → », end card bleu nuit + glow. Voir §8 du document pour les écarts.
