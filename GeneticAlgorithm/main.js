// main.js

const { simulatedAnnealing } = require('./SimulatedAnnealing');
const { AlgoritmoGenetico } = require('./algoritmoGenetico');
const { forcaBruta } = require('./forcabruta');
const { Item, Mochila } = require('./mochila');

// Exemplo de utilização:

const mochila = new Mochila(100); // Capacidade da mochila

//i <- quantidade de itens
for (let i = 1; i <= 3; i++) {
    const novoItem = new Item(`Item ${i}`, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1);
    mochila.adicionarItem(novoItem);
}




console.log("Capacidade da Mochila:", mochila.capacidade);
console.log("Quantidade de Itens na Mochila:", mochila.itens);

const combForcaBruta = forcaBruta(mochila, mochila.itens);

console.log(combForcaBruta);

const algoritmoGenetico = new AlgoritmoGenetico(100, 0.2, 0.7, mochila);
const melhorSolucao = algoritmoGenetico.encontrarMelhorSolucao(100);

console.log('Melhor solução encontrada:', melhorSolucao);

