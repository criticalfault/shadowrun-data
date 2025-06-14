const fs = require('fs');

// Read the EDGE.DAT file
const data = fs.readFileSync('SR3/originalDataFiles/EDGE.DAT', 'utf8');

// Split the file into lines
const lines = data.split('\n');

// Filter out comment lines (lines starting with !)
const nonCommentLines = lines.filter(line => !line.trim().startsWith('!'));

// Parse the header line to understand the structure
const headerLine = nonCommentLines[0];
const [headerFormat, headerName, headerLevel, headerBookPage, headerCost, headerType, headerMods, headerNotes] = headerLine.split('|');

// Initialize the result object
const result = {
  edges: [],
  flaws: []
};

// Track current category
let currentCategory = '';
let currentSubCategory = '';
let isEdge = true;

// Process each non-comment line
for (let i = 1; i < nonCommentLines.length; i++) {
  const line = nonCommentLines[i].trim();
  if (!line) continue;
  
  // Check if this is a category line (starts with "1-")
  if (line.startsWith('1-')) {
    const parts = line.split('|');
    currentCategory = parts[0].substring(2).trim();
    isEdge = parts[1].trim() === 'E';
    currentSubCategory = '';
    continue;
  }
  
  // Check if this is a subcategory line (starts with "3-")
  if (line.startsWith('3-')) {
    const parts = line.split('|');
    currentSubCategory = parts[0].substring(2).trim();
    // Extract the item details
    const item = parseItemLine(parts, currentCategory, currentSubCategory, isEdge);
    if (item) {
      if (isEdge) {
        result.edges.push(item);
      } else {
        result.flaws.push(item);
      }
    }
    continue;
  }
  
  // Check if this is an item line (starts with "2-")
  if (line.startsWith('2-')) {
    const parts = line.split('|');
    // Extract the item details
    const item = parseItemLine(parts, currentCategory, '', isEdge);
    if (item) {
      if (isEdge) {
        result.edges.push(item);
      } else {
        result.flaws.push(item);
      }
    }
    continue;
  }
}

// Function to parse an item line
function parseItemLine(parts, category, subCategory, isEdge) {
  if (parts.length < 5) return null;
  
  const nameWithAsterisk = parts[0].substring(2).trim();
  const name = nameWithAsterisk.startsWith('* ') ? nameWithAsterisk.substring(2) : nameWithAsterisk;
  
  const bookPage = parts[1].trim();
  const cost = parseInt(parts[2].trim(), 10);
  const type = parts[3].trim();
  const mods = parts[4].trim();
  const notes = parts.length > 5 ? parts[5].trim() : '';
  
  return {
    name,
    category,
    subCategory: subCategory || '',
    bookPage,
    cost,
    type,
    mods,
    notes,
    isEdge: isEdge
  };
}

// Write the result to a JSON file
fs.writeFileSync('SR3/jsonDataFiles/edgeUpdated.json', JSON.stringify(result, null, 2));

console.log('Conversion completed successfully!');