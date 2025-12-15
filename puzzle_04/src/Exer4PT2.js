/*const input = require("./input.js");

// Convert input into lines
const grid = input.trim().split("\n").map(val => val.split(''))

// Count how many neighbor cells around (x, y) contain "@"
function countNeighbors(x, y) {
    let count = 0;

    // All 8 surrounding positions
    const directions = [
        [-1, -1], [0, -1], [1, -1],   
        [-1,  0],          [1,  0],   
        [-1,  1], [0,  1], [1,  1]    
    ];

    for (const [dx, dy] of directions) {
        const nx = x + dx; 
        const ny = y + dy; 

        // Check if the position is inside the grid
        if (ny >= 0 && ny < grid.length &&
            nx >= 0 && nx < grid[ny].length) {

            // Count if neighbor is "@"
            if (grid[ny][nx] === "@") {
                count++;
            }
        }
    }

    return count;
}

let accessibleCount = 1;

// Iterate over the entire grid

while(accessibleCount){
    accessibleCount = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {

            const currentChar = grid[y][x];

            // Only check cells that are "@"
            if (currentChar === "@") {
                const neighbors = countNeighbors(x, y);

                
                if (neighbors < 4) {
                    accessibleCount++;
                    grid[y][x] = "x"  
                }
            }
        }
    }
    

    //tem que fazer algo aqui
    //console.log(accessibleCount)
    //console.log(grid)
    //break
}
console.log(accessibleCount);*/

/*const input = require("./input.js");

const grid = input.trim().split("\n").map(val => val.split(''));

// Count how many neighbor cells around (x, y) contain "@"
function countNeighbors(x, y) {
    let count = 0;
    const directions = [
        [-1, -1], [0, -1], [1, -1],
        [-1,  0],          [1,  0],
        [-1,  1], [0,  1], [1,  1]
    ];

    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (ny >= 0 && ny < grid.length &&
            nx >= 0 && nx < grid[ny].length &&
            grid[ny][nx] === "@") {
            count++;
        }
    }
    return count;
}

let total = 0;
let accessibleCount = 1;

while (accessibleCount) {
    accessibleCount = 0;

    const free = Array.from({ length: grid.length }, () =>
        Array(grid[0].length).fill(false)
    );

    const q = [];
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    // Enfileira bordas que são "."
    for (let x = 0; x < grid[0].length; x++) {
        if (grid[0][x] === ".") q.push([x, 0]);
        if (grid[grid.length - 1][x] === ".") q.push([x, grid.length - 1]);
    }
    for (let y = 0; y < grid.length; y++) {
        if (grid[y][0] === ".") q.push([0, y]);
        if (grid[y][grid[0].length - 1] === ".") q.push([grid[0].length - 1, y]);
    }

    while (q.length) {
        const [x, y] = q.shift();
        if (free[y][x]) continue;
        free[y][x] = true;

        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (ny >= 0 && ny < grid.length &&
                nx >= 0 && nx < grid[0].length &&
                grid[ny][nx] === "." &&
                !free[ny][nx]) {
                q.push([nx, ny]);
            }
        }
    }
    // -------------------------------------------

    // Agora seu loop original fica igual
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {

            const currentChar = grid[y][x];

            if (currentChar === "@") {

                // NOVA REGRA: acessível se tocar "." conectado ao exterior
                let isAccessible = false;

                for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                    const nx = x + dx, ny = y + dy;
                    if (ny >= 0 && ny < grid.length &&
                        nx >= 0 && nx < grid[y].length &&
                        free[ny][nx]) {
                        isAccessible = true;
                        break;
                    }
                }

                if (isAccessible) {
                    accessibleCount++;
                    total++;
                    grid[y][x] = ".";
                }
            }
        }
    }
}

console.log(total);*/

const input = require("./input.js");


let grid = input.trim().split("\n").map(line => line.split(""));

// Count how many neighboring cells around (x, y) contain "@"
function countNeighbors(x, y) {
    let count = 0;

    // All 8 surrounding directions
    const directions = [
        [-1, -1], [0, -1], [1, -1],
        [-1,  0],          [1,  0],
        [-1,  1], [0,  1], [1,  1]
    ];

    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        // Check if the position is inside the grid boundaries
        if (
            ny >= 0 && ny < grid.length &&
            nx >= 0 && nx < grid[ny].length
        ) {
            
            if (grid[ny][nx] === "@") {
                count++;
            }
        }
    }

    return count;
}

let totalRemoved = 0;

// Repeat the process until no more rolls can be removed
while (true) {
    let toRemove = [];

    // Scan the entire grid to find accessible rolls
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "@") {
                const neighbors = countNeighbors(x, y);

                // A roll is accessible if it has fewer than 4 neighbors
                if (neighbors < 4) {
                    toRemove.push([x, y]);
                }
            }
        }
    }

    
    if (toRemove.length === 0) break;

    
    for (const [x, y] of toRemove) {
        grid[y][x] = ".";
    }

    
    totalRemoved += toRemove.length;
}

console.log(totalRemoved);

