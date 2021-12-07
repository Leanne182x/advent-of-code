const fs = require('fs')

const fileData = fs.readFileSync('./input', 'utf8');
const depths = fileData.split('\n').map(depth => Number(depth));

const countIncreases = (numbers) => {
    let count = 0;
    let previousNumber;

    numbers.forEach( (number) => {
      if (number > previousNumber) {
          count++;
      }
      previousNumber = number;
    })

    return count;
}

const countDepthIncreasesAsThreeReadingWindows = (numbers) => {
  
  let count = 0;
  let previousSumOfThree;

    numbers.forEach( (number, index, array) => {
      const sumOfThree = number + array[index + 1] + array[index + 2];
      if (sumOfThree > previousSumOfThree) {
          count++;
      }
      previousSumOfThree = sumOfThree;
    })

    return count;
}

console.log(countIncreases(depths), countDepthIncreasesAsThreeReadingWindows(depths));