const fs = require('fs');
const readline = require('readline');
const path = require('path');

const nomeArquivo = 'inputgab.txt';
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
    let PosiAtual = 50;
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
          let temp = (PosiAtual - i) % 100;
          if (temp < 0) temp += 100;
          if (temp === 0) zeroCount++;
        }
        PosiAtual = (PosiAtual - dist) % 100;
        if (PosiAtual < 0) PosiAtual += 100;

      } if (dir === 'R') {
        // Contando zeros durante a rotação para a direita
        for (let i = 1; i <= dist; i++) {
          let temp = (PosiAtual + i) % 100;
          if (temp === 0) zeroCount++;
        }
        PosiAtual = (PosiAtual + dist) % 100;
      }
    }

    console.log(`\n Resposta (método 0x434C49434B): ${zeroCount}`);

  } catch (erro) {
    console.error(`Erro ao ler ou processar o arquivo: ${erro.message}`);
  }
}

processarArquivoLinhaPorLinha();
