const readline = require('readline');
//const { minimaxAlphaBeta, findBestMove } = require('./minimax');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

HUMANO = -1
COMP = +1
let tabuleiro = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

let currentPlayer = 'X';

function imprimirTabuleiro() {
    for (let i = 0; i < 3; i++) {
        console.log(tabuleiro[i].join(' | '));
        if (i < 2) {
            console.log('---------');
        }
    }
}

function checarVencedor() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i][0] !== ' ' && tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2]) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (tabuleiro[0][j] !== ' ' && tabuleiro[0][j] === tabuleiro[1][j] && tabuleiro[1][j] === tabuleiro[2][j]) {
            return true;
        }
    }

    if (tabuleiro[0][0] !== ' ' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
        return true;
    }

    if (tabuleiro[0][2] !== ' ' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
        return true;
    }

    return false;
}

function isTabuleiroCheio() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tabuleiro[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}

function trocarJogador() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function jogadaHumano() {
    imprimirTabuleiro();

    rl.question(`\nJogador ${currentPlayer}, digite sua jogada (1-9): `, (input) => {
        const move = parseInt(input, 10);

        if (move >= 1 && move <= 9) {
            const row = Math.floor((move - 1) / 3);
            const col = (move - 1) % 3;

            if (tabuleiro[row][col] === ' ') {
                tabuleiro[row][col] = currentPlayer;

                if (checarVencedor()) {
                    imprimirTabuleiro();
                    console.log(`Jogador ${currentPlayer} ganha!`);
                    rl.close();
                } else if (isTabuleiroCheio()) {
                    imprimirTabuleiro();
                    console.log('É um empate!');
                    rl.close();
                } else {
                    trocarJogador();
                    jogadaMaquina();
                }
            } else {
                console.log('Jogada inválida. Esse espaço já está ocupado. Tente de novo.');
                jogadaHumano();
            }
        } else {
            console.log('Jogada inválida. Porvafor digite um número de 1 a 9.');
            jogadaHumano();
        }
    });
}

function minimax(tabuleiro, profundidade, player, alpha, beta) {
    if (checarVencedor()) {
        return player === COMP ? -1 : 1;
    } else if (isTabuleiroCheio()) {
        return 0;
    }

    if (player === COMP) {
        let maxEval = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tabuleiro[i][j] === ' ') {
                    tabuleiro[i][j] = 'O';
                    let aval = minimax(tabuleiro, profundidade + 1, HUMANO, alpha, beta);
                    tabuleiro[i][j] = ' ';
                    maxEval = Math.max(maxEval, aval);
                    alpha = Math.max(alpha, aval);
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
                if (tabuleiro[i][j] === ' ') {
                    tabuleiro[i][j] = 'X';
                    let aval = minimax(tabuleiro, profundidade + 1, COMP, alpha, beta);
                    tabuleiro[i][j] = ' ';
                    minEval = Math.min(minEval, aval);
                    beta = Math.min(beta, aval);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return minEval;
    }
}

function jogadaMaquina() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tabuleiro[i][j] === ' ') {
                tabuleiro[i][j] = 'O';
                let pontuacao = minimax(tabuleiro, 0, HUMANO, -Infinity, Infinity);
                tabuleiro[i][j] = ' ';
                if (pontuacao > bestScore) {
                    bestScore = pontuacao;
                    move = { i, j };
                }
            }
        }
    }
    tabuleiro[move.i][move.j] = 'O';

    if (checarVencedor()) {
        imprimirTabuleiro();
        console.log(`Jogador ${currentPlayer} ganha!`);
        rl.close();
    } else if (isTabuleiroCheio()) {
        imprimirTabuleiro();
        console.log('É um empate');
        rl.close();
    } else {
        trocarJogador();
        jogadaHumano();
    }
}

jogadaHumano();

module.exports = { jogadaHumano }