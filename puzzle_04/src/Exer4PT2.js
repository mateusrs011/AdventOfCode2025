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

