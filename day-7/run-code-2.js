const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputCleaned = input.split('\n');

function parseInputs(str) {
  const strArr = str.split(" ");
  const blocker = strArr[1];
  const key = strArr[7];

  return {
    blocker,
    key
  }
}

let unblocked = [];
let allBlockers = new Set();
const map = inputCleaned.reduce((acc, str) => {
  const { blocker, key } = parseInputs(str);
  allBlockers.add(blocker);
  if (!acc[key]) {
    acc[key] = { blockers: [ blocker ]};
  } else {
    acc[key].blockers.push(blocker);
  }
  return acc;
}, {});
for(let el of allBlockers) {
  if(!map[el]) {
    unblocked.push(el);
  }
}
unblocked.sort();
const unLength = unblocked.length;
const SIXTY = 60;
let timer = 0;
const unBlockQueue = [];
let tempTime = new Date().getTime();
allBlockers = Array.from(allBlockers).filter((i) => !unBlockQueue.includes(i));

let worker = [];
for (let x = 0; x < unLength; x++) {
  const letter = unblocked.shift();
  const time = SIXTY + findTheNumber(letter);
    worker.push(time);
    setTimeout(() => {
      unBlockQueue.push(letter);
      const findIndex = worker.indexOf(time);
      delete worker[findIndex];
      worker = [...worker.filter(i => i)];
      allBlockers = allBlockers.filter((i) => !unBlockQueue.includes(i));
      runThroughIt();
    }, time);
}

function runThroughIt() {
  for (let x = 0; x <= 5 - worker.length; x++) {
    Object.keys(map).forEach((key) => {
      let isUnblocked = true;
      map[key].blockers.forEach((blocker) => {
        if (!unBlockQueue.includes(blocker)) {
          isUnblocked = false;
        }
      });
      if (isUnblocked && !unblocked.includes(key) && !unBlockQueue.includes(key)) {
        const time = SIXTY + findTheNumber(key);
        if (!worker.includes(time)) {
          unblocked.push(key);
        }
        
      }
    });

    unblocked.sort();
    const letter = unblocked.shift();
    const time = SIXTY + findTheNumber(letter);
    if (!letter) {break;}
    worker.push(time);
    console.log('STARTING', letter, worker);
    setTimeout(() => {
      unBlockQueue.push(letter);
      const findIndex = worker.indexOf(time);
      delete worker[findIndex];
      worker = [...worker.filter(i => i)];
      allBlockers = allBlockers.filter((i) => !unBlockQueue.includes(i));
      if (unblocked.length || allBlockers.length) {
        runThroughIt();
        return;
      } 
      timer = timer + (new Date().getTime() - tempTime);
      tempTime = new Date().getTime();
      Object.keys(map).forEach((key) => {
        if (!unBlockQueue.includes(key)) {
          const time = SIXTY + findTheNumber(key);
          timer = timer + time;
          unblocked.push(key);
        }
        })

      console.log([...unBlockQueue, ...unblocked].join(''));
      console.log(timer);
    }, time);
  }
  
}



function findTheNumber(letter) {
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.indexOf(letter) + 1;
}
