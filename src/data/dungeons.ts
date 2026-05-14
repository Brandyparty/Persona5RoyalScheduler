// Dungeon data and timing information

export interface DungeonInfo {
  name: string
  startDate: string
  deadline: string
  timeNeeded: number // Days needed to complete (typically 1-2 days)
  recommendedLevel?: number
  requiredConfidants?: string[] // Confidants that must be at certain ranks
}

export const dungeons: DungeonInfo[] = [
  {
    name: "Kamoshida's Palace",
    startDate: '2016-04-18',
    deadline: '2016-04-29',
    timeNeeded: 1,
    recommendedLevel: 12,
  },
  {
    name: "Madarame's Palace",
    startDate: '2016-05-07',
    deadline: '2016-05-30',
    timeNeeded: 2,
    recommendedLevel: 16,
  },
  {
    name: "Kaneshiro's Palace",
    startDate: '2016-06-11',
    deadline: '2016-06-28',
    timeNeeded: 1,
    recommendedLevel: 25,
  },
  {
    name: "Futaba's Palace",
    startDate: '2016-07-09',
    deadline: '2016-07-31',
    timeNeeded: 1,
    recommendedLevel: 28,
  },
  {
    name: "Okumura's Palace",
    startDate: '2016-08-21',
    deadline: '2016-09-19',
    timeNeeded: 1,
    recommendedLevel: 40,
  },
  {
    name: "Sae's Palace",
    startDate: '2016-10-02',
    deadline: '2016-11-18',
    timeNeeded: 1,
    recommendedLevel: 50,
  },
  {
    name: "Shido's Palace",
    startDate: '2016-11-20',
    deadline: '2016-12-22',
    timeNeeded: 2,
    recommendedLevel: 65,
  },
  {
    name: "Maruki's Palace (Royal)",
    startDate: '2017-01-09',
    deadline: '2017-02-02',
    timeNeeded: 2,
    recommendedLevel: 75,
  },
]

// Calculate when to go into dungeon (typically 1-2 days before deadline)
export function getOptimalDungeonDate(dungeon: DungeonInfo): string {
  const deadline = new Date(dungeon.deadline)
  const daysBefore = dungeon.timeNeeded + 1 // Add buffer day
  deadline.setDate(deadline.getDate() - daysBefore)
  return deadline.toISOString().split('T')[0]
}
