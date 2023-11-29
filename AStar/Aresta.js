class Aresta {
    constructor(vertice1, vertice2, rotulo, peso) {
        this.vertice1 = vertice1;
        this.vertice2 = vertice2;
        this.rotulo = rotulo || null;
        this.peso = peso || 0;
    }

    getVertice1() {
        return this.vertice1;
    }

    getVertice2() {
        return this.vertice2;
    }

    getRotulo() {
        return this.rotulo;
    }

    setVertice1(vertice1) {
        this.vertice1 = vertice1;
    }

    setVertice2(vertice2) {
        this.vertice2 = vertice2;
    }

    setRotulo(rotulo) {
        this.rotulo = rotulo;
    }

    getPeso() {
        return this.peso;
    }

    setPeso(peso) {
        this.peso = peso;
    }

    getAresta() {
        if (this.rotulo === null) {
            console.log(`(${this.getVertice1().getRotulo()} - ${this.getVertice2().getRotulo()}) Dist: ${this.getPeso()}km`);
        } else {
            console.log(`(${this.getVertice1().getRotulo()} - ${this.getVertice2().getRotulo()}) Dist: ${this.getPeso()}km`);
        }
    }
}

module.exports = Aresta;
