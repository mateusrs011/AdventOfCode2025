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

    // >>> Variáveis do puzzle DEVEM ficar fora do loop <<<
    let current = 50;
    let zeroCount = 0;

    for await (const linha of rl) {
      contadorLinhas++;

      console.log(`Linha ${contadorLinhas}: ${linha}`);

      const line = linha.trim();
      if (line === "") continue;

      const dir = line[0];
      const dist = Number(line.slice(1));

      // Movimento
      if (dir === 'L') {
        current = (current - dist) % 100;
        if (current < 0) current += 100;
      } else {
        current = (current + dist) % 100;
      }

      // Contagem de zeros
      if (current === 0) zeroCount++;
    }

    // >>> Depois de ler TODAS as linhas <<<
    console.log(`\n✅ Resposta: ${zeroCount}`);

  } catch (erro) {
    console.error(`❌ Erro ao ler ou processar o arquivo: ${erro.message}`);
  }
}

processarArquivoLinhaPorLinha();