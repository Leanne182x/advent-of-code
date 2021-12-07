const fs = require('fs')

const fileData = fs.readFileSync('./input', 'utf8');
const input = fileData.split('\n');

const calculateConsumption = () => {

    let gammaBinary = '';
    let epilsonBinary = '';
    const countTracker = [];

    input.forEach( (x, lineIndex) => {
        
        const chars = x.split('');
        chars.forEach( (c, charIndex) => {
            if (lineIndex === 0) {
                countTracker.push({
                    zeros: c === '0' ? 1 : 0,
                    ones: c === '1' ? 1 : 0
                })
            } else {
                if (c === '0') countTracker[charIndex].zeros++;
                if (c === '1') countTracker[charIndex].ones++;
            }
        })
        
    });

    // Build the binary strings for each value. 
    countTracker.forEach(val => {
        if ( Number(val.zeros) > Number(val.ones) ) {
            gammaBinary = gammaBinary.concat('0');
            epilsonBinary = epilsonBinary.concat('1')
        } else {
            gammaBinary = gammaBinary.concat('1');
            epilsonBinary = epilsonBinary.concat('0')
        }
    });
    
    return parseInt(gammaBinary, 2) * parseInt(epilsonBinary, 2);
}

const calculateLifeSupport = () => {

    let oxygenValues = [...input];
    let co2Values = [...input];

    // Calculating oxygen values (keeping most common)
    for(i = 0; i < input[0].length && oxygenValues.length > 1; i++) {
        let ones = 0;
        let zeroes = 0;

        oxygenValues.forEach(x => {
            x.charAt(i) === '0' ? zeroes++ : ones++;
        })
        const mostCommon = ones >= zeroes ? '1' : '0';
        oxygenValues = oxygenValues.filter(value => value.charAt(i) === mostCommon);
    }

    // Calculating co2 values (keeping least common)
    for(i = 0; i < input[0].length && co2Values.length > 1; i++) {
        let ones = 0;
        let zeroes = 0;

        co2Values.forEach(x => {
            x.charAt(i) === '0' ? zeroes++ : ones++;
        })
        const mostCommon = ones >= zeroes ? '1' : '0';
        co2Values = co2Values.filter(value => value.charAt(i) !== mostCommon);
    }

    // Parse from binary to integer.
    return parseInt(oxygenValues[0], 2) * parseInt(co2Values[0], 2);
}

console.log(calculateConsumption(), calculateLifeSupport());