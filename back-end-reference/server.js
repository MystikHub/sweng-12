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
// Visit http://localhost:3000/multi_store_customers?store=001 in your browser to test this
app.get('/multi_store_customers', (req, res) => {
    enableLocalCors(res)

    if(req.query.store === undefined)
        res.sendStatus(400)
    else if(req.query.store === "001")
        res.send({
            "multi_store_customers": 10,    // Customers that visited this store, as well as another store
            "single_store_customers":  20,   // Customers that only visited this store
        })
    else
        res.sendStatus(400)
}),

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

        for(let i=0;i<stampss.length;i++){
            stampy[i] = Object.values(stampss[i]); //last one in the array will be the total number between every store and every scheme
        }
        res.send(({
            "seriesname1": series[0],
            "seriesname2": series[1],
            "label1": locations[0],
            "label2": locations[1],
            "value1" : stampy[0],
            "value3" : 0,
            "value2" : stampy[1],
            "value4" : stampy[2]
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

// listen on the port
app.listen(port, () => {
    console.log(`Back end api reference listening at http://localhost:${port}`)
    console.log(`Restart node.js after making changes`)
})

