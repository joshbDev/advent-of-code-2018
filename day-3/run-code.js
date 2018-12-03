const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputCleaned = input.split('\n');
const finalInput = inputCleaned.map((i) => {
  const newSection = i.split(' @ ');
  const sectionTwo = newSection[1].split(': ');
  const location = sectionTwo[0].split(',');
  const depth = sectionTwo[1].split('x');
  return [newSection[0], [Number(location[0]), Number(location[1])], [Number(depth[0]), Number(depth[1])]];
});

const map = {};
overlapping = 0;
const allValues = {};
finalInput.forEach((item, index) => {
  const [name, loc, depth] = item;
  allValues[name] = true;
  for(let y = 1; y <= depth[1]; y++) {
    for(let x = 1; x <= depth[0]; x++) {
      const tempLoc = (loc[0] + x).toString() + 'XX' +
      (loc[1] + y).toString();
      if (!map[tempLoc]) {
        map[tempLoc] = [name];
      } else if (map[tempLoc].length === 1) {
        // console.log('OVERLAPPING', tempLoc, map[tempLoc], name);
        overlapping++;
        map[tempLoc] = [...map[tempLoc], name];
      } else {
        map[tempLoc] = [...map[tempLoc], name];
      }
    }
  }
});

Object.values(map).forEach(arr => {
  if (arr.length === 1) {return;}
  arr.forEach((name) => {
    allValues[name] = false;
  });
});

const [finalTwo] = Object.keys(allValues).filter((item) => allValues[item]);
console.log(overlapping);
console.log(finalTwo);