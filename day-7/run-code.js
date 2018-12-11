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

let first = [];
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
    first.push(el)
  }
}
console.log(first.sort());


