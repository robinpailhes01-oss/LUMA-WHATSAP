# harmonie-reel — DESIGN

Reel 9:16 (1080x1920, 30 fps, 15.2 s) built from `assets/raw.mov` (iPhone, face
caméra sur un bateau, 17.3 s, parole en français). Skill : `short-form-edit`
(+ `hyperframes`, `gsap`, `cut-silences`, `video-storytelling`).

## Audience et promesse

- Audience : dirigeants de TPE/PME qui se demandent ce que l'IA peut concrètement
  faire chez eux.
- Ce que le spectateur reçoit à la fin (parole exacte) : l'audit IA montre tout ce
  que l'IA peut faire dans l'entreprise **et** comment elle grandit avec elle.
- Format livré : 1080x1920 uniquement (pas de 16:9 demandé).

## Parole retenue (EDL)

Source 2.0667 s → 17.2667 s, une seule plage, aucune coupe interne.
Retiré : « Et ensuite moi vraiment » (reprise en cours de phrase, 0–2.07 s).
Gardé : la pause « à … l'avenir » (accent naturel) et 1.27 s de sourire silencieux
après « avec vous » pour la chute.

> Le but de l'audit c'est de pouvoir vous montrer vraiment tout ce que l'IA est
> capable de faire dans votre entreprise, et même se projeter à l'avenir : si
> jamais votre entreprise grandit, comment est-ce que l'IA va pouvoir grandir
> également avec vous.

## Trois ouvertures comparées (0–3 s)

Les trois utilisent la même parole. Comparées sur maquette statique + timeline
(pas de rendu vidéo séparé pour chaque variante — limite déclarée).

| # | Concept | Bénéfice / question | Preuve visible à 3 s | Verdict |
|---|---|---|---|---|
| A | **Reconnaissance d'abord** : gros plan visage sur la mer, kicker « AUDIT IA », une carte « VOTRE ENTREPRISE » vide avec 3 emplacements en pointillés plantée sur la chemise à 0.55 s | « Qu'est-ce que l'IA remplirait chez moi ? » | Le zoom arrière à 2.3 s révèle la scène et la carte reçoit son support ; la 1re case se remplit à 3.34 s | **Choisi** : le sujet (audit IA) est clair muet, l'objet incomplet crée une attente honnête, aucun effet ne retarde la 1re phrase |
| B | **Problème d'abord** : écran sombre 0.8 s « Vous ne savez pas ce que l'IA peut faire chez vous ? » puis visage | Même question, formulée | Rien avant 0.8 s ; le visage arrive après un carton | Rejeté : ajoute un carton texte non prononcé, retarde la parole, restitue la question en triple (carton + parole + sous-titre) |
| C | **Aperçu du résultat** : commencer sur la carte déjà agrandie avec 6 puces IA, puis rewind vers la carte vide | Curiosité « comment on arrive là ? » | Résultat vu à 0 s | Rejeté : ferme la boucle avant de l'ouvrir ; le rewind est un effet qui n'apporte pas d'information |

Choix A. Gate « raison de rester » : oui, un objet incomplet lié au sujet, dont
la parole promet le remplissage (« vous montrer tout ce que l'IA est capable de
faire ») et dont la 2e transformation (grandir) est la vraie chute.

## Direction visuelle

Registre : fondateur qui parle calmement, en mer, lumière douce. Premium mais
humain, pas « tech ». Le décor (mer, ciel pastel) est la vraie image ; les
graphiques vivent dans un bandeau marine sous la vidéo.

