// Main scheduler algorithm for Persona 5 Royal

import type { ConfidantData } from './data/confidants'
import { confidantData, jazzJinSkills, navigatorSkills, jazzJinStatUps } from './data/confidants'
import { dungeons, getOptimalDungeonDate } from './data/dungeons'
import type { JazzJinStatUp, JazzJinSkill } from './data/confidants'

export interface DaySchedule {
  date: string
  month: number
  day: number
  dayOfWeek: string
  morning?: string
  afternoon?: string
  evening?: string
  lateNight?: string
  notes?: string[]
  moneySpent?: number
  moneyNeeded?: number
}

export interface ConfidantState {
  arcana: string
  currentRank: number
  currentPoints: number
  nextRankPoints: number
  requiresPersona: boolean
  cost: number
}

export interface SchedulerConfig {
  jazzJinSkills: string[] // User-selected Jazz Jin skills (by name)
  jazzJinStatUps?: Record<string, number> // Stat up name -> number of visits
  navigatorSkills?: Record<number, string> // Navigator skill visit -> date mapping
  personaStock: string[] // Personas currently in stock
  startingMoney: number
  startingDate: string
}

export interface SchedulerResult {
  schedule: DaySchedule[]
  confidantStates: Record<string, ConfidantState>
  totalMoneySpent: number
  totalMoneyNeeded: number
  nextDungeonDate?: string
  nextDungeonName?: string
  arcanasNeededUntilDungeon: string[]
  moneyNeededUntilDungeon: number
  arcanasNeededDuringDungeon?: string[] // Arcanas needed for confidants during dungeon period
}

// Calculate money needed for confidant activities
function calculateConfidantCost(
  confidant: ConfidantData,
  rank: number,
  personaInStock: boolean,
): number {
  const rankData = confidant.ranks[rank - 1]
  if (!rankData) return 0

  let cost = rankData.cost || 0
  cost += confidant.transportCost || 0

  // If persona is needed but not in stock, add fusion cost (estimated)
  if (rankData.requiresPersona && !personaInStock) {
    cost += 50000 // Estimated fusion cost
  }

  return cost
}

// Check if Faith should be forced (before Rank 6)
function shouldForceFaith(date: string, currentRank: number): boolean {
  if (currentRank >= 6) return false

  // Faith is forced when available before Rank 6
  const faithData = confidantData['Faith']
  if (!faithData.unlockDate) return false

  return date >= faithData.unlockDate && currentRank < 6
}

// Prioritize confidants that need personas in stock
function getConfidantPriority(
  confidant: ConfidantData,
  state: ConfidantState,
  personaInStock: boolean,
): number {
  let priority = 1000

  // Higher priority if persona is needed and in stock
  if (state.requiresPersona && personaInStock) {
    priority += 500
  }

  // Lower priority if persona is needed but not in stock
  if (state.requiresPersona && !personaInStock) {
    priority -= 200
  }

  // Higher priority for confidants closer to max rank
  const remainingRanks = confidant.maxRank - state.currentRank
  priority += (confidant.maxRank - remainingRanks) * 10

  // Higher priority for lower cost
  priority += Math.max(0, 100 - state.cost / 1000)

  return priority
}

