const input = require('./varID.js');

let ids = input.split(',').map(line => line.split('-').map(Number));
let somatotal = 0;

function isInvalid(id) {
  const len = id.length;

  for (let k = 1; k <= len / 2; k++) {
    if (len % k !== 0) continue;

    console.log(len,k)

    const pattern = id.substring(0, k);
    const repeats = len / k;

    if (pattern.repeat(repeats) === id) {
      return true;
    }
  }

  return false;
}


for (let i = 0; i < ids.length; i++) {
  let start = ids[i][0];
  let finish = ids[i][1];

  for (let j = start; j <= finish; j++) {
    let id = String(j);

    if (isInvalid(id)) {
      somatotal += j;
    }
  }
}

console.log(somatotal);
