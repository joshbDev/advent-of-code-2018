const fs = require('fs');
const ASLEEP = 'asleep';
const AWAKE = 'awake';
const input = fs.readFileSync('./input', 'utf8');
const inputCleaned = input.split('\n').map((item) => {
  const [time, person] = item.split(']');
  const time2 = time.split('[1518-')[1];
  const [monthDay, times] = time2.split(' ');
  let [month, day] = monthDay.split('-');
  let [hours, minutes] = times.split(':');
  let guard
  let action;
  if (person.includes('Guard ')) {
    guard = person.split('Guard #')[1].split(' ')[0];
    if (Number(hours) === 23) {
      day = Number(day) + 1;
      hours = 0;
      minutes = 0;
    }
  } else {
    action = person.includes('falls asleep') ? ASLEEP : AWAKE;
  }
  return [Number(day), Number(month), Number(hours), Number(minutes), guard ? Number(guard) : undefined, action];
});
const allData = [];

inputCleaned.forEach(([day, month, hour, minutes, guard, action]) => {
if (!allData[month]) {
  allData[month] = [];
}
if (!allData[month][day]) {
  allData[month][day] = {};
}
if (guard) {
  allData[month][day].guard = guard;
} else if (action === ASLEEP) {
  allData[month][day].asleep = allData[month][day].asleep ? [...allData[month][day].asleep, minutes] : [minutes];
} else {
  allData[month][day].awake = allData[month][day].awake ? [...allData[month][day].awake, minutes] : [minutes];
}
});
const allGuards = {};
const allDataCleaned = allData.map((month) => {
  return month.filter((day) => day);
})
allDataCleaned.forEach((month, monthIndex) => {
  if (!month) {return;}
  month.forEach((day, dayIndex) => {
    if (day.asleep) {
      day.asleep = day.asleep.sort();
      day.awake = day.awake.sort();
    }
    if (!day.guard) {
      if (dayIndex === 0) {
        const prevMonth = allDataCleaned[monthIndex - 1];
        day.guard = prevMonth[prevMonth.length - 1].guard;
      } else {
        day.guard = month[dayIndex - 1].guard;
      }
    }
    if (!allGuards[day.guard]) {
      allGuards[day.guard] = {
        number: day.guard,
        sleepTime: {},
        totalSleepTime: 0,
        guardSeen: 0
      };
    }
    allGuards[day.guard].guardSeen = allGuards[day.guard].guardSeen + 1;
    if (!day.asleep) {return;}
      day.asleep.forEach((asleepHigh, asleepIndex) => {
        for(let x = day.asleep[asleepIndex]; x < day.awake[asleepIndex]; x++) {
          allGuards[day.guard].totalSleepTime = allGuards[day.guard].totalSleepTime + 1;
          allGuards[day.guard].sleepTime[x] = allGuards[day.guard].sleepTime[x] ? allGuards[day.guard].sleepTime[x] + 1 : 1;
        }
      });
      
  });
})
const mostSleepyGuard = Object.keys(allGuards).reduce((prev, curr) => {
  if (!prev.totalSleepTime) {return allGuards[curr];}
  if (allGuards[curr].totalSleepTime < prev.totalSleepTime) {return prev;}
  return allGuards[curr];
},);

const sleepyMinute = Object.keys(allGuards).reduce((prev, curr) => {
  console.log(allGuards[curr].sleepTime);
  const sleepObj = allGuards[curr].sleepTime;
  const highestMinute = Object.keys(sleepObj).reduce((prev, curr) => prev > sleepObj[curr] ? prev : sleepObj[curr], 0);
  allGuards[curr].highestSleepTime = highestMinute;
  if (!prev.totalSleepTime) {
    return allGuards[curr];
  }

  if (highestMinute < prev.highestSleepTime) {return prev;}
  return allGuards[curr];
},);

console.log('PT 1!', mostSleepyGuard);
console.log('PT 2!', sleepyMinute.number * 31);