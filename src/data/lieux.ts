/**
 * ============================================================
 *  À PROXIMITÉ — COMMERCES, ÉCOLES, TRANSPORTS…  (DONNÉES FICTIVES)
 * ============================================================
 *  Points d'intérêt par quartier, avec la distance à pied en mètres
 *  depuis le centre du quartier. Chaque bien hérite des lieux de son
 *  quartier ; il peut en ajouter (ou en rapprocher) via son champ
 *  `proximite` dans `listings.ts`.
 *
 *  Ces distances alimentent le « score de vie quotidienne » affiché
 *  sur la fiche du bien (voir `src/lib/proximity.ts`).
 */

export type PoiCat = 'commerces' | 'ecoles' | 'transport' | 'sante' | 'loisirs' | 'services'

export interface Poi {
  cat: PoiCat
  label: string
  /** Distance à pied, en mètres */
  m: number
  /** Précision facultative affichée en gris (ligne de bus, niveau scolaire…) */
  note?: string
}

export const CAT_LABEL: Record<PoiCat, string> = {
  commerces: 'Commerces & courses',
  ecoles: 'Écoles & crèches',
  transport: 'Transports',
  sante: 'Santé',
  loisirs: 'Loisirs & nature',
  services: 'Services du quotidien',
}

/** Libellé court, pour les en-têtes de colonne. */
export const CAT_SHORT: Record<PoiCat, string> = {
  commerces: 'Commerces',
  ecoles: 'Écoles',
  transport: 'Transports',
  sante: 'Santé',
  loisirs: 'Loisirs',
  services: 'Services',
}

/** Ordre d'affichage et poids dans le score de vie quotidienne. */
export const CAT_WEIGHT: Record<PoiCat, number> = {
  commerces: 1.3,
  ecoles: 1.1,
  transport: 1.2,
  sante: 0.9,
  loisirs: 0.8,
  services: 0.7,
}

