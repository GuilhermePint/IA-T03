const Grafo = require('./Grafo');

class Main {
    static main() {
        const grafo = new Grafo(5);

        // Adicionando vértices
        for (let i = 1; i <= 5; i++) {
            grafo.adicionarVertice(i, `V${i}`);
        }

        // Adicionando arestas com pesos discrepantes
        grafo.adicionarAresta(1, 2, 30);
        grafo.adicionarAresta(2, 3, 10);
        grafo.adicionarAresta(2, 5, 2000);
        grafo.adicionarAresta(3, 4, 10);
        grafo.adicionarAresta(4, 5, 2000);

        const origem = 1;
        const destino = 4

        const caminhoAStar = grafo.aStar(grafo.criarMatrizDePesos(), origem, destino);

        if (caminhoAStar !== null) {
            console.log(`Caminho de ${grafo.getVertice(origem).getRotulo()} a ${grafo.getVertice(destino).getRotulo()}:`);
            console.log(caminhoAStar.map((v) => grafo.getVertice(v).getRotulo()).join(' -> '));
        } else {
            console.log(`Caminho de ${grafo.getVertice(origem).getRotulo()} a ${grafo.getVertice(destino).getRotulo()} não encontrado.`);
        }
        //grafo.dijkstra(grafo.criarMatrizDePesos(), 0);
        //grafo.imprimirGrafo();
        //grafo.representarGrafo()



    }
}

Main.main();

