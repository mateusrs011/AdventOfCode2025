const input = require('./input'); // importa o varID

// quebra as linhas
const linhas = input.trim().split('\n'); //

let total = 0;

for (let k = 0; k < linhas.length; k++) {
  const linha = linhas[k].trim();

  let maxJoltage = 0;

  // Esses dois for testam todos os pares de números da linha, sempre pegando um número e depois outro que vem depois dele.
  for (let i = 0; i < linha.length; i++) {
    for (let j = i +1; j < linha.length; j++) {
      const num = Number(linha[i] + linha[j]);

      if (num > maxJoltage) {
        maxJoltage = num;
      }
    }
  }

  total += maxJoltage;
}

console.log("Total de saída de joltage:", total);
