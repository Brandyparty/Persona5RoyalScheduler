// Script to generate comprehensive Persona 5 Royal calendar JSON
// Game runs from April 9, 2016 (Saturday) to March 20, 2017

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Days per month (2016-2017)
const daysInMonth = {
  2016: { 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 },
  2017: { 1: 31, 2: 28, 3: 31 },
}

// Key dungeon dates
const dungeonStarts = {
  '2016-04-18': { name: "Kamoshida's Palace", deadline: '2016-04-29' },
  '2016-05-07': { name: "Madarame's Palace", deadline: '2016-05-30' },
  '2016-06-11': { name: "Kaneshiro's Palace", deadline: '2016-06-28' },
  '2016-07-09': { name: "Futaba's Palace", deadline: '2016-07-31' },
  '2016-08-21': { name: "Okumura's Palace", deadline: '2016-09-19' },
  '2016-10-02': { name: "Sae's Palace", deadline: '2016-11-18' },
  '2016-11-20': { name: "Shido's Palace", deadline: '2016-12-22' },
  '2017-01-09': { name: "Maruki's Palace (Royal)", deadline: '2017-02-02' },
}

// Story event dates (days that are completely blocked)
const storyEventDates = new Set([
  '2016-04-09',
  '2016-04-10',
  '2016-04-11',
  '2016-04-12',
  '2016-04-13',
  '2016-04-14',
  '2016-04-15',
  '2016-04-16',
  '2016-04-17',
  '2016-04-30',
  '2016-05-01',
  '2016-05-02',
  '2016-05-06',
  '2016-05-31',
  '2016-06-01',
  '2016-06-10',
  '2016-06-29',
  '2016-06-30',
  '2016-07-01',
  '2016-07-02',
  '2016-07-03',
  '2016-07-04',
  '2016-07-05',
  '2016-07-06',
  '2016-07-07',
  '2016-07-08',
  '2016-07-30',
  '2016-08-01',
  '2016-08-02',
  '2016-08-03',
  '2016-08-04',
  '2016-08-05',
  '2016-08-06',
  '2016-08-07',
  '2016-08-08',
  '2016-08-09',
  '2016-08-10',
  '2016-08-11',
  '2016-08-12',
  '2016-08-13',
  '2016-08-14',
  '2016-08-15',
  '2016-08-16',
  '2016-08-17',
  '2016-08-18',
  '2016-08-19',
  '2016-08-20',
  '2016-09-18',
  '2016-09-20',
  '2016-09-21',
  '2016-09-22',
  '2016-09-23',
  '2016-09-24',
  '2016-09-25',
  '2016-09-26',
  '2016-09-27',
  '2016-09-28',
  '2016-09-29',
  '2016-09-30',
  '2016-10-01',
  '2016-11-17',
  '2016-11-19',
  '2016-11-21',
  '2016-11-22',
  '2016-11-23',
  '2016-11-24',
  '2016-11-25',
  '2016-11-26',
  '2016-11-27',
  '2016-11-28',
  '2016-11-29',
  '2016-11-30',
  '2016-12-21',
  '2016-12-23',
  '2016-12-24',
  '2016-12-25',
  '2016-12-26',
  '2016-12-27',
  '2016-12-28',
  '2016-12-29',
  '2016-12-30',
  '2016-12-31',
  '2017-01-01',
  '2017-01-02',
  '2017-01-03',
  '2017-01-04',
  '2017-01-05',
  '2017-01-06',
  '2017-01-07',
  '2017-01-08',
  '2017-02-01',
  '2017-02-03',
  '2017-02-04',
  '2017-02-05',
  '2017-02-06',
  '2017-02-07',
  '2017-02-08',
  '2017-02-09',
  '2017-02-10',
  '2017-02-11',
  '2017-02-12',
  '2017-02-13',
  '2017-02-14',
  '2017-02-15',
  '2017-02-16',
  '2017-02-17',
  '2017-02-18',
  '2017-02-19',
  '2017-02-20',
  '2017-02-21',
  '2017-02-22',
  '2017-02-23',
  '2017-02-24',
  '2017-02-25',
  '2017-02-26',
  '2017-02-27',
  '2017-02-28',
  '2017-03-01',
  '2017-03-02',
  '2017-03-03',
  '2017-03-04',
  '2017-03-05',
  '2017-03-06',
  '2017-03-07',
  '2017-03-08',
  '2017-03-09',
  '2017-03-10',
  '2017-03-11',
  '2017-03-12',
  '2017-03-13',
  '2017-03-14',
  '2017-03-15',
  '2017-03-16',
  '2017-03-17',
  '2017-03-18',
  '2017-03-19',
  '2017-03-20',
])

