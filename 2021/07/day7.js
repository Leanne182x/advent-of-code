const fs = require('fs')

const fileData = fs.readFileSync('./input', 'utf8');
const horizontalPositions = fileData.split(',').map(x => Number(x));

const lowestPos = Math.min(...horizontalPositions);
const highestPos = Math.max(...horizontalPositions);

const calculateCheapestFuelCost = (currentPosition, fuelCosts, allPositions) => {

    if (currentPosition > highestPos ) {
        return fuelCosts.reduce((prev, curr) => prev.fuelCost < curr.fuelCost ? prev : curr).fuelCost;
    } else {
        let fuelCost = 0;
        allPositions.forEach(x => {
            fuelCost = fuelCost + Math.abs(x - currentPosition)
        });
        fuelCosts.push( { position: currentPosition, fuelCost: fuelCost } )
        return calculateCheapestFuelCost(currentPosition + 1, fuelCosts, allPositions);
    }
}

const calculateCheapestFuelCostPart2 = (currentPosition, fuelCosts, allPositions) => {

    if (currentPosition > highestPos ) {
        return fuelCosts.reduce((prev, curr) => prev.fuelCost < curr.fuelCost ? prev : curr).fuelCost;
    } else {
        let fuelCost = 0;
        allPositions.forEach(x => {
            const distanceToMove = Math.abs(x - currentPosition);
            for(i = 0; i <= distanceToMove; i++) {
                fuelCost = fuelCost + i;
            }
        });
        fuelCosts.push( { position: currentPosition, fuelCost: fuelCost } )
        return calculateCheapestFuelCostPart2(currentPosition + 1, fuelCosts, allPositions);
    }
}

console.log(calculateCheapestFuelCost(lowestPos, [], horizontalPositions), calculateCheapestFuelCostPart2(lowestPos, [], horizontalPositions));