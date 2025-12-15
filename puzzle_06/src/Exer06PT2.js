// main.js
const raw = require('./input.js');

// Split input into lines and normalize line endings
const lines = raw.replace(/\r/g, '').split('\n');

// Grid dimensions
const H = lines.length;
const W = Math.max(...lines.map(l => l.length));

// Create a fixed-width grid
const grid = lines.map(l => l.padEnd(W, ' '));

// Check if a column contains only spaces
function isEmptyColumn(c) {
    for (let r = 0; r < H; r++) {
        if (grid[r][c] !== ' ') return false;
    }
    return true;
}

// Extract contiguous column blocks (each block represents an independent calculation)
// Columns are processed from right to left
let problems = [];
let current = [];

for (let c = W - 1; c >= 0; c--) {
    if (isEmptyColumn(c)) {
        if (current.length > 0) {
            problems.push(current.slice());
            current = [];
        }
    } else {
        // Store full column as [row0, row1, ..., rowH-1]
        const col = [];
        for (let r = 0; r < H; r++) col.push(grid[r][c]);
        current.push(col);
    }
}

if (current.length > 0) {
    problems.push(current.slice());
}

// Solve a single problem block
function solveProblem(cols) {
    const operatorRow = H - 1;

    // Detect operator in the bottom row
    let op = null;
    for (const col of cols) {
        const cell = col[operatorRow];
        if (cell === '+' || cell === '*') {
            op = cell;
            break;
        }
    }
    if (!op) throw new Error('Operator not found');

    // Convert each column into a number (top to operatorRow - 1)
    const numbers = cols.map(col => {
        const value = col
            .slice(0, operatorRow)
            .join('')
            .trim();
        return Number(value || '0');
    });

    // Apply operator
    return op === '+'
        ? numbers.reduce((a, b) => a + b, 0)
        : numbers.reduce((a, b) => a * b, 1);
}

// Aggregate results from all problems
let total = 0;
for (const problem of problems) {
    total += solveProblem(problem);
}

console.log('Part 2:', total);

