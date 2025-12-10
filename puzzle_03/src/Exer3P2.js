const input = require('./input'); // importa o varID

// quebra as linhas
let linhas = input.trim().split('\n'); 
let spaces = 12
let finalnumber = ""
let batteries = Array(linhas.length)
let count = 0
let position = 0

//For loop to convert a string array to a number array, also transforms it into a matrix
for(let i = 0; i < linhas.length; i++){
    linhas[i] = linhas[i].split('')
    batteries[i] = linhas[i].map(Number)
}

for(let i = 0; i <batteries.length; i++){
    finalnumber = ""
    position = 0
    for(let j = spaces - 1;  j >= 0; j--){

    let subbatteries = batteries[i].slice(position, batteries[i].length - j)
    let highest = Math.max(...subbatteries)
    
    if(subbatteries.indexOf(highest) + 1 === subbatteries.length){
        subbatteries = batteries[i].slice(batteries[i].length - j - 1, batteries[i].length)
        finalnumber += subbatteries.join("")
        break
    }

    finalnumber += String(highest)
    position += subbatteries.indexOf(highest) + 1


    }
    
    count += Number(finalnumber)
}

 
console.log(count)