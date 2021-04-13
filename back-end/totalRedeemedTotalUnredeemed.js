const fs = require("fs"); //File system

let unredeemed = [];
let unused = [];
var oneTotal = {};
var oneRedeemed = {};
var twoTotal = {};
var twoRedeemed = {};
var threeTotal = {};
var threeRedeemed = {};
function iterationObject(obj){
    let inner_obj = {};    

    for(prop in obj){
        if(typeof(obj[prop])=="object"){
            iterationObject(obj[prop]);
        }
        else{
            if(prop=="Unredeemed Vouchers"){
                inner_obj[prop] = obj[prop];
                unredeemed.push(inner_obj);
            }
        }
    }
}
function countKeysPerLevel(storage, level, obj, store) {
  var keys = Object.keys(obj);
  var count = keys.length;

  storage[level] = (storage[level] || 0) + count;

  for (var i = 0; i < count; i++) {
    var childObj = obj[keys[store]];
    if (typeof childObj === "object") {
      countKeysPerLevel(storage, level + 1, childObj,store);
    }
  }
}

async function totalRedeemedTotalUnredeemed(req, res) {
  let findRawPurchasesJson = fs.readFileSync("./backendData/rawpurchases.json");
  let rawpurchasesJson = JSON.parse(findRawPurchasesJson);
  let findRawRedemptionsJson = fs.readFileSync("./backendData/rawredemptions.json");
  let rawredemptionsJson = JSON.parse(findRawRedemptionsJson);
  let findtotalsJson = fs.readFileSync("./backendData/totals.json");
  let totalsJson = JSON.parse(findtotalsJson);
  var allStamps = Object.entries(totalsJson)
  
  var oneTotal = {};
  var oneRedeemed = {};
  var twoTotal = {};
  var twoRedeemed = {};
  var threeTotal = {};
  var threeRedeemed = {};
  countKeysPerLevel(oneTotal, 0, rawpurchasesJson, 0);
  countKeysPerLevel(oneRedeemed, 0, rawredemptionsJson, 0);

  countKeysPerLevel(twoTotal, 0, rawpurchasesJson, 1);
  countKeysPerLevel(twoRedeemed, 0, rawredemptionsJson, 1);

  countKeysPerLevel(threeTotal, 0, rawpurchasesJson, 2);
  countKeysPerLevel(threeRedeemed, 0, rawredemptionsJson, 2);

  var one = (oneTotal[1] / oneRedeemed[1]) * 100;
  var two = (twoTotal[1] / twoRedeemed[1]) * 100;
  var three = (threeTotal[1] / threeRedeemed[1]) * 100;
  var sum = oneRedeemed[2] + twoRedeemed[2] + threeRedeemed[2]
  var unred=[]
  allStamps.forEach(items=>{
    iterationObject(items)
  })
  unred[0]=Object.values(unredeemed[0])
  if (req.query.scheme === undefined) {
    res.sendStatus(400);
  } else{
    res.send({
      label1: "Total Vouchers",
      value1: sum,
      label2: "Total Unredeemed Vouchers",
      value2: unred[0],
    });
  }
}

module.exports = totalRedeemedTotalUnredeemed;