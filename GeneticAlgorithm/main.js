// main.js

const { simulatedAnnealing } = require('./SimulatedAnnealing');
const { forcaBruta } = require('./forcabruta');
const { Item, Mochila } = require('./mochila');

// Exemplo de utilização:

const mochila = new Mochila(10); // Capacidade da mochila

for (let i = 1; i <= 20; i++) {
    const novoItem = new Item(`Item ${i}`, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1);
    mochila.adicionarItem(novoItem);
}

console.log("Capacidade da Mochila:", mochila.capacidade);
console.log("Quantidade de Itens na Mochila:", mochila.itens.length);

const combForcaBruta = forcaBruta(mochila, mochila.itens);

console.log(combForcaBruta);

const temperaturaInicial = 100;
const taxaResfriamento = 0.95;
const iteracoes = 1000;

const melhorMochilaEncontrada = simulatedAnnealing(mochila, temperaturaInicial, taxaResfriamento, iteracoes);

console.log('Melhor Mochila encontrada:', melhorMochilaEncontrada);
