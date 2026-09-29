/**
 * ============================================================
 *  ANNONCES — DONNÉES FICTIVES DE DÉMONSTRATION
 * ============================================================
 *  Aucun bien réel. Les photos sont des visuels libres de droits (Unsplash).
 *  Remplacez / complétez ce tableau pour mettre le site en production.
 *
 *  `dossier` : pièces du « dossier de confiance » déjà vérifiées par Aylene
 *  (voir DOSSIER_ITEMS dans lib/trust.ts). C'est LA différence Aylene :
 *  un bien n'est mis en avant que si son dossier est avancé ou complet.
 */

import type { Poi } from './lieux'

export type Transaction = 'Vente' | 'Location'
export type Categorie = 'Appartement' | 'Villa' | 'Duplex' | 'Terrain' | 'Bureau'
export type DossierKey = 'titre' | 'plan' | 'hypotheque' | 'copro' | 'taxes' | 'conformite'
export type Etat = 'neuf' | 'renove' | 'bon' | 'a-rafraichir'

export interface Listing {
  id: string
  reference: string
  titre: string
  transaction: Transaction
  categorie: Categorie
  zone: string
  adresse: string
  prix: number
  surface: number
  terrain?: number
  chambres?: number
  sdb?: number
  etage?: string
  annee?: number
  etat: Etat
  features: string[]
  description: string
  photos: string[]
  dossier: DossierKey[]
  /** Bien commercialisé uniquement par Aylene */
  exclusivite?: boolean
  meuble?: boolean
  disponible: boolean
  /** Date de mise en ligne (ISO) */
  ajout: string
  /** Nombre de visites organisées (indicateur de tension) */
  visites: number
  /**
   * Lieux propres à ce bien, qui s'ajoutent à ceux du quartier (`src/data/lieux.ts`).
   * Un lieu portant le même libellé qu'un lieu du quartier le remplace : c'est ainsi
   * qu'on rapproche ou éloigne un commerce, une école, un arrêt de bus.
   */
  proximite?: Poi[]
}

const U = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

// Banque de visuels (extérieurs, intérieurs, bureaux, terrains)
const P = {
  villaPool: U('1600596542815-ffad4c1539a9'),
  villaWhite: U('1613490493576-7fde63acd811'),
  villaModern: U('1613977257363-707ba9348227'),
  villaGarden: U('1613553507747-5f8d62ad5904'),
  villaEvening: U('1512917774080-9991f1c4c750'),
  villaClassic: U('1564013799919-ab600027ffc6'),
  villaStone: U('1600047509807-ba8f99d2cdde'),
  houseSimple: U('1568605114967-8130f3a36994'),
  houseGrey: U('1570129477492-45c003edd2be'),
  houseTerrace: U('1580587771525-78b9dba3b914'),
  houseTree: U('1523217582562-09d0def993a6'),
  houseGlass: U('1600566753086-00f18fb6b3ea'),
  houseLarge: U('1600585154340-be6161a56a0c'),
  aptBuilding: U('1545324418-cc1a3fa10c00'),
  aptFacade: U('1502672260266-1c1ef2d93688'),
  aptBalcony: U('1460317442991-0ec209397118'),
  livingBright: U('1600607687939-ce8a6c25118c'),
  livingSofa: U('1600210492486-724fe5c67fb0'),
  livingWood: U('1600573472591-ee6b68d14c68'),
  livingNeutral: U('1556228453-efd6c1ff04f6'),
  livingModern: U('1522708323590-d24dbb6b0267'),
  livingPlant: U('1560185007-cde436f6a4d0'),
  kitchen: U('1484154218962-a197022b5858'),
  kitchenWhite: U('1600489000022-c2086d79f9d4'),
  bedroom: U('1600121848594-d8644e57abab'),
  bedroomLight: U('1600210491892-03d54c0aaf87'),
  bathroom: U('1600566752355-35792bedcfea'),
  officeOpen: U('1497366216548-37526070297c'),
  officeMeeting: U('1497366754035-f200968a6e72'),
  officeDesk: U('1524758631624-e2822e304c36'),
  officeLobby: U('1505873242700-f289a29e1e0f'),
  landField: U('1500382017468-9049fed747ef'),
  landHills: U('1500530855697-b586d89ba3ee'),
  landSea: U('1507525428034-b723cf961d3e'),
}

