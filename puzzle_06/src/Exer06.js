const input = require("./input.js");

// Quebra em linhas corrigindo \r
const lines = input.replace(/\r/g, "").split("\n");

// Coloca padding nas linhas (todas ficam com mesmo tamanho)
const maxLen = Math.max(...lines.map(l => l.length));
const grid = lines.map(l => l.padEnd(maxLen, " "));

// Identifica coluna separadora (coluna 100% vazia)
const emptyCols = [];
for (let col = 0; col < maxLen; col++) {
  let allSpace = true;
  for (let row = 0; row < grid.length; row++) {
    if (grid[row][col] !== " ") {
      allSpace = false;
      break;
    }
  }
  emptyCols[col] = allSpace;
}

// Agrupa colunas não vazias → cada grupo é um problema
const groups = [];
let current = null;

for (let col = 0; col < maxLen; col++) {
  if (!emptyCols[col]) {
    if (!current) current = { start: col, end: col };
    else current.end = col;
  } else {
    if (current) {
      groups.push(current);
      current = null;
    }
  }
}
if (current) groups.push(current);

// Extrai números e operador de cada bloco vertical
function extractProblem({ start, end }) {
  const parts = [];
  for (let r = 0; r < grid.length; r++) {
    const raw = grid[r].slice(start, end + 1).trim();
    if (raw.length > 0) parts.push(raw);
  }
  return parts;
}

let total = 0n;

for (const group of groups) {
  const parts = extractProblem(group);

  const operator = parts[parts.length - 1]; // + ou *
  const nums = parts.slice(0, -1).map(n => BigInt(n));

  let result = operator === "+" ? 0n : 1n;

  for (const n of nums) {
    result = operator === "+" ? result + n : result * n;
  }

  total += result;
}

console.log("Grand total:", total.toString());