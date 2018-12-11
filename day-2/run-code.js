const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputCleaned = input.split('\n');


// PT 1
let hasTwo = 0;
let hasThree = 0;
inputCleaned.forEach(item => {
  const itemCount = item.split('').reduce((prev, curr) => {
    if (!prev[curr]) {
      prev[curr] = 1;
      return prev;
    }
    prev[curr] = prev[curr] + 1;
    return prev;
  }, {});
  const hasTwoStr = Object.values(itemCount).includes(2);
  const hasThreeStr = Object.values(itemCount).includes(3);
  if (hasThreeStr) {hasThree++;}
  if (hasTwoStr) {hasTwo++;}
});

//PT 2
let cleanedString;
inputCleaned.forEach((str, index) => {
  if (cleanedString) {return;}
  for (x = index + 1; x < inputCleaned.length; x++) {
    const tempStr = inputCleaned[x].split('')
    const stringCommon = str.split('').filter((i, dIndex) => i === tempStr[dIndex]);
    if (stringCommon.length === tempStr.length - 1) {
      cleanedString = stringCommon;
      break;
    }
  }
})

console.log('PT 1', hasThree * hasTwo);
console.log('PT 2', cleanedString.join(''));