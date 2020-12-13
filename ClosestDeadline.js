//Test
const lineReader = require('line-reader');
const fs = require('fs');
const moment = require('moment-timezone');

moment.locale('ru');
moment().format('lll');

let activeLabs = new Array();

function printResult() {
    let toWrite = "export var activeLabs = " + JSON.stringify(activeLabs) + ";";
    
    fs.writeFile("./src/lab.js", toWrite, function(){});
}

function processDeadline(line, file) {
    console.log(line);

    let res = line.split(/[\'\"]+/);
    let isValid = false;

    let lab = {
        name:'',
        url:'',
        deadline:'',
        baseurl:'',
        timestamp:0
    }

    let resLen = res.length;
    for (let i = 0; i < resLen; i++) {
        if (res[i].includes('deadline')) {
            let deadlineTemp = moment.tz(res[i+1], "Asia/Yakutsk");
            let now = moment.tz("Asia/Yakutsk");

            if (deadlineTemp.isSameOrAfter(now)) {
                lab.deadline = res[i+1];
                lab.timestamp = deadlineTemp.valueOf();
                if (!isValid) i = 0;
                isValid = true;          
            }
        }

        if (res[i].includes('link')) {
            if (isValid) {
                lab.url = res[i+1];
            }
        }

        if (res[i].includes('title')) {
            if (isValid) {
                lab.name = res[i+1];
            } 
        }
    }

    if (isValid) {
        file = file.replace('.md', '');
        lab.baseurl = '/' + file;

        console.log(lab);
        activeLabs.push(lab);
        activeLabs.sort((c1, c2) => (c1.timestamp < c2.timestamp) ? -1 : (c1.timestamp > c2.timestams) ? 1 : 0);
    }

    printResult();
}

function readFiles(dirname) {
    fs.readdir(dirname, function(err, filenames) {
    if (err) {
      return;
    }

    filenames.forEach(function(filename) {
        console.log("Checking file: " + dirname + filename);
        lineReader.eachLine(dirname + filename, function(line) {
        if (line.includes('<DeadlineDisplay')) {
            console.log("Found deadline in file " + dirname + filename);
            processDeadline(line, dirname + filename);
        }});
    });
  });
}

readFiles("docs/");
