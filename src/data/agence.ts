export const AGENCE = {
  name: 'Aylene',
  baseline: "L'immobilier en toute confiance",
  phone: '+216 70 000 000',
  whatsapp: '21670000000',
  email: 'bonjour@aylene.tn',
  address: '12 rue du Lac Léman, Les Berges du Lac 2, Tunis',
  hours: 'Lundi – Vendredi · 9h – 18h30 · Samedi sur rendez-vous',
  mapsQuery: 'Les Berges du Lac 2, Tunis',
}

export interface Advisor {
  id: string
  name: string
  role: string
  zones: string[]
  phone: string
  photo: string
  bio: string
}

/** Conseillers fictifs — un seul interlocuteur par client, du premier appel à la remise des clés. */
export const ADVISORS: Advisor[] = [
  { id: 'nour', name: 'Nour Ben Salah', role: 'Fondatrice · conseillère senior', zones: ['la-marsa', 'gammarth', 'sidi-bou-said'], phone: '+216 70 000 001', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=70', bio: "Douze ans d'immobilier résidentiel sur la côte nord. Nour a créé Aylene pour vendre autrement : moins d'annonces, plus de preuves." },
  { id: 'karim', name: 'Karim Trabelsi', role: 'Conseiller · financement', zones: ['berges-du-lac', 'jardins-de-carthage', 'carthage', 'ain-zaghouan'], phone: '+216 70 000 002', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=70', bio: "Ancien chargé d'affaires en banque, Karim monte les plans de financement et négocie les conditions avec les établissements partenaires." },
  { id: 'ines', name: 'Inès Gharbi', role: 'Conseillère · juridique & dossiers', zones: ['mutuelleville', 'ennasr', 'el-menzah', 'la-soukra', 'boumhel'], phone: '+216 70 000 003', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=70', bio: "Juriste de formation, Inès constitue et vérifie chaque dossier de confiance avant la mise en ligne d'un bien." },
]

export const advisorFor = (zoneSlug: string) => ADVISORS.find((a) => a.zones.includes(zoneSlug)) ?? ADVISORS[0]

export const TESTIMONIALS = [
  { name: 'Sarra & Mehdi', where: 'Acheteurs · Jardins de Carthage', text: "On a acheté sans stress : le dossier était prêt avant la première visite, l'hypothèque déjà vérifiée. Notre conseiller a même négocié le taux avec la banque." },
  { name: 'Hatem L.', where: 'Vendeur · La Marsa', text: "L'estimation en ligne était à 3 % du prix final. Vendu en 41 jours, à un acheteur qui savait exactement ce qu'il achetait." },
  { name: 'Famille Chaabane', where: 'Recherche sur-mesure · Gammarth', text: "La villa n'était pas en ligne. Aylene l'a trouvée pour nous en trois semaines, avec le dossier complet dès la première visite." },
]
