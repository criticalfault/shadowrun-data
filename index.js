const fs = require('fs');
const { tmpdir } = require('os');

var finalWriteObject = [];
const allFileContents = fs.readFileSync('/Users/deanp/Desktop/sr3-data/originalDataFiles/adept.dat', 'utf-8');

allFileContents.split(/\r?\n/).forEach(line =>  {

    if(line.charAt(0) === '!'){
        return;
    }

    let tempArray = line.split('|');
    finalWriteObject.push({
        "Name": tempArray[0].substring(4).replace('     1','').trimEnd(),
        "BookPage": tempArray[1],
        "Cost": tempArray[2],
        "Mods": tempArray[3],
        "Notes": tempArray[4]
    });
    //console.log(`Line from file: ${line}`);
});
fs.writeFile('/Users/deanp/Desktop/sr3-data/jsonDataFiles/adept.json', JSON.stringify(finalWriteObject), err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
});

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);