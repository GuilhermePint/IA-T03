const { Item, Mochila } = require('./mochila');

function simulatedAnnealing(mochila, temperaturaInicial, taxaResfriamento, iteracoes) {
    // Criar uma cópia da mochila original
    let melhorMochila = new Mochila(mochila.capacidade);
    melhorMochila.itens = mochila.itens.map(item => new Item(item.nome, item.peso, item.valor));

    // Verificar se a mochila original ultrapassa a capacidade
    if (calcularPeso(melhorMochila) > melhorMochila.capacidade) {
        console.error('A mochila inicial ultrapassa a capacidade máxima.');
        return null;
    }

    let mochilaAtual = new Mochila(mochila.capacidade);
    mochilaAtual.itens = mochila.itens.map(item => new Item(item.nome, item.peso, item.valor));

    let temperatura = temperaturaInicial;

    for (let i = 0; i < iteracoes; i++) {
        // Gere uma mochila vizinha
        let mochilaVizinha = gerarMochilaVizinha(mochilaAtual);

        // Calcule as funções de custo
        let custoAtual = calcularCusto(mochilaAtual);
        let custoVizinho = calcularCusto(mochilaVizinha);

        // Verifique se a mochila vizinha é melhor ou aceite probabilisticamente pior
        if (aceitarPior(custoAtual, custoVizinho, temperatura)) {
            mochilaAtual = mochilaVizinha;
        }

        // Atualize a melhor mochila se necessário
        if (calcularCusto(mochilaAtual) > calcularCusto(melhorMochila)) {
            melhorMochila = mochilaAtual;
        }

        // Resfrie a temperatura
        temperatura *= taxaResfriamento;
    }

    return melhorMochila;
}

function gerarMochilaVizinha(mochila, tentativas = 5) {
    if (tentativas === 0) {
        // Se atingir o limite de tentativas, retorna a mochila original
        return mochila;
    }

    let mochilaVizinha = new Mochila(mochila.capacidade);
    mochilaVizinha.itens = [...mochila.itens];

    let indiceAleatorio = Math.floor(Math.random() * mochilaVizinha.itens.length);
    let itemAleatorio = mochilaVizinha.itens[indiceAleatorio];

    // Trocar o item aleatório de posição (ou implementar outra lógica de vizinhança)
    mochilaVizinha.itens[indiceAleatorio] = new Item(
        itemAleatorio.nome,
        itemAleatorio.peso,
        itemAleatorio.valor
    );

    // Verificar se a mochila vizinha ultrapassa a capacidade
    if (calcularPeso(mochilaVizinha) > mochilaVizinha.capacidade) {
        // Se ultrapassar, tenta novamente com menos tentativas
        return gerarMochilaVizinha(mochila, tentativas - 1);
    }

    return mochilaVizinha;
}

function calcularPeso(mochila) {
    // Função auxiliar para calcular o peso total da mochila
    return mochila.itens.reduce((acumulador, item) => acumulador + item.peso, 0);
}

function calcularCusto(mochila) {
    // Esta função de custo é simplesmente a soma dos valores dos itens na mochila
    return mochila.itens.reduce((acumulador, item) => acumulador + item.valor, 0);
}

function aceitarPior(custoAtual, custoVizinho, temperatura) {
    // Função que aceita probabilisticamente soluções piores
    if (custoVizinho > custoAtual) {
        let probabilidade = Math.exp((custoAtual - custoVizinho) / temperatura);
        return Math.random() < probabilidade;
    }
    return true;
}

module.exports = { simulatedAnnealing }