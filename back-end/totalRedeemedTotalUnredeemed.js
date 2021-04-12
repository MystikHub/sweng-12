const fs = require("fs"); //File system

let stampss=[];
let unused=[];

async function totalRedeemedTotalUnredeemed(req, res) {
    if(req.query.store === undefined){
        res.sendStatus(400)
    }
    else if(req.query.store === "002"){
        let findTotalsJson = fs.readFileSync('./backendData/totals.json');
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
}

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

module.exports = totalRedeemedTotalUnredeemed