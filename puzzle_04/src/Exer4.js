const input = require("./input.js");

// Convert input into lines
const grid = input.trim().split("\n");

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

let accessibleCount = 0;

// Iterate over the entire grid
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {

        const currentChar = grid[y][x];

        // Only check cells that are "@"
        if (currentChar === "@") {
            const neighbors = countNeighbors(x, y);

            
            if (neighbors < 4) {
                accessibleCount++;
            }
        }
    }
}

console.log(accessibleCount);
