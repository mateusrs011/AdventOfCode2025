const input = require("./input.js")
let ponteiro = input.split('\n')
let contador = 0
let passos = 0
let posicao = 50

for(let i = 0; i < ponteiro.length; i++){
    
    passos = Number(ponteiro[i].substring(1)) 
    
    if('R'=== ponteiro[i][0]){
        posicao += passos

        while(posicao > 99){  
        posicao -= 100
        }
    }
    if('L'=== ponteiro[i][0]){
       posicao -= passos

       while(posicao < 0){
       posicao += 100
       }
    }
    
    if(posicao === 0){
       contador++
    }

}

console.log(contador)