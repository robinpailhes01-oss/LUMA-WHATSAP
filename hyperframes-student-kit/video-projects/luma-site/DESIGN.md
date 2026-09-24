# luma-site — DESIGN (v001)

**Objectif** : vidéo paysage haute qualité pour la page du site LUMA, suivie (sur la page) des captures d'écran et du formulaire
d'audit gratuit. Le film pointe donc **vers le bas de la page** (« juste en dessous »), jamais vers un commentaire.

**Format** : 1920 × 1080, 30 i/s, 129.5 s. Onze rushes paysage (iPhone, HLG décodé directement, sans tone-mapping), même décor
bateau / mer / lumière dorée. Voix réelle, gain statique +7.4 dB (−21.5 LUFS, pic −1.5 dBTP), aucun mot retiré. Pas de musique.

## Style (skill `luma-montage`, validé sur luma-outils-ia v002)
- Pas de logo pendant le film ; logo sur l'écran de fin seulement.
- Sous-titres Inter 800 italique 48 px, blancs, ombre sombre, mot actif et mots clés en `#8FBBFF`, groupes ≤ 26 caractères,
  bascule instantanée, y 930 (sous le menton dans tous les cadrages).
- Kickers en capitales espacées + titres Barlow Condensed 800 posés sur la vidéo (ombre), mot clé `#8FBBFF` uni ; voile dégradé
  sombre sur les 460 px du haut (ciel clair). Pas de gros carrés de couleur : cartes en verre clair, pilules courtes, chiffres en texte dégradé.
- Captures réelles dans un téléphone (bord bleu nuit, coins 42 px) ou une carte blanche, sélections à poignées `.selbox`.
- **Rien sur la tête** : visage mesuré sur grille (x 660–1080, y 60–740 à l'échelle 1 ; en 16:9 la tête touche presque le bord haut).
  Les titres vivent dans la colonne libre opposée au visage, jamais au-dessus.

## Cadrages (origine 0 0)
| Nom | Transform | Visage à l'écran | Zone libre |
| --- | --- | --- | --- |
| FULL | 0, 0, ×1 | x 660–1080, y 60–740 | droite x 1180–1880 |
| FACE_LEFT | −384, −20, ×1.2 | x 408–912, y 52–868 | droite x 960–1880 |
| FACE_RIGHT | 0, −20, ×1.2 | x 792–1296, y 52–868 | gauche x 40–740 |
| PUSH | −96, −10, ×1.1 | x 630–1092, y 56–804 | droite x 1150–1880 |

## Storyboard (trois états : visage / incrustation / page)
| Scène | Temps | Rush | Cadrage | État | Éléments |
| --- | --- | --- | --- | --- | --- |
| s01 Accroche | 0–9.7 | 0338 | FULL | incrustation | kicker « Chef d'entreprise », titre « Demandes clients », sous-titre, 3 notifications WhatsApp (illustration, textes fictifs) sur « interrompu… n'importe quel moment » |
| s02 Problème | 9.7–27.0 | 0340 · 0341 · 0342 | FACE_LEFT | incrustation | « Un manque de clients » barré, pilules Temps / Disponibilité ; carte verre « Rapidité de réponse » barre + « N°1 » ; Prospect → Concurrence, Caveat « sans même le savoir… » |
| s03 Histoire | 27.0–42.3 | 0348 | FACE_RIGHT | incrustation | « 3 ans » dégradé, pilule ⚓ location de yachts, lignes ✗ Embaucher / ✗ Chatbot |
| s04 Solution | 42.3–62.0 | 0351 | FACE_LEFT | incrustation | kicker « Il y a 2 ans · la solution », titre « Mon agent WhatsApp », téléphone (conversation tarifs anonymisée, sélection « lundi 14 est libre »), pilules Autonome / Parle comme moi / Connaît mes règles / Connecté à mes outils, tuiles Calendar · HubSpot · météo, « Même la météo ! » |
| s05 Objection → **page** | 62.0–78.1 | 0352 | FULL → PAGE | visage puis page | pilules « Peur de déléguer à l'IA ? » / « Perdre la relation client ? » ; à « juste en dessous » (71.3 s) **page plein écran** : titre « Mon agent parle à mes clients », 3 téléphones (Stéph / repas / tarifs, noms masqués), « juste en dessous ↓ », sélection de la réponse de l'agent ; retour au visage à 78.07 s |
| s06 Résultats | 78.1–97.5 | 0356 · 0357 | FACE_RIGHT | incrustation | titre « Les résultats », lignes verre Temps gagné / Réponses très rapides / Plus de clients, pilules Charge mentale / Expérience client / Satisfaction client |
| s07 Preuve | 97.5–105.2 | 0358 | PUSH | incrustation | « 2 ans » dégradé + « sans presque toucher WhatsApp », carte réelle Résultats (sélections 1 851 messages puis 217 demandes) |
| s08 CTA | 105.2–126.5 | 0361 | FACE_LEFT | incrustation | kicker « Et toi ? », titre « Épuisé de répondre ? », pilules Déléguer / sans que ça coûte une fortune, carte « Audit gratuit · 0 € » + coches, Caveat « juste en dessous » avec flèche vers le bas |
| s09 Fin | 126.5–129.5 | — | END | carte | logo, « Ton audit gratuit est juste en dessous », bouton « Demander mon audit gratuit ↓ » |

## Preuves réelles et anonymisation
- `wa-steph.png`, `wa-repas.png`, `wa-tarifs.png` : conversations WhatsApp de l'agent (en-tête avec nom du contact, avis système
  et barre de saisie supprimés par recadrage). `resa.png` : liste de réservations, noms de clients et montants floutés (préparée,
  non utilisée en v001). `resultats.png` : compteurs 217 demandes / 1 851 messages, utilisée telle quelle.
- Les trois notifications de l'accroche sont des illustrations LUMA (textes fictifs), signalées ici comme telles.

## SFX
pop / tick / whoosh / swell synthétisés (0.10–0.15), attribution automatique des pistes 6/9/10, 7/11, 8. Aucune musique (non demandée).
