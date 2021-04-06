const fs = require("fs"); //File system

let unused = [];
let stampss=[]

function totalStamps(obj){
    let inner_obj = {};    

    for(prop in obj){
        if(typeof(obj[prop])=="object"){
            totalStamps(obj[prop]);
        }
        else{
            if(prop=="Stamps"){
                inner_obj[prop] = obj[prop];
                stampss.push(inner_obj);
            }
        }
    }
}

function totalUnredeemedStamps(obj){
    let inner_obj = {};    

    for(prop in obj){
        if(typeof(obj[prop])=="object"){
            totalUnredeemedStamps(obj[prop]);
        }
        else{
            if(prop=="Unredeemed Vouchers"){
                inner_obj[prop] = obj[prop];
                unused.push(inner_obj);
            }
        }
    }
}

async function mostPopularVoucherSize(req, res) {
  if (req.query.scheme === undefined) {
    res.sendStatus(400);
  } else {
    let findTotalsJson = fs.readFileSync("./backendData/totals.json");
    let totalsJson = JSON.parse(findTotalsJson);
    let findRawRedemptionsJson = fs.readFileSync("./backendData/rawredemptions.json");
    let rawredemptionsJson = JSON.parse(findRawRedemptionsJson);

    var allSeries = Object.keys(totalsJson);
    var allLocations = Object.keys(rawredemptionsJson);
    var allStamps = Object.entries(totalsJson);
    var unredeemed=[]
    var locations = []; // all locations of company
    var stampy = []; //all stamps

    allLocations.forEach((value) => {
      if (value.includes("-")) {
        locations.push(value);
      }
    });
    allStamps.filter((item) => {
        totalStamps(item);
    });
    allStamps.filter(item=>{
        totalUnredeemedStamps(item)
    })
    for (let i = 0; i < stampss.length; i++) {
      stampy[i] = Object.values(stampss[i]); //last one in the array will be the total number between every store and every scheme
    }
    unredeemed[0] = Object.values(unused[0])

    res.send({
      label1: allLocations[0],
      label2: allLocations[1],
      label3: allLocations[2],
      label4: "Unredeemed",

      value1: stampy[0],
      value2: stampy[1],
      value3: stampy[2],
      value4: unredeemed,
    });
  }
}

module.exports = mostPopularVoucherSize;
