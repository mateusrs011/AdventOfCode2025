const input = require('./varID.js');

let ids = input.split(',').map(line => line.split('-').map(Number));
let soma = 0
let somatotal = 0
 

for(let i= 0; i < ids.length; i++){

    let start = ids[i][0]
    let finish = ids[i][1]
    
    for( let j= start; j <=finish; j++){
        
       let id = String(j)

       if(id.length % 2 == 0){
          
          let meio = id.length / 2;

          let parteum = id.substring(0, meio)
          let partedois = id.substring(meio)

          if(parteum === partedois){
             /*let somastring = parteum + partedois
             soma = Number(somastring)
             somatotal += soma*/
             somatotal += j
          }
        }
    }
}

console.log(somatotal)
