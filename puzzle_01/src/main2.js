const input = require("./input.js")
let ponteiro = input.split('\n')
let contador = 0
let passos = 0
let posicao = 50

for (let i = 0; i < ponteiro.length; i++) {

    let passos = Number(ponteiro[i].substring(1))
    let direcao = ponteiro[i][0]

    for (let p = 0; p < passos; p++) { //conta de um em um cada passo que o ponteiro da

        if (direcao === 'R') {
            posicao++
            if (posicao > 99) posicao = 0
        }

        if (direcao === 'L') {
            posicao--
            if (posicao < 0) posicao = 99
        }

        if (posicao === 0) {
            contador++
        }
    }
}

console.log(contador)