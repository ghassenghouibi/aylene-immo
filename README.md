# Aylene — site web (React)

Front React (Vite + TypeScript + React Router) pour **Aylene**, agence immobilière indépendante du Grand Tunis.
Site de démonstration : **toutes les annonces sont fictives** (`src/data/listings.ts`), les photos sont des visuels libres de droits (Unsplash) chargés à la volée avec un fond de repli si elles ne chargent pas.

## Lancer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # sortie dans dist/
npm run preview  # prévisualiser le build
```

## Le positionnement Aylene

Là où un site d'agence classique mise sur le volume d'annonces et la vidéo, Aylene mise sur **la confiance et l'accompagnement** :

| Valeur ajoutée | Où la voir | Code |
| --- | --- | --- |
| **Dossier de confiance** — six pièces vérifiées avant publication (titre, plan, hypothèque, copropriété, taxes, conformité), avec un niveau *complet / avancé / en cours* | Badge sur chaque carte, checklist détaillée sur la fiche, filtre « Dossier complet » | `src/lib/trust.ts`, `src/components/Trust.tsx` |
| **Prix juste** — prix/m² du bien comparé à la médiane du quartier | Indicateur sur chaque carte, bloc « Le prix, expliqué » sur la fiche, tri « Meilleur prix au m² vs quartier » | `priceIndex()` dans `src/lib/listings.ts` |
| **À proximité** — commerces, écoles, transports, santé, loisirs et services autour du bien, avec distance et temps à pied, et un **score de vie quotidienne** /100 | Section « À proximité » sur la fiche, lieu le plus proche sur chaque carte, filtre « Tout à pied » et tri « Proximité des commodités » | `src/data/lieux.ts`, `src/lib/proximity.ts`, `src/components/Proximity.tsx` |
| **Baromètre des quartiers** — médianes vente / loyer, tendance 12 mois, délai de vente | `/quartiers`, cartes quartiers de l'accueil | `src/data/zones.ts` |
| **Estimation en ligne en 2 minutes** — fourchette calculée à partir des médianes et de coefficients (état, étage, prestations, terrain) | `/estimer`, mini-estimateur sur l'accueil | `src/lib/estimate.ts` |
| **Simulateur de financement** — mensualité, intérêts, revenu conseillé, frais d'acquisition | Colonne latérale de chaque fiche à la vente | `src/lib/finance.ts`, `src/components/Mortgage.tsx` |
| **Un seul conseiller** — attribué par quartier, affiché sur la fiche avec téléphone / WhatsApp | Fiche du bien, `/contact`, `/accompagnement` | `src/data/agence.ts` (`advisorFor`) |
| **Recherche sur-mesure** — formulaire de projet pour les biens hors-marché | `/recherche-sur-mesure`, bandeau bleu sur toutes les pages | `src/pages/SurMesure.tsx` |
| **Parcours accompagné** en 5 étapes + comparatif « Aylene vs agence classique » | `/accompagnement` | `src/components/Blocks.tsx` (`STEPS`) |

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Accueil : hero + bien mis en avant, recherche, 3 promesses, sélection (vente / location), chiffres, parcours, mini-estimateur, quartiers, témoignages, CTA sur-mesure |
| `/acheter`, `/louer` | Listes filtrables (quartier, type, budget, chambres, surface, dossier complet, exclusivités, « tout à pied »), tri, vue grille / carte, pagination |
| `/favoris` | Favoris (localStorage) |
| `/bien/:id` | Fiche : galerie + lightbox, chiffres clés, prix expliqué, description, détails, checklist du dossier, **à proximité**, carte, conseiller + formulaire, simulateur de financement, comparables |
| `/estimer` | Estimateur en ligne + demande de visite d'estimation |
| `/quartiers` | Baromètre des quartiers, triable |
| `/accompagnement` | Méthode, parcours en 5 étapes, dossier de confiance, comparatif, équipe |
| `/recherche-sur-mesure` | Formulaire de projet hors-marché |
| `/contact` | Coordonnées, carte, conseillers, formulaire |

## Modifier les données

- **Annonces** : `src/data/listings.ts` — un objet par bien. Le champ `dossier` liste les pièces déjà vérifiées (`titre`, `plan`, `hypotheque`, `copro`, `taxes`, `conformite`) ; c'est lui qui pilote le badge et la checklist.
- **Lieux à proximité** : `src/data/lieux.ts` — les lieux communs à tout un quartier (distance à pied en mètres). Un bien peut en ajouter, ou rapprocher les siens, via son champ `proximite` dans `listings.ts` : à libellé identique, l'entrée du bien remplace celle du quartier. Le score de vie quotidienne est recalculé automatiquement (`src/lib/proximity.ts` : vitesse de marche, seuils de distance et poids par catégorie).
- **Quartiers et médianes** : `src/data/zones.ts` — `venteM2`, `loyerM2`, `tendance`, `delai`. Ces valeurs alimentent l'indice prix, le baromètre et l'estimateur.
- **Agence, conseillers, témoignages** : `src/data/agence.ts`.
- **Taux de crédit par défaut** : `DEFAULT_RATE` dans `src/lib/finance.ts`. **Coefficients de l'estimateur** : `src/lib/estimate.ts`.

Les formulaires (contact, visite, estimation, sur-mesure) affichent une confirmation locale ; aucun envoi réel n'est branché.

## Logo & charte

- Logo : `logo.jpg` à la racine, recadré dans `src/assets/logo.jpg` (en-tête, pied de page) et `public/logo.jpg` (favicon).
- Charte dans `src/index.css` : bleu ardoise tiré du logo (`--blue #5b7391`, `--blue-ink #24344a`), sable (`--sand #c9a97c`), sauge pour les validations. Titres en Bodoni Moda (proche du serif du logo), texte en Manrope, coins arrondis (`--radius: 18px`), boutons en pilule.
- Animations d'apparition au scroll (`.reveal`, hook `useRevealAll`) et compteurs, désactivés avec « réduire les animations ».
