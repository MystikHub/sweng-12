const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
//var url = require('url'); //Split up the web address
const fs = require("fs"); //File system
let stampss=[];

function enableLocalCors(res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
}


/*this works to output both series names*/
// Visit http://localhost:3000/stamp_total_Trend?scheme=002 in your browser to test this
app.get('/stamp_total_Trend', (req, res) => {
    enableLocalCors(res)
    if(req.query.scheme === undefined){
        res.sendStatus(400)
    }
    else if(req.query.scheme === "002"){
        let findTotalsJson = fs.readFileSync('./totals.json');
        let totalsJson = JSON.parse(findTotalsJson);
        let findRawRedemptionsJson = fs.readFileSync('./rawredemptions.json');
        let rawredemptionsJson = JSON.parse(findRawRedemptionsJson);

        var allSeries = Object.keys(totalsJson)
        var allLocations = Object.keys(rawredemptionsJson)
        var allStamps = Object.entries(totalsJson)

        let totStamp

        var series=[] // all series for graph
        var locations=[] // all locations of company
        var stampy=[] //all stamps
        allSeries.forEach(value => {
                if (value != "Overall") {
                    series.push(value);
                }
            })
        allLocations.forEach(value => {
                if (value.includes("-") ){
                    locations.push(value);
                }
            })
        
        allStamps.filter(item=>{
                iterateObject(item)
        })

        
        stampy[0] = Object.values(stampss[0]);
        stampy[1] = Object.values(stampss[1]);
        stampy[2] = 0;
        stampy[3] = Object.values(stampss[2]);
        res.send(({
            "seriesname1": series[0],
            "seriesname2": series[1],
            "label1": locations[0],
            "label2": locations[1],
            "value1" : stampy[0],
            "value3" : stampy[2],
            "value2" : stampy[1],
            "value4" : stampy[3]
        }))
    }
    else{
        res.sendStatus(400)
    }   
});

function iterateObject(obj){
    let inner_obj = {};    

    for(prop in obj){
        if(typeof(obj[prop])=="object"){
            iterateObject(obj[prop]);
        }
        else{
            if(prop=="Stamps"){
                console.log(prop.toUpperCase()+':', obj[prop]);
                inner_obj[prop] = obj[prop];
                stampss.push(inner_obj);
            }
        }
    }
    
    
}
console.log(stampss);
/*this works to return total stamps in one'branch'*/
/*app.get('/', (req, res) => {
    let findJson = fs.readFileSync('./totals.json');
    let wholeJson = JSON.parse(findJson);
    let stamp
    var pav=[]
    pav = wholeJson.PAVSW.PAVSWTWO
    Object.keys(pav).forEach(key => {
        if(key === "Stamps"){
            stamp=(pav[key]);
            res.send({"stampy": stamp})
        }
      });
      
});*/

// Visit http://localhost:3000/number_of_seriesName in your browser to test this
/*app.get('/', (req, res) => {
    let findJson = fs.readFileSync('./totals.json');
    let wholeJson = JSON.parse(findJson);
    var keys=[]
    let numberOfSeries
    //keys = Object.keys(wholeJson)
    Object.keys(wholeJson).forEach(key => {
        if(key === "PAVONE"){
            keys.push(wholeJson[key]);
        }
      });
    res.send(keys)
      
});*/
// listen on the port
app.listen(port, () => {
    console.log(`Back end api reference listening at http://localhost:${port}`)
    console.log(`Restart node.js after making changes`)
})

