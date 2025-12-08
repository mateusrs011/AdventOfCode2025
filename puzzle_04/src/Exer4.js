const input = require("./input.js");

// transforma o input em linhas
const grid = input.trim().split("\n");

// conta quantos vizinhos @ existem ao redor de (x, y)
function contarVizinhos(x, y) {
    let count = 0;

    // Lista das 8 posições ao redor
    const direcoes = [
        [-1, -1], [0, -1], [1, -1],   // cima esquerda, cima, cima direita
        [-1,  0],          [1,  0],   // esquerda,        direita
        [-1,  1], [0,  1], [1,  1]    // baixo esquerda, baixo, baixo direita
    ];

    for (const [dx, dy] of direcoes) {
        const nx = x + dx; // nova posição X
        const ny = y + dy; // nova posição Y

        // verifica se está dentro do grid
        if (ny >= 0 && ny < grid.length &&
            nx >= 0 && nx < grid[ny].length) {

            if (grid[ny][nx] === "@") {
                count++;
            }
        }
    }

    return count;
}

let acessiveis = 0;

// percorre toda a matriz
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {

        const char = grid[y][x];

        if (char === "@") {
            const vizinhos = contarVizinhos(x, y);

            // se tiver menos de 4 vizinhos @, é acessível
            if (vizinhos < 4) {
                acessiveis++;
            }
        }
    }
}

console.log(acessiveis);



