class Vertice {
    constructor(indice, rotulo) {
        this.rotulo = rotulo || `v${indice}`;
        this.indice = indice;
        this.flag = false;
        this.verticesVizinhos = [];
        this.distancias = [];
    }

    getRotulo() {
        return this.rotulo;
    }

    getCidade() {
        return this.rotulo.substring(0, this.rotulo.length - 3);
    }

    setRotulo(rotulo) {
        this.rotulo = rotulo;
    }

    getIndice() {
        return this.indice;
    }

    setIndice(indice) {
        this.indice = indice;
    }

    getFlag() {
        return this.flag;
    }

    setFlag(flag) {
        this.flag = flag;
    }

    getVerticesVizinhos() {
        return this.verticesVizinhos;
    }

    addVerticeVizinho(vertice) {
        this.verticesVizinhos.push(vertice);
    }

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

    getDistancias() {
        return this.distancias;
    }

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

module.exports = Vertice;
