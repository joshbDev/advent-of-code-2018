const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputCleaned = input.split(' ').map(i => Number(i));
let metadataNumber = 0;

function splitIntoMetadata(array) {
  console.log('RUNNING!', array);
  const subItems = array[0];
  if (subItems === 0) {
    for (x = 0;x < array[1]; x++) {
      metadataNumber = metadataNumber + array[2 + x];
    }
    return 2 + array[1];
  }
  let tempReturn = 2;
  for (let x = 0; x < subItems; x++) {
    let sectionLength = splitIntoMetadata(array.slice(tempReturn, array.length));
    tempReturn = tempReturn + sectionLength;
  }
  for (x = 0;x < array[1]; x++) {
    metadataNumber = metadataNumber + array[tempReturn + x];
  }
  return tempReturn + array[1];
}
splitIntoMetadata(inputCleaned);
console.log(metadataNumber);