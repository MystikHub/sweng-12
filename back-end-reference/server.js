const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
//var url = require('url'); //Split up the web address
const fs = require("fs"); //File system
let stampss=[];
let unused=[];
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
                iterationObject(item)
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

function iterationObject(obj){
    let inner_obj = {};    

    for(prop in obj){
        if(typeof(obj[prop])=="object"){
            iterationObject(obj[prop]);
        }
        else{
            if(prop=="Stamps"){
                inner_obj[prop] = obj[prop];
                stampss.push(inner_obj);
            }
        }
    }
}


// Visit http://localhost:3000/percent_have_redeemed?scheme=002 in your browser to test this
app.get('/total_redeemed_total_unredeemed', (req, res) => {
    enableLocalCors(res)
    if(req.query.scheme === undefined){
        res.sendStatus(400)
    }
    else if(req.query.scheme === "002"){
        let findTotalsJson = fs.readFileSync('./totals.json');
        let totalsJson = JSON.parse(findTotalsJson);

        var allSeries = Object.keys(totalsJson)
        var allStamps = Object.entries(totalsJson)
        var allUnRed = Object.entries(totalsJson)
        var unredeemed=[]
        var stampy=[]
        var series=[] // all series for graph

        allSeries.forEach(value => {
                if (value != "Overall") {
                    series.push(value);
                }
            })
            allStamps.filter(item=>{
                iterationObject(item)
        })
        for(let i=0;i<stampss.length;i++){
            stampy[i] = Object.values(stampss[i]); //last one in the array will be the total number between every store and every scheme
        }
            
        allUnRed.filter(item=>{
            iterateObject(item)
        })
       
        unredeemed[0] = Object.values(unused[0])
            res.send({
                "label1": "Total number of stamps",
                "label2": "Total number of unredeemed stamps",
                "value1": stampy[3],
                "value2": unredeemed
            })
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
            if(prop=="Unredeemed Vouchers"){
                inner_obj[prop] = obj[prop];
                unused.push(inner_obj);
            }
        }
    }
}

// Visit http://localhost:3000/actual_totals_pie?scheme=002 in your browser to test this
app.get('/actual_totals_pie', (req, res) => {
    enableLocalCors(res)
    if(req.query.scheme === undefined){
        res.sendStatus(400)
    }
    else if(req.query.scheme === "002"){
        let findRawPurchasesJson = fs.readFileSync('./rawpurchases.json');
        let rawpurchasesJson = JSON.parse(findRawPurchasesJson);
        var test =[]
        var loc1 =[]
        var loc2 =[]
        var sw =[]
        test = Object.keys(rawpurchasesJson)
        test.forEach(value => {
                if(value === test[0]){
                    test = Object.keys(rawpurchasesJson.test[0])
                    res.send({
                        test
                    })
                }
        })
        
    }
    else{
        res.sendStatus(400)
    }
   
});

// listen on the port
app.listen(port, () => {
    console.log(`Back end api reference listening at http://localhost:${port}`)
    console.log(`Restart node.js after making changes`)
})

