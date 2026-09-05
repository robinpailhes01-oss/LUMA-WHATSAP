# Luma Leads — Design Spec

Outil interne de prospection pour Robin (Luma, Montpellier). Un seul utilisateur.
Skill appliqué : `/premium-web-design`. Ce fichier est écrit AVANT le premier composant ;
toute décision d'interface doit pouvoir être tracée jusqu'à une ligne ci-dessous.

## Étape 0 — Intake

- **Pain** : Robin doit appeler 20 à 40 PME par jour et perd du temps à chercher *qui* appeler, *quand* rappeler, et *ce qui a été dit* la dernière fois.
- **Person** : Robin lui-même, en session de cold call, souvent depuis son téléphone. Zéro tolérance pour la friction : chaque info doit être lisible en une seconde, chaque action en deux clics.
- **Promise** : "À tout moment, l'app me dit qui appeler maintenant, et je logge le résultat sans quitter l'écran."
- **Preuve réelle** : aucune à afficher (outil interne, pas une page de vente). Les seuls chiffres affichés sont les données de Robin (compteurs de la vue Aujourd'hui). Aucun chiffre inventé, aucun placeholder de démo.
- **Références** (registre "produit", pas "marketing") : Linear (discipline typographique, densité calme, nav latérale effacée) · Attio (tables CRM éditables inline, pastilles de statut texte+couleur) · à ne PAS copier : le look "SaaS gris-bleu Tailwind par défaut" (cartes arrondies + ombres douces partout, accent bleu réflexe).
- **Asset tier** : C (aucune image). Layout entièrement porté par la typographie et les données. Aucune illustration, aucune photo, aucune icône décorative.

## Étape 1 — Type de projet

**Dashboard / admin** (mode produit, dense). Conséquences :
- La densité d'information est le problème de design. Hiérarchie par taille, graisse et espacement AVANT toute couleur.
- Nav latérale visuellement silencieuse : c'est de l'infrastructure, pas la vedette.
- Motion réservée aux transitions d'état (chargement → données, changement de statut, ouverture du panneau). Zéro motion décorative, zéro scroll reveal.
- Les données gagnent tout conflit contre l'esthétique.

## Étape 2 — Brief stratégique

- **UVP** : Luma Leads aide Robin à convertir des PME montpelliéraines en RDV d'audit en lui montrant, à chaque instant, le prochain appel à passer et l'historique en une seconde.
- **Piliers** : (1) *Qui appeler maintenant* — la priorité est toujours visible. (2) *Deux clics max* — statut, appel, relance sans navigation. (3) *Mémoire fiable* — rien n'est perdu, tout passe par Supabase. (4) *Une main* — utilisable au téléphone pendant une session d'appels.
- **Archétype** : Ruler + Sage. Ruler → navy dominant, structure stricte, or utilisé comme insigne rare. Sage → serif éditorial pour les titres, mono pour les données, calme partout.
- **Contre** : le CRM-gadget (badges multicolores, graphiques partout, gamification) et le template admin (cartes ombrées empilées, accent bleu/violet réflexe).

| Entrée stratégique | → Décision de design |
|---|---|
| Pilier "qui appeler maintenant" | → L'élément signature est la colonne *prochaine action* avec compte à rebours relatif ; la vue Aujourd'hui est la page d'accueil |
| Pilier "deux clics max" | → Édition inline du statut dans la table ; panneau latéral fiche lead ; formulaire "Logger un appel" toujours visible dans la fiche |
| Pilier "une main" | → Passe mobile dédiée : table → cartes, boutons ≥ 44px, actions primaires en bas de carte |
| Contre "CRM-gadget" | → Statuts en pastille texte + couleur désaturée, jamais la couleur seule ; aucun graphique en Phase 1 |
| Contre "template admin" | → Pas d'ombres, bordures seules ; radius plafonné à 8px ; sidebar sans fond contrasté |
| Archétype Ruler + Sage | → Cormorant Garamond titres de page uniquement, Inter corps, JetBrains Mono données ; or réservé au score élevé et à l'action primaire |

## Étape 3 — Direction esthétique

**"La discipline typographique de Linear + le registre papeterie navy/or d'un carnet de commandes."**
Un registre de *registre* justement : le dashboard doit ressembler à un bon carnet de suivi tenu proprement — surface crème, encre navy, une seule dorure là où ça compte. Pas de gradient, pas de glassmorphism, pas d'icônes en tête de chaque ligne. Les tableaux sont des tableaux (lignes fines, alignement strict), les chiffres sont en mono.

Bloqués explicitement : hero centré, grille de cartes 3 colonnes avec icônes, ombres portées douces, accent bleu/violet sur gris ardoise, dark mode (hors périmètre), graphiques décoratifs.

## Étape 4 — Tokens

### Couleur (noms sémantiques, aucun hex dans les composants)

| Token | Valeur | Rôle |
|---|---|---|
| `navy` | `#1B3A5C` | Dominante : titres, texte fort, boutons secondaires, sidebar active |
| `navy-deep` | `#16304C` | Hover des surfaces navy |
| `navy-tint` | `#E4EAF1` | Fond des pastilles navy, ligne sélectionnée |
| `gold` | `#C9A84C` | Accent rare : score ≥ 70, action primaire uniquement |
| `gold-deep` | `#8F7330` | Texte sur fond gold-tint (contraste) |
| `gold-tint` | `#F5EBCF` | Fond de la pastille score élevé |
| `cream` | `#F5F0E8` | Surface de page |
| `paper` | `#FFFFFF` | Surface levée : table, panneau, cartes |
| `ink` | `#0F1B2D` | Texte principal |
| `ink-muted` | `#5B6675` | Texte secondaire, libellés |
| `line` | `#E3DDD2` | Bordures, séparateurs |
| `danger` | `#B4443E` | Erreurs, "en retard", suppression |

Statuts (pastille = texte + fond désaturé, jamais couleur seule) :

| Statut | Fond | Texte |
|---|---|---|
| nouveau | `#EEEBE5` | `ink-muted` |
| a_appeler | `navy-tint` | `navy` |
| appele_sans_reponse | `#F1E7D3` | `#7A5A1E` |
| a_rappeler | `#F1E7D3` | `#7A5A1E` |
| rdv_pris | `#DCEBE2` | `#1F5A3C` |
| audit_envoye | `#DCE8EA` | `#1F5058` |
| client | `#DCEBE2` | `#1F5A3C` |
| perdu | `#F0DEDC` | `#8A2E29` |
| hors_cible | `#EEEBE5` | `ink-muted` (texte barré) |

Score (pastille, jamais un chiffre nu) : 0–39 → fond `#EEEBE5` texte `ink-muted` · 40–69 → `navy-tint` / `navy` · 70–100 → `gold-tint` / `gold-deep` avec point `gold`.

### Typographie

- **Display** : Cormorant Garamond 500/600 — titres de page uniquement (`h1`), 31–39px. Jamais dans la table, jamais sur un bouton.
- **Corps** : Inter 400/500/600 — tout le reste. 14px par défaut dans les tables (densité), 16px dans les formulaires.
- **Données / mono** : JetBrains Mono 400/500 — téléphones, scores, dates, compte à rebours, compteurs, codes postaux. `font-variant-numeric: tabular-nums`.
- Échelle (tierce majeure 1,25) : `12 / 14 / 16 / 20 / 25 / 31 / 39` px. Rien au-dessus de 39 sur un dashboard.

### Espacement et grille

- Base 8px ; échelle `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64` (le 4 et le 12 uniquement pour l'intérieur des pastilles et cellules).
- Grille 12 colonnes desktop, gouttière 24px. Contenu max 1440px. Sidebar 224px fixe ≥ 1024px, masquée sous.
- Hauteur de ligne de table : 44px (= tap target mobile, cohérent partout).

### Radius, élévation, motion

- **Radius** : 4px champs et boutons, 6px cellules éditables, **8px plafond** (panneaux, cartes). Pastilles : `9999px`. Pas de mélange.
- **Élévation** : aucune ombre par défaut, bordures `line` seules. Une seule ombre `elevated` pour ce qui flotte (panneau latéral, menus) : `0 8px 24px -8px rgb(15 27 45 / 0.18)`.
- **Motion** (`motion/react`) : `120ms` micro-feedback (hover, pastille qui change) · `240ms` transitions standard (panneau, menu, ligne qui apparaît) · `400ms` skeleton → données. Easing unique : `cubic-bezier(0.16, 1, 0.3, 1)`. `prefers-reduced-motion` : durées à 0, aucun déplacement.

## Étape 5 — Layout (dashboard)

- Sidebar gauche silencieuse : fond `cream`, libellés `ink-muted`, entrée active en `navy` avec barre 2px, pas de fond de couleur pleine.
- Contenu sur `paper` bordé de `line`, titre de page en display à gauche, action primaire (gold) à droite — une seule par page.
- Table : en-têtes 12px uppercase `ink-muted` letter-spacing 0.04em, lignes 44px, alternance de fond nulle (séparateurs seuls), ligne hover `cream`.
- Fiche lead : deux colonnes ≥ 1024px (champs 7/12, timeline + logger 5/12) ; une colonne sous.
- Vue Aujourd'hui : 3 chiffres en mono 31px sur une ligne, puis liste ; chaque ligne porte ses 3 actions (appeler / logger / demain).

## Étape 6 — Motion (système)

1. Chargement de page : structure immédiate (sidebar, titre), skeleton des lignes, puis fondu 400ms vers les données. Pas de stagger sur les tables (lisibilité).
2. Scroll reveals : **aucun**.
3. Micro-interactions : changement de statut → la pastille cross-fade 120ms ; bouton primaire `scale 0.98` au tap.
4. Transitions d'état : panneau latéral glisse de 24px + fondu 240ms ; ligne "reportée à demain" sort de la liste en 240ms (layout animation).

## Étape 7 — Passe mobile (390px)

- Table → liste de cartes : nom (600) + ville, pastilles statut/score sur une ligne, prochaine action en mono, rangée de boutons ≥ 44px (Appeler · Fiche).
- Aujourd'hui : compteurs empilés 3 colonnes compactes, liste de cartes, boutons pleine largeur en bas de carte, utilisable au pouce.
- Sidebar → barre de navigation basse 3 entrées (Aujourd'hui · Leads · Import), 56px, `100dvh` pour les panneaux.
- Panneau latéral → plein écran.

## Élément signature (un seul)

**La pastille de score + la colonne "prochaine action" avec compte à rebours relatif** ("dans 2 h", "en retard de 1 j", "demain 09:00"). C'est le seul endroit où l'or apparaît dans les données (score ≥ 70) et le seul endroit où `danger` apparaît hors erreur (retard). Tout le reste reste quiet.

## Étape 8 — Vérification (bloquante)

Chaque page est déclarée terminée seulement après : screenshot 1440px + 390px, vérification débordement horizontal, contraste, états chargement/vide/erreur rendus, puis passage de la checklist anti-slop du skill (display ≠ Inter, pas de grille de cartes-icônes, pas d'ombres réflexes, un seul élément signature, focus clavier visible, reduced-motion correct).
