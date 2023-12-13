const { Item, Mochila } = require('./mochila');

class AlgoritmoGenetico {
    constructor(tamanhoPopulacao, taxaMutacao, taxaCrossover, mochila) {
        this.tamanhoPopulacao = tamanhoPopulacao;
        this.taxaMutacao = taxaMutacao;
        this.taxaCrossover = taxaCrossover;
        this.mochila = mochila;
        this.populacao = [];
        this.Cromossomos = [];
        this.inicializarPopulacao();
    }

    inicializarPopulacao() {
        for (let i = 0; i < this.tamanhoPopulacao; i++) {
            const cromossomo = this.criarCromossomo();
            this.populacao.push(cromossomo);
        }
    }

    criarCromossomo() {
        const cromossomo = [];
        for (let i = 0; i < this.mochila.itens.length; i++) {
            // Adiciona aleatoriamente 0 ou 1 ao cromossomo
            cromossomo.push(Math.random() > 0.5 ? 1 : 0);
        }
        this.Cromossomos.push(cromossomo)
        return cromossomo;
    }

    calcularFitness(cromossomo) {
        let pesoTotal = 0;
        let valorTotal = 0;

        for (let i = 0; i < cromossomo.length; i++) {
            if (cromossomo[i] === 1) {
                pesoTotal += this.mochila.itens[i].peso;
                valorTotal += this.mochila.itens[i].valor;
            }
        }

        //console.log(cromossomo, pesoTotal)

        // Penalizar soluções que ultrapassam a capacidade da mochila
        const capacidadeExcedida = pesoTotal - this.mochila.capacidade;


        const fitness = valorTotal - capacidadeExcedida;

        return fitness;
    }

    selecao() {
        // Ordena a população com base no fitness em ordem decrescente
        this.populacao.sort((a, b) => this.calcularFitness(b) - this.calcularFitness(a));

        // Retorna os melhores indivíduos (50% da população)
        const metadePopulacao = Math.ceil(this.tamanhoPopulacao / 2);
        return this.populacao.slice(0, metadePopulacao);
    }

    crossover(pai1, pai2) {
        const pontoCrossover = Math.floor(Math.random() * pai1.length);

        const filho1 = pai1.slice(0, pontoCrossover).concat(pai2.slice(pontoCrossover));
        const filho2 = pai2.slice(0, pontoCrossover).concat(pai1.slice(pontoCrossover));

        return [filho1, filho2];
    }

    mutacao(cromossomo) {
        for (let i = 0; i < cromossomo.length; i++) {
            if (Math.random() < this.taxaMutacao) {
                // Inverte o bit
                cromossomo[i] = 1 - cromossomo[i];
            }
        }
    }

    evoluir() {
        const pais = this.selecao();
        const novaPopulacao = [];

        // Adiciona os pais à nova população
        novaPopulacao.push(...pais);

        // Realiza crossover e mutação para gerar novos indivíduos até atingir o tamanho da população original
        while (novaPopulacao.length < this.tamanhoPopulacao) {
            const pai1 = pais[Math.floor(Math.random() * pais.length)];
            const pai2 = pais[Math.floor(Math.random() * pais.length)];

            const filhos = this.crossover(pai1, pai2);

            for (const filho of filhos) {
                this.mutacao(filho);
                novaPopulacao.push(filho);
            }
        }

        this.populacao = novaPopulacao;
    }

    encontrarMelhorSolucao(generacoes) {
        for (let geracao = 0; geracao < generacoes; geracao++) {
            this.evoluir();
        }

        // Filtra a população para incluir apenas soluções válidas
        const populacaoValida = this.populacao.filter(cromossomo => {
            let pesoTotal = 0;
            for (let i = 0; i < cromossomo.length; i++) {
                if (cromossomo[i] === 1) {
                    pesoTotal += this.mochila.itens[i].peso;
                }
                if (pesoTotal > this.mochila.capacidade) {
                    return false; // Interrompe o loop se a capacidade for excedida
                }
            }

            return true;
        });

        // Ordena a população válida pelo valor em ordem decrescente
        populacaoValida.sort((a, b) => this.calcularFitness(b) - this.calcularFitness(a));

        // Retorna o melhor cromossomo da população válida
        return populacaoValida[0];
    }
}

module.exports = { AlgoritmoGenetico }