# ENTERTAINMENT-REVIEW — harmonie-reel

Modalité de revue : cette session n'a pas de lecture vidéo temps réel ni d'écoute.
Revue faite sur planches de contact chronologiques (21 images, 0–15.1 s), bandes
d'images contiguës aux transitions, et analyse de signal audio (loudness, alignement
des SFX sur la timeline). Ce n'est pas un visionnage perceptif ininterrompu : limite
déclarée.

## Draft 1 (renders/draft-1.mp4, séquence HLG d'origine)

| t | Constat | Décision |
|---|---|---|
| 0–15.2 | **Bloquant** : kicker, sous-titres, carte en mode héros et chute finale absents — tout ce qui se superpose à la vidéo disparaît. Cause : la séquence iPhone est HLG/BT.2020 ; HyperFrames bascule en pipeline « HDR layered » et composite la vidéo au-dessus du DOM. | Conversion de la séquence en SDR BT.709 (zscale + tonemap hable), re-rendu (draft 2). |
| 0.9–2.3 | Les trois cases « ? » en pointillés sont visibles sur la chemise : l'objet planté fonctionne, même sans la carte. | Garder. |
| 2.3–2.7 | Le zoom arrière et la montée du panneau se lisent comme un seul mouvement ; la carte reçoit son support. | Garder. |
| 3.6–5.3 | Remplissage des cases sur « tout / capable / faire » : rafale lisible, trois états différents. | Garder. |
| 7.7–8.9 | Contour pointillé + étiquette DEMAIN : l'anticipation est visible avant « grandit ». | Garder. |
| 10.1–10.6 | La carte remplit le contour : impact net, une seule chose bouge. | Garder. |
| 12.6–13.9 | Les puces grossissent puis la 2e rangée apparaît : la résolution muette « l'IA a grandi avec » se lit. | Garder. |
| 14.4–15.1 | Sans la chute textuelle (bug ci-dessus), la fin n'est qu'un sourire silencieux. | Vérifier la chute sur draft 2. |

Séquences adjacentes sans les titres : carte vide → puces → contour → carte
agrandie → double rangée. Cinq silhouettes différentes, aucun « même carton avec
d'autres mots ».

Charge de lecture : les sous-titres portent les mots exacts ; les graphiques ne
répètent la parole qu'une fois (« VOTRE ENTREPRISE » sur le mot « entreprise »,
« DEMAIN » sur « l'avenir », chute finale sur les mots du locuteur). Pas de triple
restitution.

## Draft 2 (SDR) et final-v1

| t | Constat | Décision |
|---|---|---|
| 0.0 | Visage plein cadre, mais l'image 0 est un clignement (yeux fermés 0–0.2 s). Le kicker (0.15) et le sous-titre (0.0) arrivent pendant le clignement. | Gardé (couper ailleurs casse « Le » ou inclut « vraiment ») ; vignette à choisir sur la plateforme. Noté dans VERIFY.md. |
| 0.55–2.3 | Carte + 3 « ? » posées sur la chemise, lisibles. La question « que remplirait l'IA ? » est posée sans texte inventé. | Garder. |
| 2.3–2.85 | Zoom arrière + panneau : un seul mouvement, la carte ne bouge presque pas (continuité d'objet). | Garder. |
| 3.34–5.1 | Trois remplissages en 1.7 s : rafale. Puis 5.66 soulignement : respiration. | Garder. |
| 6.3–7.4 | 1.1 s sans nouvel événement graphique (« et même se ») : le visage porte la conviction, sous-titre seul. | Garder, volontaire. |
| 7.44–10.2 | Contour → DEMAIN → croissance : anticipation puis impact ; c'est le moment le plus fort et il tombe sur « grandit ». | Garder. |
| 10.7–12.3 | 1.6 s de tenue (carte agrandie) pendant « comment est-ce que l'IA va pouvoir » : l'attente est la question posée par la parole. | Garder. |
| 12.3–13.7 | Puces qui grossissent puis 3 nouvelles : résolution en deux temps. | Garder. |
| 13.95–15.2 | Chute serif « L'IA grandit avec vous. » sur le sourire : fermeture calme, pas de nouvelle énergie. | Garder. |

Point faible restant : le bandeau marine occupe 40 % du cadre en mode scène ; sur un fil très
rapide il pourrait sembler statique entre 6.3 et 7.4 s. Compensé par la respiration de la lueur
et le push-in lent sur le visage ; à revoir avec des données de rétention réelles.

Modalité : planches de contact, bandes contiguës, mesures audio. Pas de visionnage temps réel
ni d'écoute dans cette session.
