function theGrid(powerId) {
  const THREE_HUNDRED = 300;
  const grid = Array.apply(null, Array(THREE_HUNDRED)).map((i, index) => (
    Array.apply(null, Array(THREE_HUNDRED)).map((i, index) => {}
  )));
  grid.forEach((hor, horIndex) => {
    hor.forEach((i, verIndex) => {
      const rackId = horIndex + 1 + 10;
      const powerLevel = rackId * (verIndex + 1);
      const totSer = powerLevel + powerId;
      const highNumber = (totSer * rackId).toString();
      const hundredth = Number(highNumber.substring(highNumber.length - 3, highNumber.length - 2) || 0);
      grid[horIndex][verIndex] = hundredth - 5;
    });
  });
  let highestScore = 0;
  let coord = [];
  grid.forEach((hor, horIndex) => {
    hor.forEach((i, verIndex) => {
      let runningTotal = 0;
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          if (!grid[horIndex + x] || !grid[horIndex + x][verIndex + y]) {
            return;
          }
          runningTotal += grid[horIndex + x][verIndex + y];
        }
      }
      if (runningTotal > highestScore) {
        highestScore = runningTotal;
        coord = [horIndex + 1, verIndex + 1];
      }
    });
  });
  return {
    highestScore,
    coord
  }
}
console.log(theGrid(2187));

function theGrid2(powerId) {
  const THREE_HUNDRED = 300;
  const grid = Array.apply(null, Array(THREE_HUNDRED)).map((i, index) => (
    Array.apply(null, Array(THREE_HUNDRED)).map((i, index) => {}
  )));
  grid.forEach((hor, horIndex) => {
    hor.forEach((i, verIndex) => {
      const rackId = horIndex + 1 + 10;
      const powerLevel = rackId * (verIndex + 1);
      const totSer = powerLevel + powerId;
      const highNumber = (totSer * rackId).toString();
      const hundredth = Number(highNumber.substring(highNumber.length - 3, highNumber.length - 2) || 0);
      grid[horIndex][verIndex] = hundredth - 5;
    });
  });
  let newRunningTotal = 0;
  let newCoordinates = [];
  
  for (let allSizes = 1; allSizes <= 300; allSizes++) {
    console.log(allSizes);
    grid.forEach((hor, horIndex) => {
      hor.forEach((i, verIndex) => {
        let runningTotal = 0;
        for (let x = 0; x < allSizes; x++) {
          if (typeof grid[horIndex + x] === 'undefined') {return;}
          for (let y = 0; y < allSizes; y++) {
            if (typeof grid[horIndex + x][verIndex + y] === 'undefined') {
              return;
            }
            runningTotal += grid[horIndex + x][verIndex + y];
          }
        }
        if (runningTotal > newRunningTotal) {
          newRunningTotal = runningTotal;
          newCoordinates = [horIndex + 1, verIndex + 1, allSizes];
        }
      });
    });
  }
  return [{
    newRunningTotal,
    newCoordinates
  }]
}
console.log(theGrid2(2187));