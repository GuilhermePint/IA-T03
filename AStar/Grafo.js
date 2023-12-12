const Vertice = require('./Vertice');

const Aresta = require('./Aresta');


class Grafo {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.numArestas = 0;
    this.vertices = [];
    this.arestas = [];
  }

  getNumVertices() {
    return this.numVertices;
  }

  getNumArestas() {
    return this.numArestas;
  }

  adicionarVertice(indice, rotulo) {
    this.vertices.push(new Vertice(indice, rotulo));

    for (let i = 0; i < this.getNumVertices(); i++) {
      this.getVertice(indice).addDistancia(0);
    }
  }

  getVertice(i) {
    return this.vertices[i - 1];
  }

  criarMatrizDePesos() {
    const matrixDePesos = Array.from({ length: this.getNumVertices() }, () =>
      Array.from({ length: this.getNumVertices() }, () => 0)
    );

    for (let linhas = 0; linhas < this.getNumVertices(); linhas++) {
      for (let colunas = 0; colunas < this.getNumVertices(); colunas++) {
        matrixDePesos[linhas][colunas] = this.getVertice(linhas + 1).getDistancias()[colunas];
      }
    }

    return matrixDePesos;
  }

  adicionarAresta(origem, destino, peso) {
    if (origem === destino) {
      this.getVertice(origem).addVerticeVizinho(this.getVertice(destino));
    } else {
      this.getVertice(origem).addVerticeVizinho(this.getVertice(destino));
      this.getVertice(origem).setDistancia(destino, peso);
      this.getVertice(destino).addVerticeVizinho(this.getVertice(origem));
      this.getVertice(destino).setDistancia(origem, peso);
    }

    this.arestas.push(new Aresta(this.getVertice(origem), this.getVertice(destino), peso));
    this.numArestas++;
  }

  adicionarArestaComRotulo(origem, destino, rotulo, peso) {
    if (origem === destino) {
      this.getVertice(origem).addVerticeVizinho(this.getVertice(destino));
    } else {
      this.getVertice(origem).addVerticeVizinho(this.getVertice(destino));
      this.getVertice(origem).setDistancia(destino, peso);
      this.getVertice(destino).addVerticeVizinho(this.getVertice(origem));
      this.getVertice(destino).setDistancia(origem, peso);
    }

    this.arestas.push(new Aresta(this.getVertice(origem), this.getVertice(destino), rotulo, peso));
    this.numArestas++;
  }

  imprimirGrafo() {
    console.log("\nNumero de vertices: " + this.getNumVertices());
    console.log("Numero de arestas: " + this.getNumArestas() + "\n");

    console.log("Estrutura de dados: \n\nLista de Adjacencia");

    for (let x = 0; x < this.getNumVertices(); x++) {
      process.stdout.write(this.vertices[x].getRotulo() + " -> ");
      for (const vertice of this.vertices[x].verticesVizinhos) {
        process.stdout.write(vertice.getRotulo() + "  ");
      }

    }

    if (this.numArestas > 0) {
      console.log("\nLista de Distancias: ");
      for (const aresta of this.arestas) {
        aresta.getAresta();
      }
    }

    console.log();
  }

  minDistance(dist, sptSet) {
    let min = Infinity, min_index = -1;

    for (let v = 0; v < this.getNumVertices(); v++) {
      if (!sptSet[v] && dist[v] <= min) {
        min = dist[v];
        min_index = v;
      }
    }

    return min_index;
  }

  printadorCidade(j, origem) {
    console.log(`${this.getVertice(origem).getCidade()}  ${this.getVertice(j + 1).getCidade()}`);
  }

  printSolution(dist, origem) {
    console.log("Vertice  Distancia da Origem");
    let j = 0;

    for (let i = 0; i < this.getNumVertices(); i++) {
      this.printadorCidade(j, origem);
      console.log(`  ${dist[i]}`);
      if (i < this.getNumVertices() - 1) {
        j++;
      }
    }
  }

  dijkstra(grafo, origem) {
    const dist = Array.from({ length: this.getNumVertices() }, () => Infinity);
    const sptSet = Array(this.getNumVertices()).fill(false);

    dist[origem] = 0;

    for (let count = 0; count < this.getNumVertices() - 1; count++) {
      const u = this.minDistance(dist, sptSet);

      sptSet[u] = true;

      for (let v = 0; v < this.getNumVertices(); v++) {
        if (!sptSet[v] && grafo[u][v] !== 0 && dist[u] !== Infinity && dist[u] + grafo[u][v] < dist[v]) {
          dist[v] = dist[u] + grafo[u][v];
          //caminho[v] = grafo[u][v];
        }
      }
    }

    this.printSolution(dist, origem + 1);
  }

  heuristica(verticeAtual, verticeDestino) {
    // Aqui você pode definir sua heurística. 
    // Por exemplo, pode ser a distância em linha reta (euclidiana) entre as coordenadas dos vértices.
    // Neste exemplo, usaremos a heurística como o peso da aresta entre os vértices.
    return verticeAtual.getDistancias()[verticeDestino.getIndice() - 1];
  }

  aStar(grafo, origem, destino) {
    const dist = new Array(this.getNumVertices()).fill(Number.MAX_SAFE_INTEGER);
    const pai = new Array(this.getNumVertices()).fill(null);
    const fScore = new Array(this.getNumVertices()).fill(Number.MAX_SAFE_INTEGER);
    const gScore = new Array(this.getNumVertices()).fill(Number.MAX_SAFE_INTEGER);
    const openSet = new Set();

    gScore[origem - 1] = 0;
    fScore[origem - 1] = this.heuristica(this.getVertice(origem), this.getVertice(destino));

    openSet.add(origem);

    while (openSet.size > 0) {
      const verticeAtual = Array.from(openSet).reduce((a, b) => (fScore[a - 1] < fScore[b - 1] ? a : b));

      if (verticeAtual === destino) {
        // Reconstruir o caminho

        const caminho = [];

        let vertice = destino;

        while (pai[vertice - 1] !== null) {
          caminho.unshift(vertice);
          vertice = pai[vertice - 1];
          console.log(caminho)
        }

        caminho.unshift(origem);

        return caminho;
      }

      openSet.delete(verticeAtual);

      for (const verticeVizinho of this.getVertice(verticeAtual).verticesVizinhos) {
        const tentativaGScore = gScore[verticeAtual - 1] + grafo[verticeAtual - 1][verticeVizinho.getIndice() - 1];

        if (tentativaGScore < gScore[verticeVizinho.getIndice() - 1]) {
          pai[verticeVizinho.getIndice() - 1] = verticeAtual;
          gScore[verticeVizinho.getIndice() - 1] = tentativaGScore;
          fScore[verticeVizinho.getIndice() - 1] =
            gScore[verticeVizinho.getIndice() - 1] + this.heuristica(verticeVizinho, this.getVertice(destino));

          if (!openSet.has(verticeVizinho.getIndice())) {
            openSet.add(verticeVizinho.getIndice());
          }
        }
      }

    }

    // Caminho não encontrado
    return null;
  }
}

module.exports = Grafo;


