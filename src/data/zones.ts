/**
 * Quartiers couverts par Aylene, avec les médianes de prix observées
 * (valeurs fictives, à ajuster). Elles alimentent :
 *  - l'indice « Prix juste » affiché sur chaque fiche,
 *  - le baromètre des quartiers,
 *  - le simulateur d'estimation.
 */
export interface Zone {
  slug: string
  name: string
  /** Médiane du prix de vente au m² (DT) */
  venteM2: number
  /** Médiane du loyer mensuel au m² (DT) */
  loyerM2: number
  /** Évolution sur 12 mois (%) */
  tendance: number
  /** Délai moyen de vente constaté (jours) */
  delai: number
  ambiance: string
  photo: string
}

export const ZONES: Zone[] = [
  { slug: 'la-marsa', name: 'La Marsa', venteM2: 4200, loyerM2: 19, tendance: 4.1, delai: 74, ambiance: 'Balnéaire, familial, très recherché', photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=70' },
  { slug: 'gammarth', name: 'Gammarth', venteM2: 4600, loyerM2: 21, tendance: 5.3, delai: 92, ambiance: 'Villas, vue mer, résidentiel haut de gamme', photo: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=70' },
  { slug: 'sidi-bou-said', name: 'Sidi Bou Saïd', venteM2: 4800, loyerM2: 22, tendance: 2.8, delai: 110, ambiance: 'Patrimoine, maisons de caractère', photo: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=900&q=70' },
  { slug: 'carthage', name: 'Carthage', venteM2: 3900, loyerM2: 17, tendance: 3.2, delai: 81, ambiance: 'Calme, verdoyant, proche du Lac', photo: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=70' },
  { slug: 'berges-du-lac', name: 'Berges du Lac 2', venteM2: 3800, loyerM2: 20, tendance: 1.9, delai: 68, ambiance: 'Résidences récentes, bureaux, dynamique', photo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=70' },
  { slug: 'jardins-de-carthage', name: 'Jardins de Carthage', venteM2: 3300, loyerM2: 16, tendance: 6.4, delai: 60, ambiance: 'Neuf, jeunes familles, en plein essor', photo: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=70' },
  { slug: 'ain-zaghouan', name: 'Aïn Zaghouan', venteM2: 3000, loyerM2: 15, tendance: 3.7, delai: 66, ambiance: 'Résidentiel, proche de tout', photo: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=70' },
  { slug: 'mutuelleville', name: 'Mutuelleville', venteM2: 3400, loyerM2: 16, tendance: 1.2, delai: 88, ambiance: 'Central, immeubles de standing', photo: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=70' },
  { slug: 'ennasr', name: 'Ennasr', venteM2: 2700, loyerM2: 13, tendance: 2.4, delai: 71, ambiance: 'Commerçant, bien desservi', photo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=70' },
  { slug: 'el-menzah', name: 'El Menzah', venteM2: 2600, loyerM2: 12, tendance: 1.6, delai: 79, ambiance: 'Établi, écoles, jardins', photo: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=70' },
  { slug: 'la-soukra', name: 'La Soukra', venteM2: 2400, loyerM2: 12, tendance: 4.9, delai: 63, ambiance: 'Villas, terrains, proche aéroport', photo: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=70' },
  { slug: 'boumhel', name: 'Boumhel', venteM2: 1500, loyerM2: 8, tendance: 3.0, delai: 95, ambiance: 'Accessible, grands terrains', photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=70' },
]

export const zoneBySlug = (slug: string) => ZONES.find((z) => z.slug === slug)
