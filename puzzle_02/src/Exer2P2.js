const input = require('./varID.js');

function isInvalidID(num) {
  const s = String(num);
  const len = s.length;

  for (let size = 1; size <= Math.floor(len / 2); size++) {
    // apenas tamanhos que dividem o número inteiro
    if (len % size !== 0) continue;

    const pattern = s.slice(0, size);

    // repete o padrão várias vezes
    const repeated = pattern.repeat(len / size);

    if (repeated === s) {
      return true; 
    }
  }

  return false; 
}

let total = 0;

const ranges = input.split(',');


for (const range of ranges) {
  const [start, end] = rnage.split('-').map(Number);

  for (let num = start; num <= end; num++) {
    if (isInvalidID(num)) {
      total += num;
    }
  }
}

console.log("Total dos IDs inválidos (parte 2):", total);
