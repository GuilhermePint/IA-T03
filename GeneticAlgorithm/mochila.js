// mochila.js

class Item {
  constructor(nome, peso, valor) {
    this.nome = nome;
    this.peso = peso;
    this.valor = valor;
  }
}

class Mochila {
  constructor(capacidade) {
    this.capacidade = capacidade;
    this.itens = [];
  }

  adicionarItem(item) {
    this.itens.push(item);
  }
}

// Exportando as classes usando module.exports
module.exports = { Item, Mochila };
