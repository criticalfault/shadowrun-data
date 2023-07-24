const fs = require('fs');
const { tmpdir } = require('os');

var finalWriteObject = [];
const allFileContents = fs.readFileSync('/Users/deanp/Desktop/sr3-data/originalDataFiles/firearms.dat', 'utf-8');

let lineNumber = 0;
let depth = 0;
let objectPath = [];
allFileContents.split(/\r?\n/).forEach(line =>  {

    //Skip comments
    if(line.charAt(0) === '!'){
        return;
    }

    //Skip Header Line
    if(lineNumber === 0){
        lineNumber++;
        return;
    }
    
     let tempArray = line.split('|');

    /* let foundCategory = tempArray[0].match(/(\d)-([^\*]+\w[^\S])/);
    if(foundCategory != false){
        if(foundCategory[0] > depth){
            depth = found;
            objectPath.push(foundCategory[1]);
        }else if (foundCategory[0] == depth){

        }else if(foundCategory[0] < depth){
            depth = found;
            objectPath.pop();
        }
    }
    */

    //0-3|Firearms|10|Concealability|Ammunition|Mode|Damage|Weight|Availability|$Cost|Street Index|Accessories|Book.Page|
    tempObject = {
        "Name": tempArray[0].substring(4).replace(' 3','').trimEnd(),
        "Concealability": tempArray[1],
        "Ammunition": tempArray[2],
        "Mode": tempArray[3],
        "Damage": tempArray[4],
        "Weight": tempArray[5],
        "Availability": tempArray[6],
        "Cost": tempArray[7],
        "StreetIndex": tempArray[8],
        "Accessories": tempArray[9],
        "BookPage": tempArray[10]
    }


    if(tempObject.Cost === undefined){
    }else{
        finalWriteObject.push(tempObject);
    }

    //0-3|Firearms|10|Concealability|Ammunition|Mode|Damage|Weight|Availability|$Cost|Street Index|Accessories|Book.Page|
    // tempObject = {
    //     "Name": tempArray[0].substring(4).replace(' 3','').trimEnd(),
    //     "Concealability": tempArray[1],
    //     "Ammunition": tempArray[2],
    //     "Mode": tempArray[3],
    //     "Damage": tempArray[4],
    //     "Weight": tempArray[5],
    //     "Availability": tempArray[6],
    //     "Cost": tempArray[7],
    //     "StreetIndex": tempArray[8],
    //     "Accessories": tempArray[9],
    //     "BookPage": tempArray[10]
    // }



    //0-8|Clothing and Armor|8|Concealability|Ballistic|Impact|Weight|Availability|$Cost|Street Index|Book.Page|
    // tempObject = {
    //     "Name": tempArray[0].substring(4).replace(' 8','').trimEnd(),
    //     "Concealability": tempArray[1],
    //     "Ballistic": tempArray[2],
    //     "Impact": tempArray[3],
    //     "Weight": tempArray[4],
    //     "Availability": tempArray[5],
    //     "Cost": tempArray[6],
    //     "Street Index": tempArray[7],
    //     "BookPage": tempArray[8]
    // }

    //0-12|Cyberdeck Other|5|Availability|$Cost|Street Index|Legality|Book.Page|
    // tempObject = {
    //     "Name": tempArray[0].substring(4).replace(' 33','').trimEnd(),
    //     "Availability": tempArray[1],
    //     "Cost": tempArray[2],
    //     "Street Index": tempArray[3],
    //     "Multiplier": tempArray[4],
    //     "BookPage": tempArray[5]
    // }

    //0-12|Cyberdeck Other|5|Availability|$Cost|Street Index|Legality|Book.Page|
    // tempObject = {
    //     "Name": tempArray[0].substring(4).replace(' 12','').trimEnd(),
    //     "Availability": tempArray[1],
    //     "Cost": tempArray[2],
    //     "Street Index": tempArray[3],
    //     "Legality": tempArray[4],
    //     "BookPage": tempArray[5]
    // }

    //0-11|Cyberdecks|10|Persona|Hardening|Memory|Storage|I/O Speed|Response Increase|Availability|$Cost|Street Index|Book.Page|
    // tempObject = {
    //     "Name": tempArray[0].substring(4).replace('     11','').trimEnd(),
    //     "Persona": tempArray[1],
    //     "Hardening": tempArray[2],
    //     "Memory": tempArray[3],
    //     "Storage": tempArray[4],
    //     "I/O Speed": tempArray[5],
    //     "Response Increase": tempArray[6],
    //     "Availability": tempArray[7],
    //     "Cost": tempArray[8],
    //     "Street Index": tempArray[9],
    //     "BookPage": tempArray[10],
    // }

    //0-33|Cyberdeck Other2|5|Availability|$Cost|Street Index|Multiplier|Book.Page|
    // tempObject = {
    //     "Name": tempArray[0].substring(4).replace('     11','').trimEnd(),
    //     "Availability": tempArray[1],
    //     "Cost": tempArray[2],
    //     "Street Index": tempArray[3],
    //     "Multiplier": tempArray[4],
    //     "BookPage": tempArray[5]
    // }


    //0-1|Edges-Flaws|5|Book.Page|$Cost|EorF|Mods|Notes
    //    tempObject = {
    //     "Name": tempArray[0].substring(4).replace('     1','').trimEnd(),
    //     "BookPage": tempArray[1],
    //     "Cost": tempArray[2],
    //     "EorF": tempArray[3],
    //     "Mods": tempArray[4],
    //     "Notes": tempArray[5]
    // }

    //0-1|Spells|8|Book.Page|Type|Target|Duration|Range|Drain|Class|Notes
    // tempObject = {
    //     "Name": tempArray[0].substring(4).replace('     1','').trimEnd(),
    //     "BookPage": tempArray[1],
    //     "Type": tempArray[2],
    //     "Target": tempArray[3],
    //     "Duration": tempArray[4],
    //     "Range": tempArray[5],
    //     "Drain": tempArray[6],
    //     "Class": tempArray[7],
    //     "Notes": tempArray[8]
    // };

    // finalWriteObject.push({
    //     "Name": tempArray[0].substring(4).replace('     1','').trimEnd(),
    //     "BookPage": tempArray[1],
    //     "Cost": tempArray[2],
    //     "Mods": tempArray[3],
    //     "Notes": tempArray[4]
    // });

    //CyberParts|10|Book.Page|Availability|EssCost|$Cost|Mods|LegalCode|Capacity|Category|Street Index|Notes|
    // let tempObject = {
    //     "Name": tempArray[0].substring(4).replace('     1','').trimEnd(),
    //     "BookPage": tempArray[1],
    //     "Availability":tempArray[2],
    //     "EssCost": tempArray[3],
    //     "Cost": tempArray[4],
    //     "Mods": tempArray[5],
    //     "LegalCode": tempArray[6],
    //     "Capacity": tempArray[7],
    //     "Category": tempArray[8],
    //     "StreetIndex": tempArray[9],
    //     "Notes": tempArray[10]
    // }




    
    //console.log(`Line from file: ${line}`);
});
fs.writeFile('/Users/deanp/Desktop/sr3-data/jsonDataFiles/firearms.json', JSON.stringify(finalWriteObject), err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
});

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);