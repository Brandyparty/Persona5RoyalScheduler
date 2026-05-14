<script setup lang="ts">
import { ref, computed } from 'vue'
import calendar from '../res/p5rcalendar.json'
import { generateSchedule, type SchedulerConfig, type SchedulerResult } from './scheduler'
import { jazzJinSkills } from './data/confidants'

// User configuration
const jazzJinStatUpVisits = ref<Record<string, number>>({}) // Stat up name -> number of visits
const selectedJazzJinSkillDates = ref<string[]>([])
const navigatorSkillDates = ref<Record<number, string>>({}) // visit number -> date
const personaStock = ref<string[]>([])
const startingMoney = ref(0)
const startingDate = ref('2016-04-09')

// Available Jazz Jin stat ups
//const availableJazzStatUps = jazzJinStatUps.map((statUp) => statUp.name)
// Available Jazz Jin skills (filter out event days)
//const availableJazzSkills = jazzJinSkills

// Get dates used by navigator skills
/*
const datesUsedByNavigator = computed(() => {
  return Object.values(navigatorSkillDates.value)
})
*/

// Get available dates for navigator skills (dates not used by selected Jazz Jin skills)
/*
const availableNavigatorDates = computed(() => {
  return jazzJinSkills
    .filter((skill) => {
      // Exclude event days
      if (skill.isEventDay) return false
      // Exclude if the skill is selected
      if (selectedJazzJinSkillDates.value.includes(skill.name)) return false
      // Exclude if already used by another navigator skill
      if (datesUsedByNavigator.value.includes(skill.date)) return false
      return true
    })
    .map((skill) => ({
      date: skill.date,
      label: `${skill.date} - ${skill.name}`,
    }))
})
*/

// Available Arcanas for persona stock
const availableArcanas = [
  'Hierophant',
  'Lovers',
  'Chariot',
  'Death',
  'Temperance',
  'Moon',
  'Sun',
  'Emperor',
  'Priestess',
  'Hermit',
  'Fortune',
  'Devil',
  'Tower',
  'Star',
  'Hanged',
  'Empress',
  'Justice',
  'Councillor',
  'Faith',
]

// Schedule result (only calculated when button is clicked)
const scheduleResult = ref<SchedulerResult | null>(null)
const isGenerating = ref(false)
const generationError = ref<string | null>(null)

// Generate schedule function (called on button click)
function generateScheduleClick() {
  isGenerating.value = true
  generationError.value = null

  try {
    const config: SchedulerConfig = {
      jazzJinSkills: selectedJazzJinSkillDates.value,
      jazzJinStatUps: Object.fromEntries(
        Object.entries(jazzJinStatUpVisits.value).filter(([, count]) => count > 0),
      ),
      navigatorSkills: navigatorSkillDates.value,
      personaStock: personaStock.value,
      startingMoney: startingMoney.value,
      startingDate: startingDate.value,
    }

    scheduleResult.value = generateSchedule(calendar, config)
  } catch (error) {
    console.error('Schedule generation error:', error)
    generationError.value = error instanceof Error ? error.message : 'Unknown error occurred'
    scheduleResult.value = null
  } finally {
    isGenerating.value = false
  }
}

// Update Jazz Jin stat up visit count
/*
function updateJazzJinStatUpVisits(statUp: string, count: number) {
  if (count > 0) {
    jazzJinStatUpVisits.value[statUp] = count
  } else {
    delete jazzJinStatUpVisits.value[statUp]
  }
}
*/


// Toggle Jazz Jin skill selection
function toggleJazzJinSkill(skillName: string, skillDate: string) {
  const index = selectedJazzJinSkillDates.value.indexOf(skillDate)
  if (index > -1) {
    selectedJazzJinSkillDates.value.splice(index, 1)
  } else {
    // Find the skill to get its date
    const skill = jazzJinSkills.find((s) => s.name === skillName)
    if (skill) {
      // Check if this date is used by a navigator skill
      const dateUsedByNavigator = Object.entries(navigatorSkillDates.value).find(
        ([, date]) => date === skill.date,
      )
      if (dateUsedByNavigator) {
        // Remove from navigator skills
        delete navigatorSkillDates.value[Number(dateUsedByNavigator[0])]
      }
      selectedJazzJinSkillDates.value.push(skillName)
    }
  }
}

// Update navigator skill date
/*
function updateNavigatorSkillDate(visit: number, date: string) {
  if (date) {
    navigatorSkillDates.value[visit] = date
  } else {
    delete navigatorSkillDates.value[visit]
  }
}
*/

// Toggle persona in stock
/*
function togglePersonaStock(arcana: string) {
  const index = personaStock.value.indexOf(arcana)
  if (index > -1) {
    personaStock.value.splice(index, 1)
  } else {
    personaStock.value.push(arcana)
  }
}
*/

// Format money
function formatMoney(amount: number): string {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount)
}
</script>

