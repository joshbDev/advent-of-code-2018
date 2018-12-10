const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
function removeChain(input) {
let hasMorphed = true;
let finalizedList = [...input.split('')];
while (hasMorphed) {
  hasMorphed = false;
  finalizedList.forEach((letter, index) => {
    const [letterUnused, compareLetter] = [String(letter), String(finalizedList[index + 1])];
    if(lowerCaseLettered(letterUnused) === lowerCaseLettered(compareLetter)) {
      if (isCapitalized(letter) !== isCapitalized(finalizedList[index + 1])) {
        delete finalizedList[index];
        delete finalizedList[index + 1];
        hasMorphed = true;
        
      }
    }
  });
  finalizedList = [...finalizedList.filter(e => e)];
}
return finalizedList;
}
console.log('PT 1', removeChain(input).length);

function lowerCaseLettered(letter) {
  return letter.toLowerCase();
}

function isCapitalized(letter) {
  if (letter == letter.toUpperCase()) {
    return 'lower';
  }
  return 'upper';
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetDone = {};

alphabet.split('').forEach(letter => {
  let finalizedList = [...input.split('')];
  const reducedList = finalizedList.filter((arrayLetter) => String(letter).toLocaleLowerCase() !== arrayLetter.toLocaleLowerCase());
  alphabetDone[letter] = removeChain(reducedList.join('')).length;
})
const lowest = Object.values(alphabetDone).reduce((prev, curr) => prev < curr ? prev : curr, 10000);
console.log(alphabetDone);
console.log(lowest);