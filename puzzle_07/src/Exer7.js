const input = require('./input'); 


const lines = input.replace(/\r/g, '').split('\n');
const grid = lines.map(l => l.split(''));
const rows = grid.length;
const cols = grid[0] ? grid[0].length : 0;


let sRow = -1, sCol = -1;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (grid[r][c] === 'S') {
      sRow = r;
      sCol = c;
      break;
    }
  }
  if (sRow !== -1) break;
}
if (sRow === -1) {
  console.error('Não foi encontrada a posição S no input.');
  process.exit(1);
}

let totalSplits = 0;
const visitedStarts = new Set();        
const processedSplitters = new Set();  

function key(row, col) { return row + ',' + col; }


function processBeam(startRow, col) {
  if (col < 0 || col >= cols) return;
  const startKey = key(startRow, col);
  if (visitedStarts.has(startKey)) return;
  visitedStarts.add(startKey);

  for (let r = startRow; r < rows; r++) {
    const cell = grid[r][col];
    if (cell === '^') {
      const splitterKey = key(r, col);
      
      if (processedSplitters.has(splitterKey)) {
        return;
      }
     
      processedSplitters.add(splitterKey);
      totalSplits += 1;
      
      processBeam(r, col - 1);
      processBeam(r, col + 1);
      return; 
    } else {
      
      continue;
    }
  }
  
}


const initialRow = sRow + 1;
if (initialRow < rows) {
  processBeam(initialRow, sCol);
}

console.log('Total de splits:', totalSplits);
