function forcaBruta(mochila, itens) {
    console.time("forcaBruta"); // Inicia o temporizador

    const n = itens.length;
    const todasComb = [];

    // Gerar todas as combinações possíveis de itens
    for (let i = 0; i < Math.pow(2, n); i++) {
        const combinacao = [];
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) !== 0) {
                combinacao.push(itens[j]);
            }
        }
        todasComb.push(combinacao);
    }

    // Encontrar a combinação com o maior valor que ainda cabe na mochila
    let melhorComb = [];
    let melhorValor = 0;

    for (const comb of todasComb) {
        let pesoAtual = comb.reduce((totalPeso, item) => totalPeso + item.peso, 0);
        let valorAtual = comb.reduce((totalValor, item) => totalValor + item.valor, 0);

        if (pesoAtual <= mochila.capacidade && valorAtual > melhorValor) {
            melhorValor = valorAtual;
            melhorComb = comb;
        }
    }

    console.timeEnd("forcaBruta"); // Encerra o temporizador e exibe o tempo decorrido

    return melhorComb;
}


module.exports = { forcaBruta };