// Main scheduler function
export function generateSchedule(calendar: any, config: SchedulerConfig): SchedulerResult {
  const schedule: DaySchedule[] = []
  const confidantStates: Record<string, ConfidantState> = {}
  let totalMoneySpent = 0
  let currentMoney = config.startingMoney

  // Initialize confidant states
  for (const [arcana, data] of Object.entries(confidantData)) {
    confidantStates[arcana] = {
      arcana,
      currentRank: 1,
      currentPoints: 0,
      nextRankPoints: data.ranks[1]?.pointsNeeded || 0,
      requiresPersona: data.ranks[1]?.requiresPersona !== undefined,
      cost: calculateConfidantCost(data, 1, config.personaStock.includes(arcana)),
    }
  }

  // Track Jazz Jin usage
  const jazzJinDates = new Set<string>()
  const jazzJinSkillsByDate = new Map<string, string>()
  const jazzJinStatUpCounts = new Map<string, number>() // Stat up name -> remaining visits
  const jazzJinStatUpDates = new Map<string, string[]>() // Stat up name -> dates used

  // Initialize stat up visit counts
  if (config.jazzJinStatUps) {
    for (const [statUpName, count] of Object.entries(config.jazzJinStatUps)) {
      if (count > 0) {
        jazzJinStatUpCounts.set(statUpName, count)
        jazzJinStatUpDates.set(statUpName, [])
      }
    }
  }

  // Find next dungeon
  let nextDungeon: (typeof dungeons)[0] | undefined
  let nextDungeonDate: string | undefined
  let nextDungeonDayIndex = -1

  for (let i = 0; i < calendar.days.length; i++) {
    const day = calendar.days[i]
    if (day.dungeonStart && nextDungeonDayIndex === -1) {
      nextDungeonDayIndex = i
      nextDungeon = dungeons.find((d) => d.name === day.dungeonName)
      if (nextDungeon) {
        nextDungeonDate = getOptimalDungeonDate(nextDungeon)
      }
      break
    }
  }

  // Process each day
  for (let i = 0; i < calendar.days.length; i++) {
    const day = calendar.days[i]
    const year = day.year || 2016
    const dateStr = `${year}-${String(day.month).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`

    const daySchedule: DaySchedule = {
      date: dateStr,
      month: day.month,
      day: day.day,
      dayOfWeek: day.dayOfWeek,
      notes: [],
    }

    // Skip if story event or blocked
    if (day.timeslots?.morning === 'blocked' || day.timeslots === undefined) {
      schedule.push(daySchedule)
      continue
    }

    // Check if this is a dungeon day
    if (nextDungeon && nextDungeonDate && dateStr === nextDungeonDate) {
      daySchedule.afternoon = `Dungeon: ${nextDungeon.name}`
      daySchedule.evening = 'Rest after dungeon'
      daySchedule.notes?.push(
        `Complete ${nextDungeon.name} (${nextDungeon.timeNeeded} day(s) needed)`,
      )
      schedule.push(daySchedule)

      // Mark dungeon as completed, find next one
      nextDungeon = undefined
      nextDungeonDate = undefined
      for (let j = i + 1; j < calendar.days.length; j++) {
        const futureDay = calendar.days[j]
        if (futureDay && futureDay.dungeonStart) {
          nextDungeon = dungeons.find((d) => d.name === futureDay.dungeonName)
          if (nextDungeon) {
            nextDungeonDate = getOptimalDungeonDate(nextDungeon)
          }
          break
        }
      }
      continue
    }

    // Check for Navigator Skills first (Futaba-specific)
    if (
      day.dayOfWeek === 'Sunday' &&
      day.timeslots.evening === 'available' &&
      config.navigatorSkills &&
      !jazzJinDates.has(dateStr)
    ) {
      // Check if this date is used for a navigator skill
      const navigatorVisit = Object.entries(config.navigatorSkills).find(
        ([_, date]) => date === dateStr,
      )
      if (navigatorVisit) {
        const visit = Number(navigatorVisit[0])
        const navSkill = navigatorSkills.find((s) => s.visit === visit)
        if (navSkill) {
          daySchedule.evening = `Jazz Jin: ${navSkill.name} (Navigator)`
          jazzJinDates.add(dateStr)
          schedule.push(daySchedule)
          continue
        }
      }
    }

    // Check for Jazz Jin skills (only on Sundays, and if user selected skills)
    if (
      day.dayOfWeek === 'Sunday' &&
      day.timeslots.evening === 'available' &&
      config.jazzJinSkills.length > 0 &&
      !jazzJinDates.has(dateStr)
    ) {
      // Find Jazz Jin skill for this date
      const skillForDate = jazzJinSkills.find((skill) => skill.date === dateStr)
      if (skillForDate && config.jazzJinSkills.includes(skillForDate.name)) {
        daySchedule.evening = `Jazz Jin: ${skillForDate.name}`
        jazzJinDates.add(dateStr)
        jazzJinSkillsByDate.set(dateStr, skillForDate.name)
        schedule.push(daySchedule)
        continue
      }
    }

    // Get available confidants for this day
    const availableConfidants = day.availableSocialLinks || []

    // Filter by availability and requirements
    const eligibleConfidants = availableConfidants
      .map((arcana) => {
        const data = confidantData[arcana]
        const state = confidantStates[arcana]
        return { arcana, data, state }
      })
      .filter(({ data, state }) => {
        if (!data || !state) return false
        if (state.currentRank >= data.maxRank) return false

        // Check unlock date
        if (data.unlockDate && dateStr < data.unlockDate) return false

        // Check if confidant is available on this day
        const availableTimeslots = data.availableTimeslots
        const hasAvailableSlot =
          (day.timeslots.afternoon === 'available' &&
            availableTimeslots.includes('afternoon') &&
            !daySchedule.afternoon) ||
          (day.timeslots.evening === 'available' &&
            availableTimeslots.includes('evening') &&
            !daySchedule.evening &&
            !jazzJinDates.has(dateStr))

        return hasAvailableSlot
      })

    // Check for forced Faith
    const faithState = confidantStates['Faith']
    if (shouldForceFaith(dateStr, faithState?.currentRank || 0)) {
      const faithData = confidantData['Faith']
      if (faithData && faithState && faithState.currentRank < 6) {
        // Force Faith confidant
        if (
          day.timeslots.afternoon === 'available' &&
          faithData.availableTimeslots.includes('afternoon')
        ) {
          daySchedule.afternoon = `Confidant: Faith (Forced)`
          faithState.currentRank++
          faithState.currentPoints = 0
          if (faithState.currentRank < faithData.maxRank) {
            const nextRank = faithData.ranks[faithState.currentRank]
            faithState.nextRankPoints = nextRank?.pointsNeeded || 0
            faithState.requiresPersona = nextRank?.requiresPersona !== undefined
            faithState.cost = calculateConfidantCost(
              faithData,
              faithState.currentRank + 1,
              config.personaStock.includes('Faith'),
            )
          }
          schedule.push(daySchedule)
          continue
        }
      }
    }

    // Sort by priority (personas in stock first)
    eligibleConfidants.sort((a, b) => {
      const priorityA = getConfidantPriority(
        a.data,
        a.state,
        config.personaStock.includes(a.arcana),
      )
      const priorityB = getConfidantPriority(
        b.data,
        b.state,
        config.personaStock.includes(b.arcana),
      )
      return priorityB - priorityA
    })

    // Schedule confidants
    for (const { arcana, data, state } of eligibleConfidants) {
      if (state.currentRank >= data.maxRank) continue

      // Find available timeslot
      let timeslot: 'afternoon' | 'evening' | undefined
      if (
        day.timeslots.afternoon === 'available' &&
        data.availableTimeslots.includes('afternoon') &&
        !daySchedule.afternoon
      ) {
        timeslot = 'afternoon'
      } else if (
        day.timeslots.evening === 'available' &&
        data.availableTimeslots.includes('evening') &&
        !daySchedule.evening
      ) {
        timeslot = 'evening'
      }

      if (timeslot) {
        const personaInStock = config.personaStock.includes(arcana)
        const nextRankIndex = state.currentRank // Current rank is index, next is currentRank
        const nextRank = data.ranks[nextRankIndex]

        if (!nextRank) continue // Already at max rank

        const cost = calculateConfidantCost(data, state.currentRank + 1, personaInStock)

        // Check if we have enough money
        if (currentMoney >= cost) {
          daySchedule[timeslot] = `Confidant: ${arcana}`
          daySchedule.moneySpent = (daySchedule.moneySpent || 0) + cost

          // Update state - assume best answers give max points (3)
          const pointsGained = 3
          state.currentPoints += pointsGained

          // Check if rank up
          // Rank 1 is already at rank 1, so we don't rank up to it
          // Rank 10 is forced and happens automatically when reached
          if (
            (nextRank.forced && nextRank.rank !== 1) ||
            state.currentPoints >= state.nextRankPoints
          ) {
            state.currentRank++
            state.currentPoints = 0

            if (state.currentRank < data.maxRank) {
              const newNextRank = data.ranks[state.currentRank]
              if (newNextRank) {
                state.nextRankPoints = newNextRank.pointsNeeded || 0
                state.requiresPersona = newNextRank.requiresPersona !== undefined
                state.cost = calculateConfidantCost(data, state.currentRank + 1, personaInStock)
              }
            } else {
              // Maxed out (reached rank 10)
              state.nextRankPoints = 0
              state.requiresPersona = false
              state.cost = 0
            }
          }

          currentMoney -= cost
          totalMoneySpent += cost
          break
        } else {
          daySchedule.notes?.push(`Need ${cost - currentMoney} more yen for ${arcana}`)
        }
      }
    }

    // After trying confidants, try to schedule Jazz Jin Stat Ups if slots are available
    // Only schedule if there are still available slots and we haven't met the required visits
    if (
      day.dayOfWeek === 'Sunday' &&
      day.timeslots.evening === 'available' &&
      !daySchedule.evening &&
      !jazzJinDates.has(dateStr) &&
      config.jazzJinStatUps
    ) {
      // Find stat ups that still need visits
      for (const [statUpName, remainingCount] of jazzJinStatUpCounts.entries()) {
        if (remainingCount > 0) {
          const statUp = jazzJinStatUps.find((s) => s.name === statUpName)
          if (statUp && dateStr >= statUp.date) {
            daySchedule.evening = `Jazz Jin: ${statUpName} (Stat Up)`
            jazzJinDates.add(dateStr)
            jazzJinStatUpCounts.set(statUpName, remainingCount - 1)
            const datesUsed = jazzJinStatUpDates.get(statUpName) || []
            datesUsed.push(dateStr)
            jazzJinStatUpDates.set(statUpName, datesUsed)
            break
          }
        }
      }
    }

    schedule.push(daySchedule)
  }

  // Calculate money and arcanas needed until next dungeon
  let moneyNeededUntilDungeon = 0
  const arcanasNeededUntilDungeon: string[] = []
  const arcanasNeededDuringDungeon: string[] = []

  if (nextDungeonDate && nextDungeon) {
    // Find the dungeon start date
    const dungeonStartDate = nextDungeon.startDate

    for (let i = 0; i < schedule.length; i++) {
      const day = schedule[i]

      // Arcanas needed until dungeon (before dungeon starts)
      if (day.date < dungeonStartDate) {
        moneyNeededUntilDungeon += day.moneySpent || 0

        if (day.afternoon?.startsWith('Confidant:')) {
          const arcana = day.afternoon.replace('Confidant: ', '').trim()
          if (!arcanasNeededUntilDungeon.includes(arcana)) {
            arcanasNeededUntilDungeon.push(arcana)
          }
        }
        if (day.evening?.startsWith('Confidant:')) {
          const arcana = day.evening.replace('Confidant: ', '').trim()
          if (!arcanasNeededUntilDungeon.includes(arcana)) {
            arcanasNeededUntilDungeon.push(arcana)
          }
        }
      }

      // Arcanas needed during dungeon period (from start to optimal date)
      if (day.date >= dungeonStartDate && day.date < nextDungeonDate) {
        if (day.afternoon?.startsWith('Confidant:')) {
          const arcana = day.afternoon.replace('Confidant: ', '').trim()
          if (!arcanasNeededDuringDungeon.includes(arcana)) {
            arcanasNeededDuringDungeon.push(arcana)
          }
        }
        if (day.evening?.startsWith('Confidant:')) {
          const arcana = day.evening.replace('Confidant: ', '').trim()
          if (!arcanasNeededDuringDungeon.includes(arcana)) {
            arcanasNeededDuringDungeon.push(arcana)
          }
        }
      }

      if (day.date >= nextDungeonDate) break
    }
  }

  return {
    schedule,
    confidantStates,
    totalMoneySpent,
    totalMoneyNeeded: moneyNeededUntilDungeon,
    nextDungeonDate,
    nextDungeonName: nextDungeon?.name,
    arcanasNeededUntilDungeon,
    moneyNeededUntilDungeon,
    arcanasNeededDuringDungeon:
      arcanasNeededDuringDungeon.length > 0 ? arcanasNeededDuringDungeon : undefined,
  }
}
