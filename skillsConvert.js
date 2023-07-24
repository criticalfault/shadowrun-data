const fs = require('fs');
const path = require('path');

// Function to parse the SKILLS.DAT file and convert it to JSON format
function parseSkillsDat(skillsDatContent) {
  const skillCategories = {};
  let currentCategory;
  let currentSkill;
  let lines = skillsDatContent.split(/\r?\n/);

  for (let line of lines) {
    if (line.startsWith('!') || line.trim() === '') continue; // Skip comments and empty lines

    if (line.startsWith('#')) {
      currentCategory = line.substring(1).trim();
      skillCategories[currentCategory] = [];
    } else if (line.startsWith('weapon->')) {
      currentSkill = null; // Skip specialization, as it's a 'weapon->'
    } else if (line.startsWith(' ')) {
      if (!currentSkill) continue; // Skip specialization if currentSkill is not defined
      const [specialization, specializationSource] = line.split('|');
      if (specialization) {
        currentSkill.specializations.push({
          name: specialization.trim(),
          source: specializationSource,
        });
      }
    } else {
      const [nameAttribute, source] = line.split('|');
      const [name, attribute] = nameAttribute.split('(');
      currentSkill = { name: name.trim(), attribute: attribute ? attribute.slice(0, -1).trim() : '', source: source.trim(), specializations: [] };
      skillCategories[currentCategory].push(currentSkill);
    }
  }

  return skillCategories;
}

function getSource(lines, startIndex) {
    for (let i = startIndex; i < lines.length; i++) {
      if (!lines[i].startsWith(' ') && !lines[i].startsWith('!')) {
        const lineParts = lines[i].split('|');
        if (lineParts.length > 1) {
          return lineParts[1].trim();
        } else {
          return '';
        }
      }
    }
    return '';
  }

const skillsDatPath = '/Users/deanp/Desktop/ShadowrunTools/sr3-data/originalDataFiles/SKILLS.DAT';
const skillsJsonPath = '/Users/deanp/Desktop/ShadowrunTools/sr3-data/jsonDataFiles/skills.json';

// Read the SKILLS.DAT file
fs.readFile(skillsDatPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading SKILLS.DAT:', err);
    return;
  }

  // Parse the data and generate JSON
  try {
    const skillsJSON = JSON.stringify(parseSkillsDat(data), null, 2);

    // Write the JSON to a file
    fs.writeFile(skillsJsonPath, skillsJSON, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to skills.json:', err);
        return;
      }
      console.log('skills.json file generated successfully!');
    });
  } catch (parseError) {
    console.error('Error parsing SKILLS.DAT:', parseError);
  }
});