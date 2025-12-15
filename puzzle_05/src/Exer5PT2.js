const input = require("./input.js");

// Splits ranges and (ignored) IDs
const [rangesPart] = input.trim().split("\n\n");  

// Converts ranges into {start, end}
function parseRanges(text) {                      
    return text.split("\n").map(line =>{
        const [start, end] = line.split("-").map(Number);
        return { start, end };
    });
}

const ranges = parseRanges(rangesPart);

// Sort ranges by start
ranges.sort((a, b) => a.start - b.start);

// Merge overlapping ranges
const merged = [];

for (const range of ranges) {
    if (merged.length === 0) {
        merged.push({ ...range });
        continue;
    }

    const last = merged[merged.length - 1];

    // If the current range overlaps the last merged range → merge them
    if (range.start <= last.end) {
        last.end = Math.max(last.end, range.end);
    } else {
        // Otherwise push as a new range
        merged.push({ ...range });
    }
}

// Count total fresh IDs across merged ranges
let totalFresh = 0;

for (const r of merged) {
    totalFresh += (r.end - r.start + 1); // inclusive range
}

console.log("Total fresh IDs (Part 2):", totalFresh);


