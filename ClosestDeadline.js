//Test
const lineReader = require('line-reader');
const fs = require('fs');
const moment = require('moment-timezone');

moment.locale('ru');
moment().format('lll');

console.log("Test");

let closestDeadlineDate = ''; // мегакостыль
let closestDeadlineTitle = '';
let closestDeadlineLink = '';

function printResult() {
    let toWrite = "export var activelab = { \"name\":\"" + closestDeadlineTitle + "\",\"deadline\":\"" + closestDeadlineDate + "\",\"url\":\"" + closestDeadlineLink + "\"};"; 
    
    fs.writeFile("./src/lab.js", toWrite, function(){});
}

function processDeadline(line) {
    console.log(line);

    let res = line.split('\'');
    let isCloser = false;

    let resLen = res.length;
    for (let i = 0; i < resLen; i++) {
        if (res[i].includes('deadline')) {
            console.log("Deadline: " + res[i+1]);

            let deadlineTemp = moment.tz(res[i+1], "Asia/Yakutsk");
            let closestDeadline = moment.tz(closestDeadlineDate, "Asia/Yakutsk");
            let now = moment.tz("Asia/Yakutsk");

            if (deadlineTemp.isSameOrAfter(now) && (!deadlineTemp.isSameOrAfter(closestDeadline) || closestDeadline.isSameOrBefore(now))) {
                closestDeadlineDate = res[i+1];
                if (!isCloser) i = 0;
                isCloser = true;
                console.log("New closest deadline: " + closestDeadlineDate);
            }
        }

        if (res[i].includes('link')) {
            console.log("Invite link: " + res[i+1]);
            if (isCloser) closestDeadlineLink = res[i+1];
        }

        if (res[i].includes('title')) {
            console.log("Lab title: " + res[i+1]);
            if (isCloser) closestDeadlineTitle = res[i+1];
        }
    }
    
    console.log();
    printResult();
}

function readFiles(dirname) {
    console.log(dirname);
    fs.readdir(dirname, function(err, filenames) {
    if (err) {
      return;
    }

    filenames.forEach(function(filename) {
        lineReader.eachLine(dirname + filename, function(line) {
        if (line.includes('<DeadlineDisplay')) {
            console.log("Found deadline in file " + dirname + filename);
            processDeadline(line);

            return false;
        }});
    });
  });
}

readFiles("docs/");
