<script setup lang="ts">
  import calendar from '../res/p5rcalendar.json'

  console.log(calendar);

  // The actual info this app produces
  let InfoPerDay = [];

  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let stocks = calendar.startingStock;

  let lotteryDay = weekdays[0];
  let drinkDay = weekdays[0];

  let currentWeekdayIndex = calendar.IndexPreviousDay;

  for (let dayIndex = 0; dayIndex < calendar.days.length; dayIndex++) {
    let today = calendar.days[dayIndex];
    currentWeekdayIndex = (currentWeekdayIndex + 1) % weekdays.length;
    let weekday = weekdays[currentWeekdayIndex];

    let infoForToday = [
      'Info for ' + today.month + '/' + today.day
    ];

    if (!('dayUnavaible' in today)) {
      if (weekday === lotteryDay) {
        // Reminder for lottery
        infoForToday.push("Lottery!");
      }
      if (weekday === drinkDay) {
        // Reminder for drink
        infoForToday.push("Get Sunday drink!");
      }
    }

    InfoPerDay.push(infoForToday.join('\n'));

  }

  console.log(InfoPerDay);


</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