Palette (une seule teinte d'accent, chaque couleur a un sens) :

| Rôle | Hex | Sens |
|---|---|---|
| Fond panneau | `#0c1b2a` | mer de nuit, support |
| Carte entreprise | `#14283b` + bord ivoire 18 % | « votre entreprise » |
| Encre | `#f3eee4` | parole, sous-titres |
| Accent | `#e0b15c` | **l'IA** (ce qui remplit et grandit) |
| Atténué | `#8fa0b3` | étiquettes secondaires |

Typographie :

- **Instrument Serif** italique — une seule ligne, la chute « L'IA grandit avec vous. » (voix de conclusion).
- **Archivo** 800 — sous-titres (voix de la parole) ; **Archivo** 500 espacé — étiquettes (AUDIT IA, VOTRE ENTREPRISE, DEMAIN).
- Serif + sans, poids 500 vs 800, tailles vidéo (sous-titres 52 px, chute 92 px, étiquettes ≥ 24 px). Polices embarquées localement (`assets/fonts/`).

Mise en page (zone sûre : x 90–990, y 200–1600) :

- **HERO** (0–2.4 s) : vidéo échelle 1.45, visage centré, menton ≈ y 915.
- **STAGE** (2.4 s → fin) : vidéo échelle 1.05 en haut (0–1134), panneau marine 1134–1920 avec fondu de raccord.
- Kicker « AUDIT IA » : x 90, y 230 (persistant).
- Sous-titres : pilule marine 82 % sur le col/chemise, y 950–1120, 3–5 mots, mot actif en accent.
- Objet : carte 560x140 (y 1215–1355), rangée de puces y 1420–1490, 2e rangée y 1520–1590. Rien sous y 1600.

Exemples de tâches IA sur les puces (illustratifs, choisis pour une TPE qui
répond à ses clients ; ce ne sont pas des résultats revendiqués) : Réponses 24/7,
Relances, Rendez-vous, Devis, Suivi client, Support.

## Séquences

| Plage | Attente du spectateur | Développement / conséquence | Cible du regard | Rythme |
|---|---|---|---|---|
| 0–2.4 | Qui parle, de quoi ? | Kicker AUDIT IA (0.15), carte vide + 3 cases « ? » plantées (0.55) | visage → carte | pose |
| 2.3–3.0 | Que va-t-il montrer ? | Zoom arrière, le panneau monte rejoindre la carte (whoosh) | carte | 1 mouvement |
| 3.34–5.3 | Que remplit l'IA ? | 3 cases se remplissent sur « tout », « capable », « faire » (pop ×3) | puces | rafale |
| 5.66–6.3 | — | Soulignement or sous VOTRE ENTREPRISE sur « entreprise » | carte | respiration |
| 7.44–9.2 | Se projeter comment ? | Contour pointillé plus grand se trace autour de la carte (« projeter »), étiquette DEMAIN (« l'avenir ») | contour | anticipation |
| 10.2 | « grandit » | La carte grandit et remplit le contour (swell) | carte | impact |
| 12.3–13.7 | Et l'IA ? | Les 3 puces grossissent (« grandir »), 3 nouvelles puces apparaissent (« également / avec / vous ») | puces | rafale → résolution |
| 13.95–15.2 | Fin | Chute serif « L'IA grandit avec vous. » sur le sourire silencieux | texte | tenue |

Vérification muette : carte vide → remplie → agrandie → doublée. Le sens passe
sans le son.

## Son

- Voix : loudnorm I=-16 LUFS, TP -1.5 dB (`assets/voice.wav` → `voice.m4a`), volume 1.0.
- Pas de musique : aucune piste à droits vérifiés disponible dans la session ; l'ambiance mer du micro iPhone reste sous la voix (choix documenté dans VERIFY.md).
- SFX synthétisés au ffmpeg (`assets/sfx/`), volume 0.22–0.3, alignés sur l'atterrissage visuel : whoosh (zoom arrière), pop (chaque puce), tick (contour, chute), swell (croissance).

## What NOT to do

- Pas de logo (aucun asset de marque fourni ; ne rien inventer).
- Pas de chiffres ni de promesses non prononcées.
- Pas de dégradé texte, pas de cyan, pas de carte identique répétée sans changement d'état.
- Ne pas couvrir le visage : sous-titres sous le menton, graphiques dans le panneau.
- Pas de « STOP » ni de flash d'ouverture : la première image est le visage sur la mer.
