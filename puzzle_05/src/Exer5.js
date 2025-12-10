const input = require("./input.js");

// Splits ranges and IDs
const [rangesPart, idsPart] = input.trim().split("\n\n");

// Converts ranges into {start, end} objects
function parseRanges(text) {
    return text.split("\n").map(line => {
        const [start, end] = line.split("-").map(Number);
        return { start, end };
    });
}

// Converts IDs into regular numbers
function parseIds(text) {
    return text.split("\n").map(Number);
}

// Checks if an ID is fresh (if it is inside any range)
function isFresh(id, ranges) {
    return ranges.some(r => id >= r.start && id <= r.end);
}

const ids = parseIds(idsPart);
const ranges = parseRanges(rangesPart);

let freshCount = 0;

for (const id of ids) {
    if (isFresh(id, ranges)) {
        freshCount++;
    }
}

console.log("Fresh IDs:", freshCount);
