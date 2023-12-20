const readline = require('readline');
//const { minimaxAlphaBeta, findBestMove } = require('./minimax');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

HUMAN = -1
COMP = +1
let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

let currentPlayer = 'X';

function printBoard() {
    for (let i = 0; i < 3; i++) {
        console.log(board[i].join(' | '));
        if (i < 2) {
            console.log('---------');
        }
    }
}

function checkWinner() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== ' ' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return true;
        }
    }

    if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true;
    }

    if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true;
    }

    return false;
}

function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function playHuman() {
    printBoard();

    rl.question(`Player ${currentPlayer}, enter your move (1-9): `, (input) => {
        const move = parseInt(input, 10);

        if (move >= 1 && move <= 9) {
            const row = Math.floor((move - 1) / 3);
            const col = (move - 1) % 3;

            if (board[row][col] === ' ') {
                board[row][col] = currentPlayer;

                if (checkWinner()) {
                    printBoard();
                    console.log(`Player ${currentPlayer} wins!`);
                    rl.close();
                } else if (isBoardFull()) {
                    printBoard();
                    console.log('It\'s a tie!');
                    rl.close();
                } else {
                    switchPlayer();
                    playMachine();
                }
            } else {
                console.log('Invalid move. The cell is already taken. Please try again.');
                playHuman();
            }
        } else {
            console.log('Invalid move. Please enter a number between 1 and 9.');
            playHuman();
        }
    });
}

function minimax(board, depth, player, alpha, beta) {
    if (checkWinner()) {
        return player === COMP ? -1 : 1;
    } else if (isBoardFull()) {
        return 0;
    }

    if (player === COMP) {
        let maxEval = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === ' ') {
                    board[i][j] = 'O';
                    let eval = minimax(board, depth + 1, HUMAN, alpha, beta);
                    board[i][j] = ' ';
                    maxEval = Math.max(maxEval, eval);
                    alpha = Math.max(alpha, eval);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === ' ') {
                    board[i][j] = 'X';
                    let eval = minimax(board, depth + 1, COMP, alpha, beta);
                    board[i][j] = ' ';
                    minEval = Math.min(minEval, eval);
                    beta = Math.min(beta, eval);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return minEval;
    }
}

function playMachine() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                board[i][j] = 'O';
                let score = minimax(board, 0, HUMAN, -Infinity, Infinity);
                board[i][j] = ' ';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    board[move.i][move.j] = 'O';

    if (checkWinner()) {
        printBoard();
        console.log(`Player ${currentPlayer} wins!`);
        rl.close();
    } else if (isBoardFull()) {
        printBoard();
        console.log('It\'s a tie!');
        rl.close();
    } else {
        switchPlayer();
        playHuman();
    }
}

playHuman();

module.exports = { playHuman }