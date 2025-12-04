const fs = require('fs');
const readline = require('readline');
const path = require('path');

const nomeArquivo = 'input.txt';
const caminhoAbsoluto = path.join(__dirname, nomeArquivo);

async function processarArquivoLinhaPorLinha() {
  try {
    const fileStream = fs.createReadStream(caminhoAbsoluto);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let contadorLinhas = 0;

    // Variáveis do puzzle
    let current = 50;
    let zeroCount = 0;

    for await (const linha of rl) {
      contadorLinhas++;
      const line = linha.trim();
      if (line === "") continue;

      console.log(`Linha ${contadorLinhas}: ${line}`);

      const dir = line[0];           // 'L' ou 'R'
      const dist = Number(line.slice(1)); // distância

      if (dist === 0) continue;

      if (dir === 'L') {
        // Contando zeros durante a rotação para a esquerda
        for (let i = 1; i <= dist; i++) {
          let temp = (current - i) % 100;
          if (temp < 0) temp += 100;
          if (temp === 0) zeroCount++;
        }
        current = (current - dist) % 100;
        if (current < 0) current += 100;
      } else {
        // Contando zeros durante a rotação para a direita
        for (let i = 1; i <= dist; i++) {
          let temp = (current + i) % 100;
          if (temp === 0) zeroCount++;
        }
        current = (current + dist) % 100;
      }
    }

    console.log(`\n Resposta (método 0x434C49434B): ${zeroCount}`);

  } catch (erro) {
    console.error(`Erro ao ler ou processar o arquivo: ${erro.message}`);
  }
}

processarArquivoLinhaPorLinha();