<template>
  <div class="scheduler-container">
    <h1>Persona 5 Royal Scheduler</h1>

    <!-- Configuration Panel -->
    <div class="config-panel">
      <h2>Configuration</h2>

      <div class="config-section">
        <label>
          Starting Money:
          <input type="number" v-model.number="startingMoney" min="0" />
        </label>
      </div>

      <!--
      <div class="config-section">
        <h3>Jazz Jin Stat Ups (blocks evening slot)</h3>
        <p class="section-note">
          Enter how many times you want to visit Jazz Jin for each stat up. The scheduler will
          prioritize confidants but schedule these when slots are available.
        </p>
        <div class="stat-up-list">
          <label v-for="statUp in availableJazzStatUps" :key="statUp" class="stat-up-item">
            <span class="stat-up-name">{{ statUp }}</span>
            <input
              type="number"
              :value="jazzJinStatUpVisits[statUp] || 0"
              min="0"
              max="50"
              @change="
                updateJazzJinStatUpVisits(statUp, Number(($event.target as HTMLInputElement).value))
              "
              class="stat-up-input"
            />
            <span class="stat-up-label">visits</span>
          </label>
        </div>
      </div>
      -->

      <div class="config-section">
        <h3>Jazz Jin Skills (blocks evening slot)</h3>
        <div class="skill-list">
          <label
            v-for="skill in jazzJinSkills"
            :key="skill.name"
            class="skill-checkbox"
          >
            <input
              type="checkbox"
              :value="skill.name"
              :checked="selectedJazzJinSkillDates.includes(skill.date)"
              @change="toggleJazzJinSkill(skill.name, skill.date)"
            />
            <span class="skill-info">
              <strong>{{ skill.name }}</strong>
              <span class="skill-date">{{ skill.date }}</span>
              <span class="skill-desc">{{ skill.description }}</span>
            </span>
          </label>
        </div>
      </div>

      <!--
      <div class="config-section">
        <h3>Navigator Skills (Futaba - blocks evening slot)</h3>
        <p class="section-note">
          Select dates for Futaba's Navigator skills. Dates used here become unavailable for regular
          Jazz Jin skills.
        </p>
        <div class="navigator-skills">
          <div
            v-for="navSkill in navigatorSkills"
            :key="navSkill.visit"
            class="navigator-skill-item"
          >
            <label class="navigator-skill-label">
              <strong>{{ navSkill.name }}</strong> (Visit {{ navSkill.visit }})
              <span class="skill-desc">{{ navSkill.description }}</span>
            </label>
            <select
              :value="navigatorSkillDates[navSkill.visit] || ''"
              @change="
                updateNavigatorSkillDate(navSkill.visit, ($event.target as HTMLSelectElement).value)
              "
              class="date-select"
            >
              <option value="">-- Select Date --</option>
              <option
                v-for="dateOption in availableNavigatorDates"
                :key="dateOption.date"
                :value="dateOption.date"
              >
                {{ dateOption.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
      -->

      <!--
      <div class="config-section">
        <h3>Personas in Stock (prioritized by scheduler)</h3>
        <div class="persona-list">
          <label v-for="arcana in availableArcanas" :key="arcana" class="persona-checkbox">
            <input
              type="checkbox"
              :value="arcana"
              :checked="personaStock.includes(arcana)"
              @change="togglePersonaStock(arcana)"
            />
            {{ arcana }}
          </label>
        </div>
      </div>
      -->

      <div class="config-section">
        <button @click="generateScheduleClick" :disabled="isGenerating" class="generate-button">
          {{ isGenerating ? 'Generating Schedule...' : 'Generate Schedule' }}
        </button>
        <p v-if="generationError" class="error-message">{{ generationError }}</p>
      </div>
    </div>

    <!-- Schedule Summary -->
    <div v-if="scheduleResult" class="summary-panel">
      <h2>Schedule Summary</h2>

      <div class="summary-stats">
        <div class="stat">
          <strong>Total Money Spent:</strong> {{ formatMoney(scheduleResult.totalMoneySpent) }}
        </div>
        <div v-if="scheduleResult.nextDungeonName" class="stat">
          <strong>Next Dungeon:</strong> {{ scheduleResult.nextDungeonName }}
          <br />
          <strong>Optimal Date:</strong> {{ scheduleResult.nextDungeonDate }}
        </div>
        <div v-if="scheduleResult.arcanasNeededUntilDungeon.length > 0" class="stat">
          <strong>Arcanas Needed Until Dungeon:</strong>
          <ul>
            <li v-for="arcana in scheduleResult.arcanasNeededUntilDungeon" :key="arcana">
              {{ arcana }}
            </li>
          </ul>
        </div>
        <div
          v-if="
            scheduleResult.arcanasNeededDuringDungeon &&
            scheduleResult.arcanasNeededDuringDungeon.length > 0
          "
          class="stat"
        >
          <strong>Arcanas Needed During Dungeon Period:</strong>
          <ul>
            <li v-for="arcana in scheduleResult.arcanasNeededDuringDungeon" :key="arcana">
              {{ arcana }}
            </li>
          </ul>
        </div>
        <div class="stat">
          <strong>Money Needed Until Dungeon:</strong>
          {{ formatMoney(scheduleResult.moneyNeededUntilDungeon) }}
        </div>
      </div>

      <!-- Confidant Progress -->
      <div class="confidant-progress">
        <h3>Confidant Progress</h3>
        <div class="confidant-grid">
          <div
            v-for="(state, arcana) in scheduleResult.confidantStates"
            :key="arcana"
            class="confidant-card"
            :class="{
              maxed: state.currentRank >= 10,
              'needs-persona': state.requiresPersona && !personaStock.includes(arcana),
            }"
          >
            <div class="confidant-name">{{ arcana }}</div>
            <div class="confidant-rank">Rank: {{ state.currentRank }}/10</div>
            <div v-if="state.requiresPersona" class="persona-required">
              Requires Persona:
              {{ personaStock.includes(arcana) ? '✓ In Stock' : '✗ Not in Stock' }}
            </div>
            <div class="confidant-cost">Next Cost: {{ formatMoney(state.cost) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Schedule -->
    <div v-if="scheduleResult" class="schedule-panel">
      <h2>Daily Schedule ({{ scheduleResult.schedule.length }} days)</h2>
      <div class="schedule-list">
        <div v-for="(day, index) in scheduleResult.schedule" :key="index" class="schedule-day">
          <div class="day-header">{{ day.month }}/{{ day.day }} ({{ day.dayOfWeek }})</div>
          <div class="day-activities">
            <div v-if="day.morning" class="activity morning">
              <strong>Morning:</strong> {{ day.morning }}
            </div>
            <div v-if="day.afternoon" class="activity afternoon">
              <strong>Afternoon:</strong> {{ day.afternoon }}
            </div>
            <div v-if="day.evening" class="activity evening">
              <strong>Evening:</strong> {{ day.evening }}
            </div>
            <div v-if="day.lateNight" class="activity late-night">
              <strong>Late Night:</strong> {{ day.lateNight }}
            </div>
            <div v-if="day.notes && day.notes.length > 0" class="day-notes">
              <ul>
                <li v-for="(note, noteIndex) in day.notes" :key="noteIndex">{{ note }}</li>
              </ul>
            </div>
            <div v-if="day.moneySpent" class="day-money">
              Money Spent: {{ formatMoney(day.moneySpent) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scheduler-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #e91e63;
  text-align: center;
}

h2 {
  color: #9c27b0;
  border-bottom: 2px solid #9c27b0;
  padding-bottom: 10px;
}

h3 {
  color: #673ab7;
  margin-top: 20px;
}

.config-panel {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.config-section {
  margin-bottom: 20px;
}

.config-section label {
  display: block;
  margin-bottom: 10px;
}

.config-section input[type='number'] {
  padding: 5px;
  margin-left: 10px;
  width: 150px;
}

.skill-list,
.persona-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.skill-checkbox,
.persona-checkbox {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  background: white;
  border-radius: 4px;
}

.stat-up-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.stat-up-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.stat-up-name {
  flex: 1;
  font-weight: 500;
}

.stat-up-input {
  width: 80px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

.stat-up-label {
  font-size: 0.9em;
  color: #666;
}

.no-skills {
  margin-top: 10px;
  font-style: italic;
  color: #666;
  font-size: 0.9em;
}

.summary-panel {
  background: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat {
  background: white;
  padding: 15px;
  border-radius: 4px;
}

.stat ul {
  margin: 5px 0;
  padding-left: 20px;
}

.confidant-progress {
  margin-top: 20px;
}

.confidant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.confidant-card {
  background: white;
  padding: 10px;
  border-radius: 4px;
  border: 2px solid #ddd;
}

.confidant-card.maxed {
  border-color: #4caf50;
  background: #e8f5e9;
}

.confidant-card.needs-persona {
  border-color: #ff9800;
  background: #fff3e0;
}

.confidant-name {
  font-weight: bold;
  color: #9c27b0;
  margin-bottom: 5px;
}

.confidant-rank {
  margin-bottom: 5px;
}

.persona-required {
  font-size: 0.9em;
  color: #ff9800;
  margin-bottom: 5px;
}

.confidant-cost {
  font-size: 0.9em;
  color: #666;
}

.schedule-panel {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.schedule-day {
  background: white;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #9c27b0;
}

.day-header {
  font-weight: bold;
  color: #9c27b0;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.day-activities {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.activity {
  padding: 5px;
  border-radius: 3px;
}

.activity.morning {
  background: #fff9c4;
}

.activity.afternoon {
  background: #c8e6c9;
}

.activity.evening {
  background: #ffccbc;
}

.activity.late-night {
  background: #b39ddb;
}

.day-notes {
  margin-top: 10px;
  font-size: 0.9em;
  color: #666;
}

.day-notes ul {
  margin: 5px 0;
  padding-left: 20px;
}

.day-money {
  margin-top: 5px;
  font-weight: bold;
  color: #4caf50;
}

.generate-button {
  width: 100%;
  padding: 15px;
  font-size: 1.1em;
  font-weight: bold;
  background: #9c27b0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.generate-button:hover:not(:disabled) {
  background: #7b1fa2;
}

.generate-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 10px;
  padding: 10px;
  background: #ffebee;
  color: #c62828;
  border-radius: 4px;
  border: 1px solid #ef5350;
}
</style>