/** Lieux typiques par quartier (noms génériques, données de démonstration). */
export const POIS: Record<string, Poi[]> = {
  'la-marsa': [
    { cat: 'commerces', label: 'Supermarché de quartier', m: 280 },
    { cat: 'commerces', label: 'Marché municipal de La Marsa', m: 700, note: 'primeurs, poissonnerie' },
    { cat: 'commerces', label: 'Boulangerie & épicerie fine', m: 180 },
    { cat: 'commerces', label: 'Centre commercial', m: 1600, note: 'enseignes, restauration' },
    { cat: 'ecoles', label: 'École primaire publique', m: 450 },
    { cat: 'ecoles', label: 'Groupe scolaire international', m: 1200, note: 'maternelle au lycée' },
    { cat: 'ecoles', label: 'Crèche & jardin d\'enfants', m: 350 },
    { cat: 'transport', label: 'Station TGM La Marsa Plage', m: 900, note: 'Tunis en 30 min' },
    { cat: 'transport', label: 'Arrêt de bus', m: 200 },
    { cat: 'transport', label: 'Aéroport Tunis-Carthage', m: 11000 },
    { cat: 'sante', label: 'Pharmacie', m: 220 },
    { cat: 'sante', label: 'Cabinet médical & dentaire', m: 500 },
    { cat: 'sante', label: 'Clinique privée', m: 2400 },
    { cat: 'loisirs', label: 'Plage de La Marsa', m: 850 },
    { cat: 'loisirs', label: 'Corniche & cafés', m: 950 },
    { cat: 'loisirs', label: 'Salle de sport', m: 600 },
    { cat: 'services', label: 'Agence bancaire & distributeur', m: 300 },
    { cat: 'services', label: 'Bureau de poste', m: 750 },
  ],
  gammarth: [
    { cat: 'commerces', label: 'Supérette', m: 600 },
    { cat: 'commerces', label: 'Grande surface', m: 2600 },
    { cat: 'commerces', label: 'Boulangerie', m: 700 },
    { cat: 'ecoles', label: 'École internationale', m: 2200 },
    { cat: 'ecoles', label: 'Crèche bilingue', m: 1500 },
    { cat: 'transport', label: 'Arrêt de bus', m: 550 },
    { cat: 'transport', label: 'Station TGM La Marsa', m: 3800 },
    { cat: 'transport', label: 'Aéroport Tunis-Carthage', m: 13000 },
    { cat: 'sante', label: 'Pharmacie', m: 650 },
    { cat: 'sante', label: 'Clinique privée', m: 3200 },
    { cat: 'loisirs', label: 'Plages de Gammarth', m: 900 },
    { cat: 'loisirs', label: 'Golf', m: 2800, note: '18 trous' },
    { cat: 'loisirs', label: 'Hôtels & restaurants du front de mer', m: 1200 },
    { cat: 'services', label: 'Agence bancaire', m: 1400 },
  ],
  'sidi-bou-said': [
    { cat: 'commerces', label: 'Épicerie du village', m: 150 },
    { cat: 'commerces', label: 'Marché de Carthage', m: 2300 },
    { cat: 'commerces', label: 'Boulangerie & pâtisserie', m: 260 },
    { cat: 'ecoles', label: 'École primaire publique', m: 900 },
    { cat: 'ecoles', label: 'Collège & lycée', m: 2600 },
    { cat: 'transport', label: 'Station TGM Sidi Bou Saïd', m: 550 },
    { cat: 'transport', label: 'Arrêt de bus', m: 400 },
    { cat: 'sante', label: 'Pharmacie', m: 320 },
    { cat: 'sante', label: 'Cabinet médical', m: 1100 },
    { cat: 'loisirs', label: 'Port de plaisance', m: 800 },
    { cat: 'loisirs', label: 'Cafés panoramiques & galeries', m: 200 },
    { cat: 'loisirs', label: 'Plage', m: 1000 },
    { cat: 'services', label: 'Distributeur automatique', m: 300 },
  ],
  carthage: [
    { cat: 'commerces', label: 'Supermarché', m: 750 },
    { cat: 'commerces', label: 'Marché municipal', m: 1100 },
    { cat: 'commerces', label: 'Boulangerie', m: 350 },
    { cat: 'ecoles', label: 'École primaire publique', m: 600 },
    { cat: 'ecoles', label: 'Lycée', m: 1400 },
    { cat: 'ecoles', label: 'Crèche', m: 500 },
    { cat: 'transport', label: 'Station TGM Carthage', m: 650 },
    { cat: 'transport', label: 'Arrêt de bus', m: 250 },
    { cat: 'transport', label: 'Aéroport Tunis-Carthage', m: 6000 },
    { cat: 'sante', label: 'Pharmacie', m: 400 },
    { cat: 'sante', label: 'Clinique', m: 1900 },
    { cat: 'loisirs', label: 'Site archéologique & parc', m: 900 },
    { cat: 'loisirs', label: 'Plage', m: 1300 },
    { cat: 'services', label: 'Agence bancaire & poste', m: 700 },
  ],
  'berges-du-lac': [
    { cat: 'commerces', label: 'Grande surface', m: 500 },
    { cat: 'commerces', label: 'Galerie commerciale', m: 800, note: 'enseignes, restauration' },
    { cat: 'commerces', label: 'Supérette ouverte tard', m: 250 },
    { cat: 'ecoles', label: 'École internationale', m: 1500 },
    { cat: 'ecoles', label: 'Crèche d\'entreprise', m: 600 },
    { cat: 'transport', label: 'Arrêt de bus', m: 200 },
    { cat: 'transport', label: 'Accès rocade X20', m: 900, note: 'centre-ville en 15 min' },
    { cat: 'transport', label: 'Aéroport Tunis-Carthage', m: 7000 },
    { cat: 'sante', label: 'Pharmacie', m: 300 },
    { cat: 'sante', label: 'Clinique internationale', m: 1600 },
    { cat: 'loisirs', label: 'Promenade du lac', m: 350 },
    { cat: 'loisirs', label: 'Salle de sport & piscine', m: 450 },
    { cat: 'loisirs', label: 'Restaurants & cafés', m: 400 },
    { cat: 'services', label: 'Agences bancaires', m: 300 },
    { cat: 'services', label: 'Bureaux & sièges sociaux', m: 500 },
  ],
  'jardins-de-carthage': [
    { cat: 'commerces', label: 'Supermarché', m: 600 },
    { cat: 'commerces', label: 'Commerces de proximité', m: 300, note: 'boulangerie, primeur' },
    { cat: 'commerces', label: 'Centre commercial', m: 2400 },
    { cat: 'ecoles', label: 'Groupe scolaire privé', m: 700 },
    { cat: 'ecoles', label: 'École primaire publique', m: 1100 },
    { cat: 'ecoles', label: 'Crèche', m: 400 },
    { cat: 'transport', label: 'Arrêt de bus', m: 350 },
    { cat: 'transport', label: 'Accès rocade', m: 1200 },
    { cat: 'transport', label: 'Aéroport Tunis-Carthage', m: 8000 },
    { cat: 'sante', label: 'Pharmacie', m: 350 },
    { cat: 'sante', label: 'Centre médical', m: 900 },
    { cat: 'loisirs', label: 'Parc et aires de jeux', m: 450 },
    { cat: 'loisirs', label: 'Club de sport', m: 1000 },
    { cat: 'services', label: 'Agence bancaire', m: 650 },
  ],
  'ain-zaghouan': [
    { cat: 'commerces', label: 'Grande surface', m: 900 },
    { cat: 'commerces', label: 'Commerces de quartier', m: 250 },
    { cat: 'ecoles', label: 'École primaire publique', m: 500 },
    { cat: 'ecoles', label: 'Collège', m: 1200 },
    { cat: 'ecoles', label: 'Crèche', m: 450 },
    { cat: 'transport', label: 'Arrêt de bus', m: 200 },
    { cat: 'transport', label: 'Accès rocade X20', m: 800 },
    { cat: 'sante', label: 'Pharmacie', m: 300 },
    { cat: 'sante', label: 'Cabinet médical', m: 700 },
    { cat: 'loisirs', label: 'Parc urbain', m: 1000 },
    { cat: 'loisirs', label: 'Salle de sport', m: 850 },
    { cat: 'services', label: 'Agence bancaire & poste', m: 600 },
  ],
  mutuelleville: [
    { cat: 'commerces', label: 'Supermarché', m: 400 },
    { cat: 'commerces', label: 'Commerces de proximité', m: 150 },
    { cat: 'commerces', label: 'Centre commercial', m: 1800 },
    { cat: 'ecoles', label: 'Lycée public réputé', m: 800 },
    { cat: 'ecoles', label: 'École primaire', m: 400 },
    { cat: 'ecoles', label: 'Université & grandes écoles', m: 1500 },
    { cat: 'transport', label: 'Station de métro léger', m: 700, note: 'centre-ville en 12 min' },
    { cat: 'transport', label: 'Arrêt de bus', m: 180 },
    { cat: 'sante', label: 'Pharmacie', m: 200 },
    { cat: 'sante', label: 'Hôpital & cliniques', m: 1100 },
    { cat: 'loisirs', label: 'Parc du Belvédère', m: 1300 },
    { cat: 'loisirs', label: 'Cafés & restaurants', m: 300 },
    { cat: 'services', label: 'Agences bancaires', m: 250 },
    { cat: 'services', label: 'Administrations', m: 900 },
  ],
  ennasr: [
    { cat: 'commerces', label: 'Grande surface', m: 550 },
    { cat: 'commerces', label: 'Avenue commerçante', m: 200, note: 'boutiques, cafés' },
    { cat: 'commerces', label: 'Marché municipal', m: 900 },
    { cat: 'ecoles', label: 'École primaire publique', m: 400 },
    { cat: 'ecoles', label: 'Collège & lycée', m: 950 },
    { cat: 'ecoles', label: 'Crèches', m: 300 },
    { cat: 'transport', label: 'Arrêt de bus', m: 150 },
    { cat: 'transport', label: 'Station de métro léger', m: 1600 },
    { cat: 'sante', label: 'Pharmacie de garde', m: 250 },
    { cat: 'sante', label: 'Polyclinique', m: 1200 },
    { cat: 'loisirs', label: 'Salle de sport', m: 500 },
    { cat: 'loisirs', label: 'Jardin public', m: 800 },
    { cat: 'services', label: 'Agences bancaires & poste', m: 300 },
  ],
  'el-menzah': [
    { cat: 'commerces', label: 'Supermarché', m: 450 },
    { cat: 'commerces', label: 'Commerces de quartier', m: 200 },
    { cat: 'commerces', label: 'Marché municipal', m: 1000 },
    { cat: 'ecoles', label: 'École primaire publique', m: 350 },
    { cat: 'ecoles', label: 'Lycée', m: 1100 },
    { cat: 'ecoles', label: 'Crèche & jardin d\'enfants', m: 400 },
    { cat: 'transport', label: 'Arrêt de bus', m: 180 },
    { cat: 'transport', label: 'Station de métro léger', m: 1300 },
    { cat: 'sante', label: 'Pharmacie', m: 280 },
    { cat: 'sante', label: 'Cliniques & cabinets', m: 1000 },
    { cat: 'loisirs', label: 'Stade & complexe sportif', m: 1400 },
    { cat: 'loisirs', label: 'Jardins et aires de jeux', m: 600 },
    { cat: 'services', label: 'Agence bancaire & poste', m: 400 },
  ],
  'la-soukra': [
    { cat: 'commerces', label: 'Grande surface', m: 1200 },
    { cat: 'commerces', label: 'Commerces de proximité', m: 400 },
    { cat: 'ecoles', label: 'Groupe scolaire international', m: 1500, note: 'maternelle au lycée' },
    { cat: 'ecoles', label: 'École primaire publique', m: 700 },
    { cat: 'ecoles', label: 'Crèche', m: 550 },
    { cat: 'transport', label: 'Arrêt de bus', m: 350 },
    { cat: 'transport', label: 'Aéroport Tunis-Carthage', m: 4500 },
    { cat: 'transport', label: 'Accès autoroute A1', m: 2000 },
    { cat: 'sante', label: 'Pharmacie', m: 450 },
    { cat: 'sante', label: 'Centre médical', m: 1300 },
    { cat: 'loisirs', label: 'Club équestre & sportif', m: 1800 },
    { cat: 'loisirs', label: 'Espaces verts', m: 800 },
    { cat: 'services', label: 'Agence bancaire', m: 900 },
  ],
  boumhel: [
    { cat: 'commerces', label: 'Supermarché', m: 800 },
    { cat: 'commerces', label: 'Marché hebdomadaire', m: 1400 },
    { cat: 'commerces', label: 'Commerces de quartier', m: 400 },
    { cat: 'ecoles', label: 'École primaire publique', m: 600 },
    { cat: 'ecoles', label: 'Collège', m: 1500 },
    { cat: 'transport', label: 'Gare TGM / train de banlieue', m: 1800, note: 'Tunis en 25 min' },
    { cat: 'transport', label: 'Arrêt de bus', m: 300 },
    { cat: 'transport', label: 'Accès autoroute A1', m: 2500 },
    { cat: 'sante', label: 'Pharmacie', m: 500 },
    { cat: 'sante', label: 'Dispensaire', m: 1200 },
    { cat: 'loisirs', label: 'Terrain de sport', m: 900 },
    { cat: 'services', label: 'Agence bancaire & poste', m: 1000 },
  ],
}
