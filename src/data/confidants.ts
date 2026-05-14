// Confidant data structure with points, best answers, and persona requirements

export interface ConfidantRank {
  rank: number
  pointsNeeded: number
  bestAnswers?: string[] // Optional: best dialogue choices
  requiresPersona?: string // Arcana name if persona is needed
  cost?: number // Money cost for this rank (e.g., Temperance, Fortune)
  forced?: boolean // If this rank is story-forced
}

export interface ConfidantData {
  arcana: string
  name: string
  ranks: ConfidantRank[]
  availableTimeslots: string[] // ['afternoon', 'evening', etc.]
  location?: string
  transportCost?: number // Cost to reach this confidant
  unlockDate?: string // Date when confidant becomes available
  maxRank: number
}

// Confidant data for Persona 5 Royal
export const confidantData: Record<string, ConfidantData> = {
  Hierophant: {
    arcana: 'Hierophant',
    name: 'Sojiro Sakura',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Cafe Leblanc',
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3, requiresPersona: 'Hierophant' },
      { rank: 3, pointsNeeded: 3, requiresPersona: 'Hierophant' },
      { rank: 4, pointsNeeded: 3, requiresPersona: 'Hierophant' },
      { rank: 5, pointsNeeded: 4, requiresPersona: 'Hierophant' },
      { rank: 6, pointsNeeded: 4, requiresPersona: 'Hierophant' },
      { rank: 7, pointsNeeded: 5, requiresPersona: 'Hierophant' },
      { rank: 8, pointsNeeded: 5, requiresPersona: 'Hierophant' },
      { rank: 9, pointsNeeded: 5, requiresPersona: 'Hierophant' },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Lovers: {
    arcana: 'Lovers',
    name: 'Ann Takamaki',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0,  forced: true},
      { rank: 2, pointsNeeded: 3, requiresPersona: 'Lovers' },
      { rank: 3, pointsNeeded: 3, requiresPersona: 'Lovers' },
      { rank: 4, pointsNeeded: 3, requiresPersona: 'Lovers' },
      { rank: 5, pointsNeeded: 4, requiresPersona: 'Lovers' },
      { rank: 6, pointsNeeded: 4, requiresPersona: 'Lovers' },
      { rank: 7, pointsNeeded: 5, requiresPersona: 'Lovers' },
      { rank: 8, pointsNeeded: 5, requiresPersona: 'Lovers' },
      { rank: 9, pointsNeeded: 5, requiresPersona: 'Lovers' },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Chariot: {
    arcana: 'Chariot',
    name: 'Ryuji Sakamoto',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0,  forced: true},
      { rank: 2, pointsNeeded: 3, requiresPersona: 'Chariot' },
      { rank: 3, pointsNeeded: 3, requiresPersona: 'Chariot' },
      { rank: 4, pointsNeeded: 3, requiresPersona: 'Chariot' },
      { rank: 5, pointsNeeded: 4, requiresPersona: 'Chariot' },
      { rank: 6, pointsNeeded: 4, requiresPersona: 'Chariot' },
      { rank: 7, pointsNeeded: 5, requiresPersona: 'Chariot' },
      { rank: 8, pointsNeeded: 5, requiresPersona: 'Chariot' },
      { rank: 9, pointsNeeded: 5, requiresPersona: 'Chariot' },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Death: {
    arcana: 'Death',
    name: 'Tae Takemi',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3, requiresPersona: 'Death' },
      { rank: 3, pointsNeeded: 3, requiresPersona: 'Death' },
      { rank: 4, pointsNeeded: 3, requiresPersona: 'Death' },
      { rank: 5, pointsNeeded: 4, requiresPersona: 'Death' },
      { rank: 6, pointsNeeded: 4, requiresPersona: 'Death' },
      { rank: 7, pointsNeeded: 5, requiresPersona: 'Death' },
      { rank: 8, pointsNeeded: 5, requiresPersona: 'Death' },
      { rank: 9, pointsNeeded: 5, requiresPersona: 'Death' },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Temperance: {
    arcana: 'Temperance',
    name: 'Sadayo Kawakami',
    maxRank: 10,
    availableTimeslots: ['evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0, cost: 5000 },
      { rank: 2, pointsNeeded: 3, cost: 5000 },
      { rank: 3, pointsNeeded: 3, cost: 5000 },
      { rank: 4, pointsNeeded: 3, cost: 5000 },
      { rank: 5, pointsNeeded: 4, cost: 5000 },
      { rank: 6, pointsNeeded: 4, cost: 5000 },
      { rank: 7, pointsNeeded: 5, cost: 5000 },
      { rank: 8, pointsNeeded: 5, cost: 5000 },
      { rank: 9, pointsNeeded: 5, cost: 5000 },
      { rank: 10, pointsNeeded: 0, cost: 5000 },
    ],
 },
  Moon: {
    arcana: 'Moon',
    name: 'Yuuki Mishima',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Sun: {
    arcana: 'Sun',
    name: 'Toranosuke Yoshida',
    maxRank: 10,
    availableTimeslots: ['evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Emperor: {
    arcana: 'Emperor',
    name: 'Yusuke Kitagawa',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Priestess: {
    arcana: 'Priestess',
    name: 'Makoto Niijima',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Hermit: {
    arcana: 'Hermit',
    name: 'Futaba Sakura',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Fortune: {
    arcana: 'Fortune',
    name: 'Chihaya Mifune',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0, cost: 100000 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Devil: {
    arcana: 'Devil',
    name: 'Ichiko Ohya',
    maxRank: 10,
    availableTimeslots: ['evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Tower: {
    arcana: 'Tower',
    name: 'Shinya Oda',
    maxRank: 10,
    availableTimeslots: ['evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Star: {
    arcana: 'Star',
    name: 'Hifumi Togo',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Hanged: {
    arcana: 'Hanged',
    name: 'Munehisa Iwai',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Empress: {
    arcana: 'Empress',
    name: 'Haru Okumura',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Justice: {
    arcana: 'Justice',
    name: 'Goro Akechi',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Councillor: {
    arcana: 'Councillor',
    name: 'Takuto Maruki',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    unlockDate: '2016-04-12',
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 4 },
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
  Faith: {
    arcana: 'Faith',
    name: 'Kasumi Yoshizawa',
    maxRank: 10,
    availableTimeslots: ['afternoon', 'evening'],
    location: 'Shibuya',
    transportCost: 0,
    unlockDate: '2016-04-12',
    ranks: [
      { rank: 1, pointsNeeded: 0 },
      { rank: 2, pointsNeeded: 3 },
      { rank: 3, pointsNeeded: 3 },
      { rank: 4, pointsNeeded: 3 },
      { rank: 5, pointsNeeded: 4 },
      { rank: 6, pointsNeeded: 0,  forced: true}, // Rank 6 is story-forced
      { rank: 7, pointsNeeded: 5 },
      { rank: 8, pointsNeeded: 5 },
      { rank: 9, pointsNeeded: 5 },
      { rank: 10, pointsNeeded: 0 },
    ],
 },
}

// Jazz Jin stat boosts that can be learned (blocks evening slot)
export interface JazzJinStatUp {
  name: string
  date: string // Date when this stat boost becomes available
  stat: string // Stat boosted (e.g., "HP", "SP", "Attack", "Defense", "Magic", "Endurance", "Agility", "Luck")
  target?: string // Party member who receives the boost (optional, applies to all if not specified)
}

export const jazzJinStatUps: JazzJinStatUp[] = [
  { name: 'HP Up', date: '2016-05-07', stat: 'HP' },
  { name: 'SP Up', date: '2016-05-14', stat: 'SP' },
  { name: 'Attack Up', date: '2016-05-21', stat: 'Attack' },
  { name: 'Defense Up', date: '2016-05-28', stat: 'Defense' },
  { name: 'Magic Up', date: '2016-06-04', stat: 'Magic' },
  { name: 'Endurance Up', date: '2016-06-11', stat: 'Endurance' },
  { name: 'Agility Up', date: '2016-06-18', stat: 'Agility' },
  { name: 'Luck Up', date: '2016-06-25', stat: 'Luck' },
]

// Jazz Jin skills that can be learned (blocks evening slot)
export interface JazzJinSkill {
  name: string
  date: string // Date when this skill becomes available (YYYY-MM-DD format)
  description: string // Description of what the skill does
  target: 'Party' | 'All' // Applies to all party members
}

export const jazzJinSkills: JazzJinSkill[] = [
  // June
  {
    name: 'Tetrakarn',
    date: '2016-06-26',
    description: 'Create a shield on 1 ally to repel 1 Phys attack.',
    target: 'Party',
 },
  // July
  {
    name: 'Matarukaja',
    date: '2016-07-03',
    description: "Increase party's Attack power for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Marakukaja',
    date: '2016-07-17',
    description: "Increase party's Defense for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Masukukaja',
    date: '2016-07-31',
    description: "Increase party's Agility for 3 turns.",
    target: 'Party',
 },
  // August
  {
    name: 'Matarunda',
    date: '2016-08-07',
    description: "Decrease all foes' Attack power for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Marakunda',
    date: '2016-08-14',
    description: "Decrease all foes' Defense for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Masukunda',
    date: '2016-08-28',
    description: "Decrease all foes' Agility for 3 turns.",
    target: 'Party',
 },
  // September
  {
    name: 'Charge',
    date: '2016-09-04',
    description: "Multiply user's next Phys attack damage by 2.5.",
    target: 'Party',
 },
  {
    name: 'Concentrate',
    date: '2016-09-25',
    description: "Multiply user's next magical attack damage by 2.5.",
    target: 'Party',
 },
  // October
  {
    name: 'Tetrakarn',
    date: '2016-10-02',
    description: 'Create a shield on 1 ally to repel 1 Phys attack.',
    target: 'Party',
 },
  {
    name: 'Matarukaja',
    date: '2016-10-09',
    description: "Increase party's Attack power for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Marakukaja',
    date: '2016-10-16',
    description: "Increase party's Defense for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Masukukaja',
    date: '2016-10-23',
    description: "Increase party's Agility for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Makarakarn',
    date: '2016-10-30',
    description: 'Create a shield on 1 ally to repel 1 magical attack.',
    target: 'Party',
 },
  // November
  {
    name: 'Matarunda',
    date: '2016-11-06',
    description: "Decrease all foes' Attack power for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Marakunda',
    date: '2016-11-13',
    description: "Decrease all foes' Defense for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Masukunda',
    date: '2016-11-27',
    description: "Decrease all foes' Agility for 3 turns.",
    target: 'Party',
 },
  // December
  {
    name: 'Heat Riser',
    date: '2016-12-04',
    description: "Increase 1 ally's Attack, Defense, and Agility for 3 turns.",
    target: 'Party',
 },
  {
    name: 'Debilitate',
    date: '2016-12-11',
    description: "Decrease 1 foe's Attack, Defense, and Agility for 3 turns.",
    target: 'Party',
 },
  // January
  {
    name: 'Ali Dance',
    date: '2017-01-15',
    description: 'Halves hit rate of all incoming attacks.',
    target: 'Party',
 },
  {
    name: 'Arms Master',
    date: '2017-01-22',
    description: 'Halves HP cost when using physical skills.',
    target: 'Party',
 },
  {
    name: 'Spell Master',
    date: '2017-01-29',
    description: 'Halves SP cost when using magic skills.',
    target: 'Party',
 },
]

// Navigator Skills (Futaba-specific, requires bringing Futaba to Jazz Jin)
export interface NavigatorSkill {
  name: string
  visit: number // Which visit (1-4)
  description: string
  date?: string // User-selected date from available Jazz Jin skill dates
}

export const navigatorSkills: NavigatorSkill[] = [
  {
    name: 'Support Plus 1',
    visit: 1,
    description: 'Chance to trigger Masukunda.',
 },
  {
    name: 'Support Plus 2',
    visit: 2,
    description: 'Chance to trigger Masukunda and Marakunda.',
 },
  {
    name: 'Support Plus 3',
    visit: 3,
    description: 'Chance to trigger Masukunda, Marakunda, and Matarunda.',
 },
  {
    name: 'Support Rate Up',
    visit: 4,
    description: 'Moral Support is activated more frequently.',
 },
]
