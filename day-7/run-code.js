const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputCleaned = input.split('\n');

// Step J must be finished before step E can begin.
{
  E: {
    blockers: ["J"]
  }
}

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
const unBlockQueue = [unblocked.shift()];
allBlockers = Array.from(allBlockers).filter((i) => !unBlockQueue.includes(i));
while(unblocked.length || allBlockers.length) {
  Object.keys(map).forEach((key) => {
    let isUnblocked = true;
    map[key].blockers.forEach((blocker) => {
      if (!unBlockQueue.includes(blocker)) {
        isUnblocked = false;
      }
    });
    if (isUnblocked && !unblocked.includes(key) && !unBlockQueue.includes(key)) {

      unblocked.push(key);
    }
  });
  unblocked.sort();
  unBlockQueue.push(unblocked.shift());
  allBlockers = allBlockers.filter((i) => !unBlockQueue.includes(i));
}
Object.keys(map).forEach((key) => {
  if (!unBlockQueue.includes(key)) {
    unblocked.push(key);
  }
})
console.log([...unBlockQueue, ...unblocked].join(''));
