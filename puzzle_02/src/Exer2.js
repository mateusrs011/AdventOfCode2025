const input = require('./varID.js');

function isInvalidID(num) {
  const s = String(num);

  if (s.length % 2 !== 0) return false;

  const half = s.length / 2;
  const left = s.slice(0, half);
  const right = s.slice(half);

  return left === right;
}

let total = 0;

const ranges = input.split(',');

for (const range of ranges) {
  const [start, end] = range.split('-').map(Number);

  for (let num = start; num <= end; num++) {
    if (isInvalidID(num)) {
      total += num;
    }
  }
}

console.log("Total dos IDs inválidos:", total);
