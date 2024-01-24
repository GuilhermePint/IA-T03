# Algoritmo Q-learning
O Q-learning é uma técnica de aprendizado por reforço que permite ao agente aprender uma política de ação ótima para atingir seu objetivo no ambiente. No contexto da navegação autônoma, as ações possíveis são movimentos em direções específicas (cima, baixo, esquerda, direita).
## Situação Problema
Imagine um ambiente de fábrica onde um robô autônomo é responsável por montar carros. O objetivo do robô é encontrar e coletar todas as peças necessárias para a montagem de um carro específico. Este cenário apresenta desafios de navegação, tomada de decisões e otimização de trajetória para garantir uma montagem eficiente.

### Elementos da Situação Problema:

#### Mapa da Fábrica:

A fábrica é composta por várias salas, corredores e áreas de armazenamento de peças. Cada local na fábrica é representado como um estado no ambiente do Q-learning.

#### Ações do Robô:

O robô pode executar várias ações, como se mover para cima, para baixo, para a esquerda, para a direita ou coletar uma peça em sua localização atual.
Recompensas e Penalidades:

O robô recebe recompensas positivas ao coletar uma peça de montagem. Recompensas negativas podem ser aplicadas se o robô colidir com obstáculos, escolher caminhos ineficientes ou não conseguir encontrar uma peça.
#### Objetivo Final:

O objetivo final é que o robô aprenda uma política de ação ótima (estratégia) para percorrer eficientemente a fábrica, coletando todas as peças de montagem necessárias para montar um carro completo.
#### Implementação do Q-learning:

Os estados do Q-learning correspondem às diferentes localizações na fábrica.
As ações do Q-learning incluem os movimentos do robô e a ação de coletar uma peça.
A tabela Q é atualizada com base nas recompensas e penalidades obtidas durante o treinamento.
Desafios:

O robô precisa equilibrar a exploração de novas áreas para encontrar peças desconhecidas e a exploração de áreas conhecidas para otimizar a rota.
A dinâmica da fábrica, como obstáculos móveis ou alterações na disposição das peças, pode adicionar complexidade à tarefa.

## Modelagem Escolhida 
Baseia-se na definição de constantes como o locationToState que são os locais que apoiarão na definiçao dos estados, das ações e matriz de recompensas.
~~~
const gamma = 0.75; // fator de desconto
const alpha = 0.9;

const locationToState = {
    'L1': 0,
    'L2': 1,
    'L3': 2,
    'L4': 3,
    'L5': 4,
    'L6': 5,
    'L7': 6,
    'L8': 7,
    'L9': 8,
};

const actions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// matriz de recompensas usando mathjs
const rewards = math.matrix([
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0]
]);

~~~
## Implementação do Algoritmo Q-Learning
~~~
const math = require('mathjs');

const gamma = 0.75; // fator de desconto
const alpha = 0.9;

const locationToState = {
    'L1': 0,
    'L2': 1,
    'L3': 2,
    'L4': 3,
    'L5': 4,
    'L6': 5,
    'L7': 6,
    'L8': 7,
    'L9': 8,
};

const actions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// Crie uma matriz de recompensas usando mathjs
const rewards = math.matrix([
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0]
]);

// Indica os locais
const stateToLocation = Object.fromEntries(Object.entries(locationToState).map(([key, value]) => [value, key]));

function getOptimalRoute(startLocation, endLocation) {
    // Copia os prêmios de uma matriz para uma nova usando mathjs
    const rewardsNew = math.clone(rewards);
    // Pega o último estado correspondendo ao último local dado
    const endingState = locationToState[endLocation];
    // com isso define a prioridade do estado dado como a maior
    rewardsNew.subset(math.index(endingState, endingState), 999);

    // Q-learning algorithm começa
    // Inicializando q-values
    const Q = math.zeros(9, 9);

    // Q-learning processo
    for (let i = 0; i < 1000; i++) {
        // Pega um estado aleatoriamente
        const currentState = Math.floor(Math.random() * 9);
        const playableActions = [];
        // Itera pelas recompensas da matriz e pega as ações > 0
        for (let j = 0; j < 9; j++) {
            if (rewardsNew.subset(math.index(currentState, j)) > 0) {
                playableActions.push(j);
                // Pega uma ação aleatoriamente da lista de ações e leva ao próximo estado
                const nextAction = math.pickRandom(playableActions)[0];
                // Computa a diferença temporal
                // a ação se refere à ida ao próximo estado
                const TD = rewardsNew.subset(math.index(currentState, nextAction)) + gamma * math.max(Q.subset(math.index(nextAction, math.argmax(Q.subset(math.index(nextAction)))))) - Q.subset(math.index(currentState, nextAction));
                // Atualiza q-value usando a equação de Bellman
                Q.subset(math.index(currentState, nextAction), Q.subset(math.index(currentState, nextAction)) + alpha * TD);
            }
        }
    }

    // Inicializa uma rota ótima para o local de início
    const route = [startLocation];
    // Como não se sabe ainda o próximo local, ele deve ser inicializado com o de início
    let nextLocation = startLocation;

    while (nextLocation !== endLocation) {
        // Busca o local de início
        const startingState = locationToState[startLocation];
        // Busca o maior valor de q-value a partir do estado inicial
        const nextAction = math.argmax(Q.subset(math.index(startingState)))[0];
        // Próximo estado capturado, falta a letra correspondente
        nextLocation = stateToLocation[nextAction];
        route.push(nextLocation);
        // Atualiza o local de início para a próxima iteração
        startLocation = nextLocation;
    }

    return route;
}

console.log(getOptimalRoute('L1', 'L9'));
~~~
## Casos de Teste, Complexidade do Algoritmo e Discussão
### Casos de Teste
### Complexidade do Algoritmo
Número de Iterações (épocas) de Treinamento:

O algoritmo Q-learning envolve um processo iterativo de exploração e atualização das Q-values.
O loop for que realiza as iterações de treinamento é executado um número fixo de vezes (1000 no seu exemplo).
A complexidade é linear em relação ao número de iterações, portanto, O(E), onde E é o número de iterações de treinamento.
Número de Estados e Ações:

A complexidade também é afetada pelo número de estados e ações no ambiente.
No seu exemplo, você tem 9 estados e 9 ações, resultando em uma matriz Q de tamanho 9x9.
A atualização da matriz Q envolve operações que dependem do número de estados e ações, resultando em O(S * A), onde S é o número de estados e A é o número de ações.
Número de Ações Executáveis em um Estado:

A eficiência do algoritmo também depende do número de ações possíveis a partir de um estado.
Se o número de ações possíveis for grande, a busca aleatória pode ser menos eficiente.
O uso de técnicas de exploração mais sofisticadas pode impactar a complexidade.
Outros Fatores:

Fatores como o tamanho da tabela Q, escolha de hiperparâmetros (taxa de aprendizado, fator de desconto), entre outros, podem influenciar a complexidade.
Portanto, a complexidade total do algoritmo Q-learning pode ser expressa como a soma das complexidades das operações relevantes, e é comumente expressa em termos de O(E * (S * A) + N*M), onde E é o número de iterações de treinamento, S é o número de estados e A é o número de ações e N e M são as dimensões da matriz usada.