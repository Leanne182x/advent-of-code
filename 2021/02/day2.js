const fs = require('fs')

const fileData = fs.readFileSync('./input', 'utf8');
const input = fileData.split('\n').map(x => {
    const sections = x.split(' ')
    const object = {
        action: sections[0],
        movement: Number(sections[1])
    }
    return object;
}); 

const calculatePosition = () => {

    let horizontal = 0;
    let depth = 0;

    input.forEach(x => {
        const action = x.action;
        if (action === "forward") {
            horizontal = horizontal + x.movement;
        } 
        else if ( action === "up") {
            depth = depth - x.movement;
        } 
        else if ( action === "down") {
            depth = depth + x.movement;
        }
    })
    return horizontal * depth;
}

const calculatePositionPart2 = () => {

    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    input.forEach(x => {
        const action = x.action;
        if (action === "forward") {
            horizontal = horizontal + x.movement;
            depth = depth + (aim * x.movement);
        } 
        else if ( action === "up") {
            aim = aim - x.movement;
        } 
        else if ( action === "down") {
            aim = aim + x.movement;
        }

    })
    return horizontal * depth;
}

console.log(calculatePosition(), calculatePositionPart2())