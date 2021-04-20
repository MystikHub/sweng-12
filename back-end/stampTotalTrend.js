var url = require("url"); //Split up the web address
const fs = require("fs"); //File system
const { text } = require("express");

let stampss=[]

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

async function stampTotalTrend(req, res) {
    let findRawPurchasesJson = fs.readFileSync("./backendData/rawpurchases.json");
    let rawpurchasesJson = JSON.parse(findRawPurchasesJson);
    test = Object.keys(rawpurchasesJson);
    let numberPart = test.map((item) => item.split("-")[1]);
    let uniq = [...new Set(numberPart)];


    let findTotalsJson = fs.readFileSync('./backendData/totals.json');
    let totalsJson = JSON.parse(findTotalsJson);
    let findRawRedemptionsJson = fs.readFileSync('./backendData/rawredemptions.json');
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

    numberPart = test.map((item) => item.split("-")[1]);
    uniq = [...new Set(numberPart)];

    if(req.query.store === undefined){
        res.sendStatus(400)
    }
    else if (req.query.store === "001"){
        res.send(({
            "seriesname1": series[0],
            "seriesname2": series[1],
            "label1": locations[0],
            "label2": locations[1],
            "value1" : stampy[0],
            "value3" : 0,
        }))

    }
    else if(req.query.store === "002"){
        res.send(({
            "seriesname1": series[0],
            "seriesname2": series[1],
            "label1": locations[0],
            "label2": locations[1],
            "value2" : stampy[1],
            "value4" : stampy[2]
        }))
       
    } else{
        if (req.query.store === "all") {
    
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
    }   
}

module.exports = stampTotalTrend