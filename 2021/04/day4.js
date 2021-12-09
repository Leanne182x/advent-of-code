const fs = require('fs')

const fileData = fs.readFileSync('./input', 'utf8');
const input = fileData.split('\n');
const calledNumbers = input[0].split(',');

const parseBingoBoards = () => {
    const boards = [];

    for(i = 1; i < input.length; i++) {
        if (input[i] === '') {
            // board complete, move on to a new board
            boards.push([]);
        } else {
            const boardRow = input[i].split(' ').filter(val => val !== '').map(num => { 
                return { Number: num, Called: false}
            });
            
            boards[boards.length - 1].push(boardRow);
        }
    }
    return boards;
}

let winningBoard;
const calcFirstWinningBoardScore = (calledIndex, numbers, boards) => {

    if (winningBoard) {
        // Score = sum of uncalled numbers on winning board * last called number
        return calcSumOfUncalledNumbers(winningBoard) * numbers[calledIndex - 1];
    } else {
        
        boards.forEach(board => {
            markNumber(board, numbers[calledIndex]);
            if (hasBingoRow(board) || hasBingoColumn(board)) {
                winningBoard = board;
            }
        })

        return calcFirstWinningBoardScore(calledIndex+1, numbers, boards);
    }
}

const calcSumOfUncalledNumbers = (bingoBoard) => {
    let boardNumbers = []; 
    bingoBoard.forEach(row => boardNumbers = boardNumbers.concat(row))
    boardNumbers = boardNumbers.filter(x => x.Called === false).map(x => Number(x.Number));
    return boardNumbers.reduce( (prev, curr) => prev + curr);
}

const markNumber = (board, calledNumber) => {
    board.forEach(row => {
        row.forEach(number => {
            if (calledNumber === number.Number) {
                number.Called = true;
            }
        })
    })
}

const hasBingoRow = (board) => {
    let hasWinningRow = false;
    board.forEach(row => {
        if (row.filter(number => number.Called === false).length === 0) {
            hasWinningRow = true;
        }
    })
    return hasWinningRow;
}

const hasBingoColumn = (board) => {
    let hasWinningColumn = false;
    for (i = 0; i < board[0].length && !hasWinningColumn; i++ ){
        const column = [];
        board.forEach(row => column.push(row[i]));
        
        if (column.filter(number => number.Called === false).length === 0) {
            hasWinningColumn = true;
        }
    }
    return hasWinningColumn;
}

// PART 2
let lastWinningBoard;
const winningBoardIndexes = [];
const calcLastWinningBoardScore = (calledIndex, numbers, boards) => {

    if (lastWinningBoard) {
        // Score = sum of uncalled numbers on winning board * last called number
        return calcSumOfUncalledNumbers(lastWinningBoard) * numbers[calledIndex - 1];
    } else {
        
        boards.forEach( (board, boardIndex) => {

            if (!winningBoardIndexes.includes(boardIndex)) {
                markNumber(board, numbers[calledIndex]);
                const isBingo = hasBingoRow(board) || hasBingoColumn(board);
                if (isBingo && winningBoardIndexes.length === boards.length - 1) {
                    lastWinningBoard = board;
                } else if (isBingo) {
                    winningBoardIndexes.push(boardIndex);
                }
            }
        })

        return calcLastWinningBoardScore(calledIndex+1, numbers, boards);
    }
}

console.log(calcFirstWinningBoardScore(0, calledNumbers, parseBingoBoards()), calcLastWinningBoardScore(0, calledNumbers, parseBingoBoards()))