export const LISTINGS: Listing[] = [
  {
    id: 'AY-1041', reference: 'AY-1041', titre: 'Villa contemporaine avec piscine et vue dégagée',
    transaction: 'Vente', categorie: 'Villa', zone: 'gammarth', adresse: 'Gammarth Supérieur, La Marsa',
    prix: 2650000, surface: 420, terrain: 900, chambres: 5, sdb: 4, annee: 2019, etat: 'bon',
    features: ['Piscine', 'Vue mer', 'Jardin', 'Garage double', 'Domotique', 'Cuisine équipée'],
    description: "Sur les hauteurs de Gammarth, cette villa de 2019 déploie 420 m² sur un terrain arboré de 900 m². Vaste séjour cathédrale ouvert sur la terrasse et la piscine à débordement, cuisine équipée séparée, suite parentale au rez-de-chaussée. À l'étage, quatre chambres et un salon familial avec vue sur la mer. Sous-sol aménagé (salle de sport, buanderie, garage double). Titre foncier individuel vérifié, aucune inscription hypothécaire.",
    photos: [P.villaPool, P.livingBright, P.kitchen, P.bedroom, P.bathroom, P.villaEvening],
    dossier: ['titre', 'plan', 'hypotheque', 'taxes', 'conformite'], exclusivite: true, disponible: true, ajout: '2026-08-28', visites: 7,
    proximite: [
      { cat: 'commerces', label: 'Supérette de Gammarth Supérieur', m: 450 },
      { cat: 'ecoles', label: 'École internationale', m: 1900 },
      { cat: 'loisirs', label: 'Plages de Gammarth', m: 1100 },
      { cat: 'loisirs', label: 'Golf', m: 1700, note: '18 trous' },
      { cat: 'transport', label: 'Arrêt de bus', m: 700 },
    ],
  },
  {
    id: 'AY-1038', reference: 'AY-1038', titre: 'Appartement S+3 lumineux, dernier étage avec terrasse',
    transaction: 'Vente', categorie: 'Appartement', zone: 'la-marsa', adresse: 'Marsa Ville, La Marsa',
    prix: 690000, surface: 165, chambres: 3, sdb: 2, etage: '4e et dernier', annee: 2016, etat: 'bon',
    features: ['Terrasse', 'Ascenseur', 'Parking', 'Double vitrage', 'Cuisine équipée'],
    description: "Au dernier étage d'une petite résidence de 2016, appartement traversant de 165 m² avec terrasse de 40 m² exposée sud-ouest. Séjour double, cuisine équipée, trois chambres dont une suite. Place de parking en sous-sol et cave. Copropriété saine : PV des trois dernières assemblées consultés, aucune procédure en cours.",
    photos: [P.aptBalcony, P.livingSofa, P.kitchenWhite, P.bedroomLight, P.aptFacade],
    dossier: ['titre', 'plan', 'hypotheque', 'copro', 'taxes', 'conformite'], disponible: true, ajout: '2026-09-02', visites: 11,
    proximite: [
      { cat: 'commerces', label: 'Marché municipal de La Marsa', m: 350, note: 'primeurs, poissonnerie' },
      { cat: 'commerces', label: 'Boulangerie & épicerie fine', m: 90 },
      { cat: 'transport', label: 'Station TGM La Marsa Plage', m: 600, note: 'Tunis en 30 min' },
      { cat: 'ecoles', label: 'École primaire publique', m: 300 },
      { cat: 'loisirs', label: 'Plage de La Marsa', m: 700 },
    ],
  },
  {
    id: 'AY-1035', reference: 'AY-1035', titre: 'Duplex neuf S+4 avec jardin privatif',
    transaction: 'Vente', categorie: 'Duplex', zone: 'jardins-de-carthage', adresse: 'Jardins de Carthage, Tunis',
    prix: 820000, surface: 240, terrain: 120, chambres: 4, sdb: 3, etage: 'RDC + 1', annee: 2025, etat: 'neuf',
    features: ['Jardin', 'Neuf', 'Parking', 'Chauffage central', 'Cuisine équipée', 'Gardiennage'],
    description: "Livraison immédiate. Duplex de 240 m² en rez-de-jardin d'une résidence sécurisée achevée en 2025. Au rez-de-chaussée, séjour de 55 m² ouvert sur le jardin privatif de 120 m², cuisine équipée. À l'étage, quatre chambres et deux salles de bains. Deux places de parking. Vendu directement par le promoteur, garantie décennale en cours.",
    photos: [P.houseGlass, P.livingModern, P.kitchen, P.bedroom, P.livingPlant],
    dossier: ['titre', 'plan', 'hypotheque', 'conformite'], disponible: true, ajout: '2026-09-06', visites: 4,
    proximite: [
      { cat: 'commerces', label: 'Commerces de proximité', m: 180, note: 'boulangerie, primeur' },
      { cat: 'ecoles', label: 'Groupe scolaire privé', m: 400 },
      { cat: 'ecoles', label: 'Crèche', m: 250 },
      { cat: 'loisirs', label: 'Parc et aires de jeux', m: 200 },
      { cat: 'sante', label: 'Pharmacie', m: 240 },
    ],
  },
  {
    id: 'AY-1032', reference: 'AY-1032', titre: 'Maison de caractère rénovée, patio et terrasse sur les toits',
    transaction: 'Vente', categorie: 'Villa', zone: 'sidi-bou-said', adresse: 'Sidi Bou Saïd, village',
    prix: 1950000, surface: 260, terrain: 300, chambres: 4, sdb: 3, annee: 1948, etat: 'renove',
    features: ['Vue mer', 'Patio', 'Terrasse', 'Cheminée', 'Rénové'],
    description: "Dans une ruelle calme du village, maison traditionnelle entièrement rénovée en 2022 avec des matériaux nobles : zellige, bois de cèdre, chaux. Patio central, salon avec cheminée, quatre chambres, et une terrasse sur les toits avec vue sur le golfe. Prix au m² justifié par la rareté et la qualité de la rénovation.",
    photos: [P.houseTree, P.livingWood, P.livingNeutral, P.bedroomLight, P.houseTerrace],
    dossier: ['titre', 'plan', 'hypotheque', 'taxes'], exclusivite: true, disponible: true, ajout: '2026-08-20', visites: 9,
    proximite: [
      { cat: 'commerces', label: 'Épicerie du village', m: 120 },
      { cat: 'loisirs', label: 'Cafés panoramiques & galeries', m: 150 },
      { cat: 'transport', label: 'Station TGM Sidi Bou Saïd', m: 700 },
      { cat: 'loisirs', label: 'Port de plaisance', m: 650 },
      { cat: 'ecoles', label: 'École primaire publique', m: 1000 },
    ],
  },
  {
    id: 'AY-1029', reference: 'AY-1029', titre: 'Appartement S+2 rénové, quartier calme',
    transaction: 'Vente', categorie: 'Appartement', zone: 'el-menzah', adresse: 'El Menzah 6, Ariana',
    prix: 320000, surface: 118, chambres: 2, sdb: 1, etage: '2e', annee: 2004, etat: 'renove',
    features: ['Rénové', 'Balcon', 'Cuisine équipée', 'Climatisation'],
    description: "Appartement de 118 m² rénové en 2024 (électricité, plomberie, cuisine, salle de bains). Séjour avec balcon, deux chambres, cuisine équipée ouverte. Petite copropriété de six lots sans ascenseur, charges très faibles. Idéal premier achat ou investissement locatif : loyer estimé 1 500 DT.",
    photos: [P.livingNeutral, P.kitchenWhite, P.bedroom, P.aptFacade],
    dossier: ['titre', 'plan', 'hypotheque', 'copro', 'taxes', 'conformite'], disponible: true, ajout: '2026-08-25', visites: 14,
    proximite: [
      { cat: 'commerces', label: 'Commerces de quartier', m: 120 },
      { cat: 'ecoles', label: 'École primaire publique', m: 250 },
      { cat: 'ecoles', label: 'Crèche & jardin d\'enfants', m: 300 },
      { cat: 'sante', label: 'Pharmacie', m: 180 },
      { cat: 'transport', label: 'Arrêt de bus', m: 140 },
    ],
  },
  {
    id: 'AY-1027', reference: 'AY-1027', titre: 'Terrain constructible de 800 m², titre bleu',
    transaction: 'Vente', categorie: 'Terrain', zone: 'la-soukra', adresse: 'Chotrana 2, La Soukra',
    prix: 720000, surface: 800, etat: 'bon',
    features: ['Titre foncier', 'Lotissement approuvé', 'Viabilisé', 'Angle'],
    description: "Terrain d'angle de 800 m² dans un lotissement approuvé, viabilisé (eau, électricité, assainissement). COS 0,4 / CUF 1,2 : possibilité de construire environ 320 m² habitables sur deux niveaux. Titre bleu individuel, sans servitude. Le certificat d'urbanisme est joint au dossier.",
    photos: [P.landField, P.landHills],
    dossier: ['titre', 'plan', 'hypotheque', 'taxes', 'conformite'], disponible: true, ajout: '2026-08-12', visites: 6,
    proximite: [
      { cat: 'transport', label: 'Aéroport Tunis-Carthage', m: 3800 },
      { cat: 'commerces', label: 'Commerces de proximité', m: 600 },
      { cat: 'ecoles', label: 'Groupe scolaire international', m: 1100, note: 'maternelle au lycée' },
      { cat: 'transport', label: 'Accès autoroute A1', m: 1600 },
    ],
  },
  {
    id: 'AY-1025', reference: 'AY-1025', titre: 'Penthouse S+3 avec vue sur le Lac',
    transaction: 'Vente', categorie: 'Appartement', zone: 'berges-du-lac', adresse: 'Les Berges du Lac 2, Tunis',
    prix: 1150000, surface: 210, chambres: 3, sdb: 3, etage: '9e et dernier', annee: 2021, etat: 'bon',
    features: ['Vue lac', 'Terrasse', 'Ascenseur', 'Parking', 'Salle de sport', 'Gardiennage'],
    description: "Au dernier étage d'une résidence de standing de 2021, penthouse de 210 m² avec terrasse panoramique de 70 m² sur le Lac. Séjour de 65 m², cuisine équipée, trois suites. Deux places de parking, salle de sport et conciergerie dans la résidence.",
    photos: [P.aptBuilding, P.livingModern, P.kitchen, P.bedroomLight, P.bathroom],
    dossier: ['titre', 'plan', 'hypotheque', 'copro', 'taxes'], disponible: true, ajout: '2026-09-09', visites: 3,
    proximite: [
      { cat: 'commerces', label: 'Galerie commerciale', m: 450, note: 'enseignes, restauration' },
      { cat: 'commerces', label: 'Grande surface', m: 700 },
      { cat: 'loisirs', label: 'Promenade du lac', m: 150 },
      { cat: 'sante', label: 'Clinique internationale', m: 1300 },
      { cat: 'transport', label: 'Arrêt de bus', m: 160 },
    ],
  },
  {
    id: 'AY-1022', reference: 'AY-1022', titre: 'Villa jumelée S+4 avec jardin, quartier résidentiel',
    transaction: 'Vente', categorie: 'Villa', zone: 'ain-zaghouan', adresse: 'Aïn Zaghouan Nord, Tunis',
    prix: 980000, surface: 300, terrain: 350, chambres: 4, sdb: 3, annee: 2012, etat: 'bon',
    features: ['Jardin', 'Garage', 'Terrasse', 'Chauffage central'],
    description: "Villa jumelée de 300 m² sur 350 m² de terrain dans une rue calme. Double séjour, cuisine séparée, quatre chambres à l'étage dont une suite avec dressing. Garage et jardin arboré avec coin barbecue. Quelques rafraîchissements de peinture à prévoir, pris en compte dans le prix.",
    photos: [P.houseGrey, P.livingSofa, P.kitchenWhite, P.bedroom, P.houseTerrace],
    dossier: ['titre', 'plan', 'hypotheque', 'taxes'], disponible: true, ajout: '2026-08-05', visites: 8,
    proximite: [
      { cat: 'commerces', label: 'Grande surface', m: 650 },
      { cat: 'ecoles', label: 'École primaire publique', m: 400 },
      { cat: 'loisirs', label: 'Parc urbain', m: 700 },
      { cat: 'transport', label: 'Accès rocade X20', m: 600 },
      { cat: 'sante', label: 'Pharmacie', m: 250 },
    ],
  },
  {
    id: 'AY-1019', reference: 'AY-1019', titre: 'Appartement S+1 idéal investisseur, loué',
    transaction: 'Vente', categorie: 'Appartement', zone: 'ennasr', adresse: 'Ennasr 2, Ariana',
    prix: 215000, surface: 78, chambres: 1, sdb: 1, etage: '3e', annee: 2010, etat: 'bon',
    features: ['Ascenseur', 'Balcon', 'Loué', 'Parking'],
    description: "Appartement S+1 de 78 m² actuellement loué 1 100 DT par mois à un locataire en place depuis 2023 (bail transmis). Rendement brut de 6,1 %. Résidence avec ascenseur et parking. Vendu occupé.",
    photos: [P.livingPlant, P.bedroomLight, P.aptFacade],
    dossier: ['titre', 'plan', 'hypotheque', 'copro', 'taxes', 'conformite'], disponible: true, ajout: '2026-07-30', visites: 12,
    proximite: [
      { cat: 'commerces', label: 'Avenue commerçante', m: 120, note: 'boutiques, cafés' },
      { cat: 'commerces', label: 'Grande surface', m: 400 },
      { cat: 'ecoles', label: 'Collège & lycée', m: 700 },
      { cat: 'transport', label: 'Arrêt de bus', m: 90 },
      { cat: 'sante', label: 'Pharmacie de garde', m: 160 },
    ],
  },
  {
    id: 'AY-1016', reference: 'AY-1016', titre: 'Villa à rafraîchir sur grand terrain plat',
    transaction: 'Vente', categorie: 'Villa', zone: 'boumhel', adresse: 'Boumhel El Bassatine',
    prix: 560000, surface: 280, terrain: 1200, chambres: 4, sdb: 2, annee: 1995, etat: 'a-rafraichir',
    features: ['Grand terrain', 'Garage', 'Puits', 'Arbres fruitiers'],
    description: "Villa de plain-pied de 280 m² sur 1 200 m² de terrain plat et arboré. Structure saine, second œuvre à reprendre (cuisine, salles de bains, menuiseries). Un devis de rénovation indicatif de 90 000 DT est joint au dossier. Rare surface de terrain à ce prix.",
    photos: [P.villaClassic, P.landHills, P.livingWood],
    dossier: ['titre', 'plan', 'hypotheque'], disponible: true, ajout: '2026-08-15', visites: 5,
    proximite: [
      { cat: 'commerces', label: 'Commerces de quartier', m: 550 },
      { cat: 'ecoles', label: 'École primaire publique', m: 800 },
      { cat: 'transport', label: 'Gare TGM / train de banlieue', m: 2100, note: 'Tunis en 25 min' },
      { cat: 'transport', label: 'Accès autoroute A1', m: 2200 },
      { cat: 'loisirs', label: 'Terrain de sport', m: 1100 },
    ],
  },
  {
    id: 'AY-1013', reference: 'AY-1013', titre: 'Appartement S+3 de standing, résidence avec piscine',
    transaction: 'Vente', categorie: 'Appartement', zone: 'mutuelleville', adresse: 'Mutuelleville, Tunis',
    prix: 640000, surface: 172, chambres: 3, sdb: 2, etage: '5e', annee: 2018, etat: 'bon',
    features: ['Piscine', 'Ascenseur', 'Parking', 'Gardiennage', 'Cuisine équipée'],
    description: "Dans une résidence de standing avec piscine et gardiennage 24h/24, appartement de 172 m² au 5e étage : séjour de 50 m² avec balcon, cuisine équipée, trois chambres dont une suite. Deux places de parking et cave.",
    photos: [P.aptBuilding, P.livingBright, P.kitchen, P.bedroom],
    dossier: ['titre', 'plan', 'hypotheque', 'copro', 'taxes', 'conformite'], disponible: true, ajout: '2026-09-11', visites: 2,
    proximite: [
      { cat: 'commerces', label: 'Commerces de proximité', m: 100 },
      { cat: 'ecoles', label: 'Lycée public réputé', m: 600 },
      { cat: 'ecoles', label: 'École primaire', m: 300 },
      { cat: 'transport', label: 'Station de métro léger', m: 550, note: 'centre-ville en 12 min' },
      { cat: 'loisirs', label: 'Parc du Belvédère', m: 1100 },
    ],
  },
  {
    id: 'AY-1010', reference: 'AY-1010', titre: 'Villa d\'architecte, piscine et pool-house',
    transaction: 'Vente', categorie: 'Villa', zone: 'la-marsa', adresse: 'Cité des Pins, La Marsa',
    prix: 2100000, surface: 380, terrain: 700, chambres: 5, sdb: 4, annee: 2017, etat: 'bon',
    features: ['Piscine', 'Pool-house', 'Jardin', 'Garage double', 'Domotique'],
    description: "Villa d'architecte de 380 m² aux volumes généreux, baignée de lumière. Séjour de 80 m² sous 4 m de hauteur, cuisine équipée avec office, cinq chambres. Piscine chauffée avec pool-house, garage double. Domotique complète.",
    photos: [P.villaWhite, P.livingModern, P.kitchenWhite, P.bedroomLight, P.villaGarden],
    dossier: ['titre', 'plan', 'hypotheque', 'taxes', 'conformite'], exclusivite: true, disponible: true, ajout: '2026-08-30', visites: 6,
    proximite: [
      { cat: 'commerces', label: 'Supermarché de quartier', m: 400 },
      { cat: 'ecoles', label: 'Groupe scolaire international', m: 900, note: 'maternelle au lycée' },
      { cat: 'loisirs', label: 'Plage de La Marsa', m: 1200 },
      { cat: 'transport', label: 'Station TGM La Marsa Plage', m: 1400 },
      { cat: 'sante', label: 'Pharmacie', m: 350 },
    ],
  },
  {
    id: 'AY-1007', reference: 'AY-1007', titre: 'Terrain vue mer de 1 500 m²',
    transaction: 'Vente', categorie: 'Terrain', zone: 'gammarth', adresse: 'Gammarth Village',
    prix: 1800000, surface: 1500, etat: 'bon',
    features: ['Titre foncier', 'Vue mer', 'Viabilisé'],
    description: "Terrain en pente douce de 1 500 m² avec vue mer imprenable, dans une zone de villas. Viabilisé, titre bleu, certificat d'urbanisme favorable pour une villa R+1.",
    photos: [P.landSea, P.landHills],
    dossier: ['titre', 'plan', 'hypotheque', 'taxes'], disponible: true, ajout: '2026-07-22', visites: 4,
    proximite: [
      { cat: 'commerces', label: 'Supérette', m: 800 },
      { cat: 'loisirs', label: 'Plages de Gammarth', m: 600 },
      { cat: 'transport', label: 'Arrêt de bus', m: 900 },
      { cat: 'ecoles', label: 'École internationale', m: 2400 },
    ],
  },
  {
    id: 'AY-1004', reference: 'AY-1004', titre: 'Plateau de bureaux de 260 m², immeuble récent',
    transaction: 'Vente', categorie: 'Bureau', zone: 'berges-du-lac', adresse: 'Les Berges du Lac 2, Tunis',
    prix: 1040000, surface: 260, etage: '3e', annee: 2020, etat: 'bon',
    features: ['Ascenseur', 'Parking', 'Climatisation', 'Fibre', 'Gardiennage'],
    description: "Plateau de bureaux de 260 m² livré aménagé (open space, trois bureaux fermés, salle de réunion, kitchenette). Six places de parking. Immeuble de 2020 avec accueil et gardiennage.",
    photos: [P.officeOpen, P.officeMeeting, P.officeLobby],
    dossier: ['titre', 'plan', 'hypotheque', 'copro', 'taxes', 'conformite'], disponible: true, ajout: '2026-08-08', visites: 3,
    proximite: [
      { cat: 'services', label: 'Bureaux & sièges sociaux', m: 200 },
      { cat: 'commerces', label: 'Galerie commerciale', m: 600, note: 'enseignes, restauration' },
      { cat: 'transport', label: 'Accès rocade X20', m: 700, note: 'centre-ville en 15 min' },
      { cat: 'commerces', label: 'Supérette ouverte tard', m: 180 },
      { cat: 'services', label: 'Agences bancaires', m: 150 },
    ],
  },
  {
    id: 'AY-1001', reference: 'AY-1001', titre: 'Appartement S+2 avec vue sur le golfe',
    transaction: 'Vente', categorie: 'Appartement', zone: 'carthage', adresse: 'Carthage Byrsa',
    prix: 520000, surface: 128, chambres: 2, sdb: 2, etage: '3e', annee: 2014, etat: 'bon',
    features: ['Vue mer', 'Balcon', 'Ascenseur', 'Parking'],
    description: "Appartement de 128 m² au 3e étage avec vue dégagée sur le golfe de Tunis depuis le séjour et le balcon. Deux chambres, deux salles de bains, cuisine équipée. Place de parking. Vendu.",
    photos: [P.aptBalcony, P.livingSofa, P.bedroom],
    dossier: ['titre', 'plan', 'hypotheque', 'copro', 'taxes', 'conformite'], disponible: false, ajout: '2026-06-10', visites: 16,
    proximite: [
      { cat: 'transport', label: 'Station TGM Carthage', m: 500 },
      { cat: 'loisirs', label: 'Site archéologique & parc', m: 400 },
      { cat: 'commerces', label: 'Supermarché', m: 850 },
      { cat: 'ecoles', label: 'École primaire publique', m: 700 },
      { cat: 'loisirs', label: 'Plage', m: 900 },
    ],
  },
  {
    id: 'AY-0998', reference: 'AY-0998', titre: 'Duplex S+3 avec terrasse, proche écoles',
    transaction: 'Vente', categorie: 'Duplex', zone: 'la-soukra', adresse: 'Chotrana 1, La Soukra',
    prix: 470000, surface: 190, chambres: 3, sdb: 2, etage: '3e + 4e', annee: 2015, etat: 'bon',
    features: ['Terrasse', 'Ascenseur', 'Parking', 'Cuisine équipée'],
    description: "Duplex de 190 m² : au premier niveau séjour, cuisine et une chambre ; au second deux chambres et une terrasse de 35 m². Résidence calme avec ascenseur et parking, à cinq minutes des écoles internationales.",
    photos: [P.livingBright, P.kitchen, P.bedroomLight, P.aptFacade],
    dossier: ['titre', 'plan', 'hypotheque', 'copro', 'taxes'], disponible: true, ajout: '2026-09-01', visites: 5,
    proximite: [
      { cat: 'ecoles', label: 'Groupe scolaire international', m: 600, note: 'maternelle au lycée' },
      { cat: 'ecoles', label: 'École primaire publique', m: 500 },
      { cat: 'commerces', label: 'Commerces de proximité', m: 250 },
      { cat: 'sante', label: 'Pharmacie', m: 300 },
      { cat: 'transport', label: 'Arrêt de bus', m: 220 },
    ],
  },

  // ───────── LOCATIONS ─────────
  {
    id: 'AY-L204', reference: 'AY-L204', titre: 'Appartement S+2 meublé, résidence avec piscine',
    transaction: 'Location', categorie: 'Appartement', zone: 'la-marsa', adresse: 'Marsa Plage, La Marsa',
    prix: 2800, surface: 120, chambres: 2, sdb: 2, etage: '2e', annee: 2019, etat: 'bon', meuble: true,
    features: ['Meublé', 'Piscine', 'Ascenseur', 'Parking', 'Climatisation'],
    description: "Appartement meublé avec goût, 120 m², dans une résidence avec piscine à 300 m de la plage. Deux chambres, deux salles de bains, cuisine équipée. Charges de copropriété incluses, bail d'un an minimum. Dépôt de garantie : deux mois.",
    photos: [P.livingNeutral, P.bedroomLight, P.kitchenWhite, P.aptBuilding],
    dossier: ['titre', 'copro', 'conformite'], disponible: true, ajout: '2026-09-08', visites: 6,
    proximite: [
      { cat: 'loisirs', label: 'Plage de La Marsa', m: 300 },
      { cat: 'commerces', label: 'Supermarché de quartier', m: 200 },
      { cat: 'loisirs', label: 'Corniche & cafés', m: 400 },
      { cat: 'transport', label: 'Station TGM La Marsa Plage', m: 750 },
      { cat: 'sante', label: 'Pharmacie', m: 260 },
    ],
  },
  {
    id: 'AY-L201', reference: 'AY-L201', titre: 'Villa S+4 avec jardin et piscine',
    transaction: 'Location', categorie: 'Villa', zone: 'gammarth', adresse: 'Gammarth, La Marsa',
    prix: 7500, surface: 350, terrain: 600, chambres: 4, sdb: 3, annee: 2016, etat: 'bon',
    features: ['Piscine', 'Jardin', 'Garage', 'Domotique', 'Gardiennage'],
    description: "Villa de 350 m² avec piscine et jardin paysager de 600 m². Quatre chambres, trois salles de bains, double séjour, cuisine équipée. Non meublée, disponible immédiatement. Entretien du jardin et de la piscine à la charge du propriétaire.",
    photos: [P.villaGarden, P.livingModern, P.bedroom, P.villaPool],
    dossier: ['titre', 'conformite'], disponible: true, ajout: '2026-09-04', visites: 4,
    proximite: [
      { cat: 'commerces', label: 'Supérette', m: 700 },
      { cat: 'loisirs', label: 'Plages de Gammarth', m: 800 },
      { cat: 'ecoles', label: 'École internationale', m: 2000 },
      { cat: 'transport', label: 'Arrêt de bus', m: 600 },
      { cat: 'loisirs', label: 'Golf', m: 2200, note: '18 trous' },
    ],
  },
  {
    id: 'AY-L198', reference: 'AY-L198', titre: 'Studio meublé, idéal jeune actif',
    transaction: 'Location', categorie: 'Appartement', zone: 'berges-du-lac', adresse: 'Les Berges du Lac 2, Tunis',
    prix: 1300, surface: 45, chambres: 1, sdb: 1, etage: '6e', annee: 2020, etat: 'bon', meuble: true,
    features: ['Meublé', 'Ascenseur', 'Parking', 'Fibre', 'Salle de sport'],
    description: "Studio de 45 m² entièrement meublé et équipé, au 6e étage avec vue sur le Lac. Parking, salle de sport et fibre dans la résidence. Bail d'un an, charges incluses.",
    photos: [P.livingPlant, P.kitchen, P.aptBuilding],
    dossier: ['titre', 'copro', 'conformite'], disponible: true, ajout: '2026-09-10', visites: 9,
    proximite: [
      { cat: 'loisirs', label: 'Salle de sport & piscine', m: 80, note: 'dans la résidence' },
      { cat: 'commerces', label: 'Supérette ouverte tard', m: 150 },
      { cat: 'services', label: 'Bureaux & sièges sociaux', m: 300 },
      { cat: 'loisirs', label: 'Promenade du lac', m: 250 },
      { cat: 'transport', label: 'Arrêt de bus', m: 180 },
    ],
  },
  {
    id: 'AY-L195', reference: 'AY-L195', titre: 'Appartement S+3 familial, proche écoles',
    transaction: 'Location', categorie: 'Appartement', zone: 'ennasr', adresse: 'Ennasr 1, Ariana',
    prix: 1900, surface: 150, chambres: 3, sdb: 2, etage: '1er', annee: 2012, etat: 'bon',
    features: ['Ascenseur', 'Parking', 'Balcon', 'Chauffage central'],
    description: "Appartement non meublé de 150 m² au premier étage : séjour double, trois chambres, deux salles de bains, cuisine séparée. Chauffage central, place de parking. Proche écoles, commerces et transports.",
    photos: [P.livingSofa, P.bedroom, P.kitchenWhite],
    dossier: ['titre', 'copro', 'conformite'], disponible: true, ajout: '2026-08-27', visites: 7,
    proximite: [
      { cat: 'ecoles', label: 'École primaire publique', m: 280 },
      { cat: 'ecoles', label: 'Collège & lycée', m: 600 },
      { cat: 'commerces', label: 'Avenue commerçante', m: 200, note: 'boutiques, cafés' },
      { cat: 'transport', label: 'Arrêt de bus', m: 120 },
      { cat: 'commerces', label: 'Grande surface', m: 450 },
    ],
  },
  {
    id: 'AY-L192', reference: 'AY-L192', titre: 'Bureaux aménagés de 140 m², centre d\'affaires',
    transaction: 'Location', categorie: 'Bureau', zone: 'mutuelleville', adresse: 'Mutuelleville, Tunis',
    prix: 3600, surface: 140, etage: '2e', annee: 2018, etat: 'bon',
    features: ['Climatisation', 'Fibre', 'Parking', 'Ascenseur', 'Accueil'],
    description: "Plateau de 140 m² aménagé en open space avec deux bureaux fermés et une salle de réunion. Trois places de parking, fibre, accueil partagé. Bail commercial 3-6-9.",
    photos: [P.officeDesk, P.officeMeeting, P.officeLobby],
    dossier: ['titre', 'copro', 'conformite'], disponible: true, ajout: '2026-08-18', visites: 3,
    proximite: [
      { cat: 'services', label: 'Administrations', m: 600 },
      { cat: 'transport', label: 'Station de métro léger', m: 450, note: 'centre-ville en 12 min' },
      { cat: 'commerces', label: 'Commerces de proximité', m: 120 },
      { cat: 'services', label: 'Agences bancaires', m: 150 },
      { cat: 'loisirs', label: 'Cafés & restaurants', m: 200 },
    ],
  },
  {
    id: 'AY-L189', reference: 'AY-L189', titre: 'Étage de villa S+3 avec terrasse',
    transaction: 'Location', categorie: 'Appartement', zone: 'el-menzah', adresse: 'El Menzah 9, Ariana',
    prix: 1700, surface: 160, chambres: 3, sdb: 2, etage: '1er (villa)', annee: 2008, etat: 'bon',
    features: ['Terrasse', 'Garage', 'Entrée indépendante', 'Chauffage central'],
    description: "Étage de villa de 160 m² avec entrée indépendante et grande terrasse. Séjour, cuisine équipée, trois chambres. Garage. Propriétaire au rez-de-chaussée, ambiance calme.",
    photos: [P.houseSimple, P.livingWood, P.bedroomLight],
    dossier: ['titre', 'conformite'], disponible: true, ajout: '2026-08-22', visites: 5,
    proximite: [
      { cat: 'ecoles', label: 'École primaire publique', m: 300 },
      { cat: 'commerces', label: 'Commerces de quartier', m: 250 },
      { cat: 'loisirs', label: 'Stade & complexe sportif', m: 900 },
      { cat: 'transport', label: 'Arrêt de bus', m: 200 },
      { cat: 'sante', label: 'Pharmacie', m: 320 },
    ],
  },
  {
    id: 'AY-L186', reference: 'AY-L186', titre: 'Duplex S+3 neuf, résidence sécurisée',
    transaction: 'Location', categorie: 'Duplex', zone: 'jardins-de-carthage', adresse: 'Jardins de Carthage, Tunis',
    prix: 2600, surface: 175, chambres: 3, sdb: 2, etage: '4e + 5e', annee: 2025, etat: 'neuf',
    features: ['Neuf', 'Terrasse', 'Ascenseur', 'Parking', 'Gardiennage'],
    description: "Première location. Duplex neuf de 175 m² avec terrasse de 30 m² au dernier niveau. Trois chambres, deux salles de bains, cuisine équipée. Résidence sécurisée avec parking.",
    photos: [P.houseGlass, P.livingBright, P.bedroom, P.kitchen],
    dossier: ['titre', 'copro', 'conformite'], disponible: true, ajout: '2026-09-12', visites: 2,
    proximite: [
      { cat: 'commerces', label: 'Commerces de proximité', m: 200, note: 'boulangerie, primeur' },
      { cat: 'ecoles', label: 'Groupe scolaire privé', m: 500 },
      { cat: 'ecoles', label: 'Crèche', m: 350 },
      { cat: 'loisirs', label: 'Parc et aires de jeux', m: 300 },
      { cat: 'transport', label: 'Arrêt de bus', m: 250 },
    ],
  },
  {
    id: 'AY-L183', reference: 'AY-L183', titre: 'Villa S+3 meublée avec jardin',
    transaction: 'Location', categorie: 'Villa', zone: 'la-soukra', adresse: 'Chotrana 3, La Soukra',
    prix: 3200, surface: 220, terrain: 400, chambres: 3, sdb: 2, annee: 2010, etat: 'bon', meuble: true,
    features: ['Meublé', 'Jardin', 'Garage', 'Climatisation'],
    description: "Villa meublée de 220 m² sur 400 m² de terrain avec jardin clôturé. Trois chambres, deux salles de bains, cuisine équipée, garage. Louée.",
    photos: [P.houseTerrace, P.livingNeutral, P.bedroomLight],
    dossier: ['titre', 'conformite'], disponible: false, ajout: '2026-07-15', visites: 8,
    proximite: [
      { cat: 'ecoles', label: 'Groupe scolaire international', m: 1200, note: 'maternelle au lycée' },
      { cat: 'commerces', label: 'Commerces de proximité', m: 500 },
      { cat: 'transport', label: 'Aéroport Tunis-Carthage', m: 5000 },
      { cat: 'loisirs', label: 'Espaces verts', m: 600 },
      { cat: 'sante', label: 'Pharmacie', m: 550 },
    ],
  },
]
