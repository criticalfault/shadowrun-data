const fs = require('fs');

const DataPath = '/Users/deanp/Desktop/ShadowrunTools/sr3-data/originalDataFiles/DECK.DAT';
const JsonPath = '/Users/deanp/Desktop/ShadowrunTools/sr3-data/jsonDataFiles/DECK.json';

function convertDataToObject(data) {
  const lines = data.split('\n');
  const result = {};

  let currentCategory = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines and lines starting with "!"
    if (trimmedLine === '' || trimmedLine.startsWith('!')) {
      continue;
    }

    // Check if it's a key line starting with "0-" (e.g., "0-1|Edged weapon|10|...")
    if (/^0-(\d+)/.test(trimmedLine)) {
      const [keyValue, name, ...attributes] = trimmedLine.split('|');
      const key = keyValue.split('-')[1];
      currentCategory = { name, key, attributes, entries: [] };
      result[key] = currentCategory;
    } else if (/^\d+-\*/.test(trimmedLine)) {
      // Check if it's an entry line (e.g., "4-* Axe(EDG) 1|2|1|...")
      const [keyValue, ...entryAttributes] = trimmedLine.split('|');
      const key = keyValue.split(' ').slice(-1); // Extract the key from the item entry
      const name = keyValue.split('|')[0].match(/ ([A-z\s()\-0-9^>.]{1,31})/)[0].trim();

      // Use the key to find the category in the result object
      const category = result[key];
      if (category) {
        category.entries.push({ name, attributes: entryAttributes });
      }
    }
  }

  return result;
}

fs.readFile(DataPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const nestedObject = convertDataToObject(data);
  const jsonData = JSON.stringify(nestedObject, null, 2);

  fs.writeFile(JsonPath, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }

    console.log('Conversion to JSON successful.');
  });
});
