# Algoritmo A*
## Situação Problema
Criação do caminho mais curto de viagem: Um indivíduo está viajando com pouca gasolina e precisa descobrir qual o caminho mais curto para chegar da cidade Y a cidade X antes que seu combustível acabe.
## Modelagem Escolhida: Grafos
A modelagem desse problema é criada por meio de grafos. Cada vértice representa uma cidade, suas arestas, o caminho até elas e os pesos atribuídos às arestas suas respectivas distâncias. Para este problema estamos considerando apenas grafos simples e não direcionados. <br>
Considerando a abordagem de programação orientada a objetos, a modelagem aconteceu por meio da divisão entre classes e funções de acordo com a natureza do gráfico proposto. <br> 
No total, há 5 classes: Aresta.js, Capitais.js, Grafo.js, Vertice.js e Main.js. Fazem parte da modelagem do problema as classes Aresta.js, Grafo.js e Vertice.js.
>A classe Aresta possui parâmetros de vértice 1, vértice 2, peso e rótulo. 
<details>
    <summary>Classe Aresta</summary>

~~~  
class Aresta {
    constructor(vertice1, vertice2, rotulo, peso) {
        this.vertice1 = vertice1;
        this.vertice2 = vertice2;
        this.rotulo = rotulo || null;
        this.peso = peso || 0;
    }
    
    getVertice1() {return this.vertice1;

    getVertice2() { return this.vertice2;}

    getRotulo() { return this.rotulo;}

    setVertice1(vertice1) {this.vertice1 = vertice1;}
    
    setVertice2(vertice2) {this.vertice2 = vertice2;}

    setRotulo(rotulo) {this.rotulo = rotulo;}

    getPeso() {return this.peso;}

    setPeso(peso) {this.peso = peso;}

    getAresta() {
        if (this.rotulo === null) {
            console.log(`(${this.getVertice1().getRotulo()} - ${this.getVertice2().getRotulo()}) Dist: ${this.getPeso()}km`);
        } else {
            console.log(`(${this.getVertice1().getRotulo()} - ${this.getVertice2().getRotulo()}) Dist: ${this.getPeso()}km`);
        }
  }
 }
}
~~~
</details>

>A classe Vértice, por sua vez, possui os parâmetros rótulos, índice, vértices vizinhos e distâncias.

<details>
<summary>Classe Vértice</summary>

~~~
class Vertice {
    constructor(indice, rotulo) {
        this.rotulo = rotulo || `v${indice}`;
        this.indice = indice;
        this.flag = false;
        this.verticesVizinhos = [];
        this.distancias = [];
    }

    getRotulo() {return this.rotulo;}

    getCidade() {
        return this.rotulo.substring(0,
        this.rotulo.length - 3);}

    setRotulo(rotulo) {this.rotulo = rotulo;}

    getIndice() {return this.indice;}

    setIndice(indice) {this.indice = indice;}

    getFlag() {return this.flag;}

    setFlag(flag) {this.flag = flag;}

    getVerticesVizinhos() {
        return this.verticesVizinhos;}

    addVerticeVizinho(vertice) {
        this.verticesVizinhos.push(vertice);}

    removeVerticeVizinho(vertice) {
        const index = this.verticesVizinhos.indexOf(vertice);
        if (index !== -1) {
            this.verticesVizinhos.splice(index, 1);
        }
    }

    getVerticeVizinho(i) {
        return this.verticesVizinhos[i];
    }

    addDistancia(distancia) {
        this.distancias.push(distancia);
    }

    setDistancia(posicao, distancia) {
        if (posicao >= 1) {
            this.distancias[posicao - 1] = distancia;
            return true;
        }
        return false;
    }

    getDistancias() {return this.distancias;}

    setDistancias(distancias) {
        this.distancias = distancias;
    }

    getVerticeVizinhoByRotulo(rotulo) {
        const verticeVizinho = this.verticesVizinhos.find((vertice) => vertice.getRotulo() === rotulo);
        if (!verticeVizinho) {
            throw new Error("Rotulo invalido");
        }
        return verticeVizinho;
    }
}
~~~
</details>

>A classe Grafo possui como parâmetros o número de vértices, arestas e quais são as suas respectivas listas. Nesta mesma classe, temos as funções getVertice(), adicionarAresta(), adicionarArestaComRotulo() e imprimirGrafo().

<details>
<summary> Classe Grafo </summary>

~~~
class Grafo {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.numArestas = 0;
    this.vertices = [];
    this.arestas = [];
  }

  getNumVertices() {return this.numVertices;}

  getNumArestas() {return this.numArestas;}

  adicionarVertice(indice, rotulo) {
    this.vertices.push(new Vertice(indice, rotulo));

    for (let i = 0; i < this.getNumVertices(); i++) {
      this.getVertice(indice).addDistancia(0);
    }
  }

  getVertice(i) {return this.vertices[i - 1];}

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
}
~~~
</details>

## Implementação do Algoritmo A*
### De acordo com o pseudo código proposto:
![Alt text](image.png)

