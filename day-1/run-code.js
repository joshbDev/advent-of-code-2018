const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputCleaned = input.split('\n');
const seen = {};
let finalSeen;
let runningNum = 0;
const finalOne = inputCleaned.reduce((prev, curr) => {
  return prev += Number(curr);
}, 0)
while (typeof finalSeen === 'undefined') {
const final = inputCleaned.forEach((item) => {
  const newNumber = runningNum + Number(item);
  if (seen[newNumber] && typeof finalSeen === 'undefined') {
    finalSeen = newNumber;
  } else {
    seen[newNumber] = true;
  }
  runningNum = newNumber;
});
}


console.log('PT 2', finalSeen);
console.log(finalOne);