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
