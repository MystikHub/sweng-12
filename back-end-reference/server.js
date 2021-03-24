const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
//var url = require('url'); //Split up the web address
const fs = require("fs"); //File system

app.get('/', (req, res) => {
    let findJson = fs.readFileSync('./totals.json');
    let wholeJson = JSON.parse(findJson);
    var allObjects = Object.keys(wholeJson)
    var obj=[] // all asked stores
    allObjects.forEach(value => {
            if (value.includes("PAV")) {
                obj.push(value);
            }
        })
    res.send(obj)
});

/*
let findJson = fs.readFileSync('./totals.json');
    let wholeJson = JSON.parse(findJson);
    let finger = res.json(wholeJson[PAV])
    res.send(finger)
    */


// listen on the port
app.listen(port, () => {
    console.log(`Back end api reference listening at http://localhost:${port}`)
    console.log(`Restart node.js after making changes`)
})

