const fs = require('fs')

const fileData = fs.readFileSync('./input', 'utf8');
const initialFish = fileData.split(',').map(depth => Number(depth));

const countFishPopulationAfterDays = (days, fishTimers) => {

    if ( days < 0) {
        return fishTimers[0] + fishTimers[1] + fishTimers[2] + fishTimers[3] + fishTimers[4] + fishTimers[5] + fishTimers[6] + fishTimers[7] + fishTimers[8];
    } else {
        
        let newFishTimers = getZeroedFishTimer();

        newFishTimers[0] = fishTimers[1]; 
        newFishTimers[1] = fishTimers[2]; 
        newFishTimers[2] = fishTimers[3]; 
        newFishTimers[3] = fishTimers[4]; 
        newFishTimers[4] = fishTimers[5]; 
        newFishTimers[5] = fishTimers[6]; 
        newFishTimers[6] = fishTimers[7] + fishTimers[0]; 
        newFishTimers[7] = fishTimers[8]; 
        newFishTimers[8] = fishTimers[0]; 

        return countFishPopulationAfterDays(days - 1, newFishTimers);
    }

}

const getZeroedFishTimer = () => {
    return {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0, // For fish timer reset
        7: 0,
        8: 0 // For brand new fish
    }
}

const getStructuredFishTimers = () => {
    const fishCounters = getZeroedFishTimer();
    initialFish.forEach(fish => fishCounters[fish]++)
    return fishCounters;
}

console.log(countFishPopulationAfterDays(80 - 1, getStructuredFishTimers()),
            countFishPopulationAfterDays(256 - 1, getStructuredFishTimers()));