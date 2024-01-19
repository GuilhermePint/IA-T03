// main.js

const { AlgoritmoGenetico } = require('./algoritmoGenetico');
const { forcaBruta } = require('./forcabruta');
const { Item, Mochila } = require('./mochila');

// Exemplo de utilização:

const mochila = new Mochila(10); // Capacidade da mochila

//i <- quantidade de itens
for (let i = 1; i <= 50; i++) {
    const novoItem = new Item(`Item ${i}`, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1);
    mochila.adicionarItem(novoItem);
}




console.log("Capacidade da Mochila:", mochila.capacidade);
//console.log("Quantidade de Itens na Mochila:", mochila.itens);

/*const combForcaBruta = forcaBruta(mochila, mochila.itens);

console.log(combForcaBruta);*/

const algoritmoGenetico = new AlgoritmoGenetico(10000, 0.2, 0.9, mochila);
console.time("Tempo de execução do Algoritmo Genético");
const melhorSolucao = algoritmoGenetico.encontrarMelhorSolucao(100);
console.timeEnd("Tempo de execução do Algoritmo Genético");

console.log('Melhor solução encontrada:', melhorSolucao);