// Social link unlock dates (simplified - many unlock based on story progress)
const socialLinkUnlocks = {
  Magician: '2016-04-09',
  Hierophant: '2016-04-22',
  Lovers: '2016-05-03',
  Chariot: '2016-05-03',
  Death: '2016-05-06',
  Temperance: '2016-05-06',
  Moon: '2016-05-06',
  Sun: '2016-05-06',
  Emperor: '2016-05-31',
  Priestess: '2016-06-20',
  Hermit: '2016-07-25',
  Fortune: '2016-07-25',
  Devil: '2016-07-25',
  Tower: '2016-07-25',
  Star: '2016-07-25',
  Hanged: '2016-07-25',
  Empress: '2016-09-01',
  Justice: '2016-09-01',
  Councillor: '2016-04-12', // Royal - early unlock
  Faith: '2016-04-12', // Royal - early unlock
}

function formatDate(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function getAvailableSocialLinks(dateStr) {
  const available = []
  for (const [link, unlockDate] of Object.entries(socialLinkUnlocks)) {
    // Magician ranks up automatically, so exclude it
    if (link !== 'Magician' && dateStr >= unlockDate) {
      available.push(link)
    }
  }
  return available
}

function generateCalendar() {
  const days = []
  let currentWeekdayIndex = 6 // April 9, 2016 is Saturday (index 6)

  // Start from April 9, 2016
  for (let year = 2016; year <= 2017; year++) {
    const startMonth = year === 2016 ? 4 : 1
    const endMonth = year === 2017 ? 3 : 12

    for (let month = startMonth; month <= endMonth; month++) {
      const daysInThisMonth = daysInMonth[year][month]
      const startDay = year === 2016 && month === 4 ? 9 : 1
      const endDay = year === 2017 && month === 3 ? 20 : daysInThisMonth

      for (let day = startDay; day <= endDay; day++) {
        const dateStr = formatDate(year, month, day)
        currentWeekdayIndex = (currentWeekdayIndex + 1) % 7
        const weekday = weekdays[currentWeekdayIndex]

        const isStoryEvent = storyEventDates.has(dateStr)
        const dungeonInfo = dungeonStarts[dateStr]
        const isDeadline = Object.values(dungeonStarts).some((d) => d.deadline === dateStr)
        const deadlineDungeon = Object.entries(dungeonStarts).find(
          ([_, d]) => d.deadline === dateStr,
        )

        const dayEntry = {
          month,
          day,
          dayOfWeek: weekday,
          timeslots: isStoryEvent
            ? {
                morning: 'blocked',
                afternoon: 'blocked',
                evening: 'blocked',
                lateNight: 'blocked',
              }
            : {
                morning: 'available',
                afternoon: 'available',
                evening: 'available',
                lateNight: 'available',
              },
          dungeonStart: !!dungeonInfo,
          dungeonDeadline: isDeadline,
          availableSocialLinks: isStoryEvent ? [] : getAvailableSocialLinks(dateStr),
        }

        if (dungeonInfo) {
          dayEntry.dungeonName = dungeonInfo.name
        }

        if (deadlineDungeon) {
          dayEntry.dungeonName = deadlineDungeon[1].name
        }

        // Add notes for special days
        if (isStoryEvent) {
          dayEntry.notes = 'Story event'
        } else if (dungeonInfo) {
          dayEntry.notes = `${dungeonInfo.name} opens`
        } else if (isDeadline) {
          dayEntry.notes = `${deadlineDungeon[1].name} deadline`
        }

        days.push(dayEntry)
      }
    }
  }

  return {
    gameInfo: {
      startDate: '2016-04-09',
      endDate: '2017-03-20',
      startingWeekday: 'Saturday',
      startingWeekdayIndex: 6,
    },
    timeslotTypes: {
      morning: 'Available before school (limited)',
      afternoon: 'Available after school until evening',
      evening: 'Available after afternoon until late night',
      lateNight: 'Available after evening (limited activities)',
    },
    socialLinks: {
      Fool: 'Igor',
      Magician: 'Morgana',
      Priestess: 'Makoto Niijima',
      Empress: 'Haru Okumura',
      Emperor: 'Yusuke Kitagawa',
      Hierophant: 'Sojiro Sakura',
      Lovers: 'Ann Takamaki',
      Chariot: 'Ryuji Sakamoto',
      Justice: 'Goro Akechi',
      Hermit: 'Futaba Sakura',
      Fortune: 'Chihaya Mifune',
      Strength: 'Twin Wardens (Caroline & Justine)',
      Hanged: 'Munehisa Iwai',
      Death: 'Tae Takemi',
      Temperance: 'Sadayo Kawakami',
      Devil: 'Ichiko Ohya',
      Tower: 'Shinya Oda',
      Star: 'Hifumi Togo',
      Moon: 'Yuuki Mishima',
      Sun: 'Toranosuke Yoshida',
      Councillor: 'Takuto Maruki (Royal only)',
      Faith: 'Kasumi Yoshizawa (Royal only)',
    },
    days,
  }
}

const calendar = generateCalendar()
console.log(JSON.stringify(calendar, null, 2))
