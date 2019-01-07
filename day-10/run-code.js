const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const inputCleaned = input.split('\n');
let maxWidth = 0;
let maxHeight = 0;
let negWidth = 0;
let negHeight = 0;
let allItems = inputCleaned.map((i) => {
  const [originalPos, vel] = i.split('position=<')[1].split('> velocity=<');
  const [x, y] = originalPos.split(', ');
  const [velX, velY] = vel.split(', ');
  maxWidth = Number(x) > maxWidth ? Number(x) : maxWidth;
  maxHeight = Number(y) > maxHeight ? Number(y) : maxWidth;
  negWidth = Number(x) < negWidth ? Number(x) : negWidth;
  negHeight = Number(y) < negHeight ? Number(y) : negHeight;
  return {
    x: Number(x),
    y: Number(y),
    velX: Number(velX),
    velY: Number(velY.substring(0, velY.length - 1))
  }
});
let iterations = 0;
while(maxWidth > 210) {
  maxWidth = 0;
  maxHeight = 0;
  negWidth = 0;
  negHeight = 0;
  allItems = allItems.map((i) => {
    i.x += i.velX;
    i.y += i.velY;
    maxWidth = i.x > maxWidth ? i.x : maxWidth;
    maxHeight = i.y > maxHeight ? i.y : maxWidth;
    negWidth = i.x < negWidth ? i.x : negWidth;
    negHeight = i.y < negHeight ? i.y : negHeight;
    return i;
  });
  iterations++;
}
for (let x = 0; x < 5; x++) {
  maxWidth = 0;
  maxHeight = 0;
  negWidth = 0;
  negHeight = 0;
  allItems = allItems.map((i) => {
    i.x += i.velX;
    i.y += i.velY;
    maxWidth = i.x > maxWidth ? i.x : maxWidth;
    maxHeight = i.y > maxHeight ? i.y : maxWidth;
    negWidth = i.x < negWidth ? i.x : negWidth;
    negHeight = i.y < negHeight ? i.y : negHeight;
    return i;
  });
  iterations++;
console.log('start', iterations)
let grid = Array.apply(null, Array(Math.abs(negWidth - 1) + maxWidth)).map((i, index) => 
  Array.apply(null, Array(Math.abs(negHeight - 1) + maxHeight)).map((i, index) => {})
);
allItems.forEach((i) => {
  grid[Math.abs(negWidth) + i.x][Math.abs(negHeight) + i.y] = 'X';
});
grid.forEach((item) => {
  const mapper = item.map((i) => i ? i : 'O');
  console.log(mapper.join(''));
})
iterations++;
}