const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputCleaned = input.split('\n');

const infiniteGrid = [];

let biggestHorizontal = 0;
let biggestVertical = 0;
const areas = {
  'a': {
    name: 'a',
    isInfinite: true,
    size: 0
  }
};
inputCleaned.forEach((item, index) => {
  const [horizontal, vertical] = item.split(', ');
  areas[index] = {
    name: index,
    isInfinite: false,
    size: 0
  };
  if (!infiniteGrid[Number(horizontal)]) {
    infiniteGrid[Number(horizontal)] = [];
  }
  infiniteGrid[Number(horizontal)][Number(vertical)] = {connectedTo: index, distance: 0};
  if (biggestHorizontal < Number(horizontal)) {
    biggestHorizontal = Number(horizontal);
  }
  if (biggestHorizontal < Number(vertical)) {
    biggestVertical = Number(vertical);
  }
});
for (let x = 0; x <= biggestHorizontal + 1; x ++) {
  if(!infiniteGrid[x]) {
    infiniteGrid[x] = [];
  }
}
  


// for(let x = 0; x <= biggestHorizontal + 1; x++) {
//   for (let y = 0; y <= biggestVertical + 1; y++) {
//     inputCleaned.forEach((item, index) => {
//       const [h, v] = item.split(', ');
//       const [horizontal, vertical] = [Number(h), Number(v)];
//       const distance = Math.abs(horizontal - x) + Math.abs(vertical - y);
//       if (!infiniteGrid[x][y]) {
//         infiniteGrid[x][y] = {
//           connectedTo: index,
//           distance,
//         };
//         return;
//       }
//       if (infiniteGrid[x][y].distance < distance) {return;}
//       if (infiniteGrid[x][y].distance === distance) {
//         infiniteGrid[x][y].connectedTo = 'a';
//       }
//       infiniteGrid[x][y] = {
//         connectedTo: index,
//         distance,
//       };
//     });
//   }
// }
// for(let x = 0; x <= biggestHorizontal + 1; x++) {
//   const firstGroup = infiniteGrid[x][0];
//   const lastGroup = infiniteGrid[x][biggestVertical];
//   if (firstGroup && lastGroup) {
//     console.log(firstGroup);
//     areas[firstGroup.connectedTo].isInfinite = true;
//     areas[lastGroup.connectedTo].isInfinite = true;
//   }
// }
// for (let x = 0; x <= biggestVertical; x++) {
//   const firstGroup = infiniteGrid[0][x];
//   const lastGroup = infiniteGrid[biggestHorizontal][x];
//   if (firstGroup && lastGroup) {
//     areas[firstGroup.connectedTo].isInfinite = true;
//     areas[lastGroup.connectedTo].isInfinite = true;
//   }
// }
// for(let x = 0; x <= biggestHorizontal + 1; x++) {
//   for (let y = 0; y <= biggestVertical + 1; y++) {
//     const item = infiniteGrid[x][y];
//     if (areas[item.connectedTo].isInfinite) {continue;}
//     areas[item.connectedTo].size = areas[item.connectedTo].size + 1;
//   }
// }
// const winner = Object.keys(areas).reduce((prev, curr) => areas[curr].size > prev.size ? areas[curr] : prev, {size: 0});
// console.log(winner);



// }
// const queue = [];
// inputCleaned.forEach((item, index) => {
//   console.log('STARTING', index);
//   const [tempH, tempV] = item.split(', ');
//   const [initialHorizontal, initialVertical] = [Number(tempH), Number(tempV)];
  
//   if (initialHorizontal > 0) { 
//     queue.push([initialHorizontal - 1, initialVertical, 1, index]);
//   }
//   if (initialHorizontal + 1 <= biggestHorizontal) {
//     queue.push([initialHorizontal + 1, initialVertical, 1, index]);
//   }
//   if (initialVertical > 0) {
//     queue.push([initialHorizontal, initialVertical - 1, 1, index]);
//   }
//   if (initialVertical + 1 <= biggestVertical) {
//     queue.push([initialHorizontal, initialVertical + 1, 1, index]);
//   }
//   infiniteGrid.forEach((item, index) => {
//     if(!infiniteGrid[index]) {
//       infiniteGrid[index] = [];
//     }
//   });
// });
// console.log(biggestHorizontal * biggestVertical);
// let totalDistance = 0;
//   while (queue.length) {
    
//     const [horizontal, vertical, distance, index] = queue.shift();
//     if (distance > totalDistance) {
//       fs.writeFileSync('./infiniteGrid', JSON.stringify(infiniteGrid), 'utf8');
      
//       totalDistance = distance;
//     }
//     if (infiniteGrid[horizontal][vertical]) {
//       if (infiniteGrid[horizontal][vertical].connectedTo === index) {continue;}
//       if (infiniteGrid[horizontal][vertical].distance < distance) {continue;}
//       if (infiniteGrid[horizontal][vertical].distance === distance && infiniteGrid[horizontal][vertical].connectedTo !== 'a') {
//         infiniteGrid[horizontal][vertical] = {
//           connectedTo: 'a',
//           distance
//         };
//       }
//     } else if (!infiniteGrid[horizontal][vertical] || infiniteGrid[horizontal][vertical] > distance) {
//       infiniteGrid[horizontal][vertical] = {
//         connectedTo: index,
//         distance
//       };
//     }
//     if (horizontal > 0) { 
//       queue.push([horizontal - 1, vertical, distance + 1, index]);
//     }
//     if (horizontal + 1 <= biggestHorizontal) {
//       queue.push([horizontal + 1, vertical, distance + 1, index]);
//     }
//     if (vertical > 0) {
//       queue.push([horizontal, vertical - 1, distance + 1, index]);
//     }
//     if (vertical + 1 <= biggestVertical) {
//       queue.push([horizontal, vertical + 1, distance + 1, index]);
//     }
//   }

// console.log(infiniteGrid);