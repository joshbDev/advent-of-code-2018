function playGame(elves, highestNumber) {
  const elfs = Array.apply(null, Array(elves)).map((i, index) => {
    return {
      number: index,
      marbles: [],
      score: 0,
    }
  });
  
  let distribution = 0;
  for(let x = 0; x < highestNumber; x++) {
    elfs[distribution].marbles.push(x);
    if (distribution >= elves - 1) {
      distribution = 0;
    } else {
      distribution++;
    }
  }
  const game = [];
  let position = 0;
  let lastMarblePickedUp = [];
  for(let x = 0; x < highestNumber; x++) {
    const elfNum = x % elfs.length;
    if (x % 23 === 0 && x !== 0) {
      elfs[elfNum].score += elfs[elfNum].marbles.shift();
      for (let y = 0; y < 9; y++) {
        if (position > 0) {
          position--;
        } else {
          position = game.length - 1;
        }
      }
      const newAddition = game.splice(position, 1)[0];
      lastMarblePickedUp = [elfNum, newAddition];
      elfs[elfNum].score += newAddition
    } else {
      game.splice(position, 0, elfs[elfNum].marbles.shift());
    }
    if (game.length === 1) {
      position = 1;
    } else if (position + 2 <= game.length) {
      position += 2;
    } else {
      const percentLeft = (position + 2) % game.length;
      position = 0 + percentLeft;
    }
  }
  elfs[lastMarblePickedUp[0]].score -= lastMarblePickedUp[1];
  elfs[lastMarblePickedUp[0]].score += (lastMarblePickedUp[1] * 100);
  console.log(game);
  const winner = elfs.reduce((prev, curr) => {
    return prev.score < curr.score ? curr : prev;
  }, {score: 0});
  console.log(position);
  return winner;
}

