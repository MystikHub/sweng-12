var url = require("url"); //Split up the web address
const fs = require("fs"); //File system
const { text } = require("express");

function countKeysPerLevel(storage, level, obj, store) {
  var keys = Object.keys(obj);
  var count = keys.length;

  storage[level] = (storage[level] || 0) + count;

  for (var i = 0; i < count; i++) {
    var childObj = obj[keys[store]];
    if (typeof childObj === "object") {
      countKeysPerLevel(storage, level + 1, childObj);
    }
  }
}

async function actualTotalsPie(req, res) {
  let findRawPurchasesJson = fs.readFileSync("./backendData/rawpurchases.json");
  let rawpurchasesJson = JSON.parse(findRawPurchasesJson);
  let findRawRedemptionsJson = fs.readFileSync("./backendData/rawredemptions.json");
  let rawredemptionsJson = JSON.parse(findRawRedemptionsJson);
  test = Object.keys(rawpurchasesJson);
  var testTotal = [];
  var testRedeemed = [];
  var sumTotal = [];
  var sumRedeemed = [];

  for (var i = 0; i < test.length; i++) {
    var testTotal = [];
    var testRedeemed = [];
    countKeysPerLevel(testTotal, 0, rawpurchasesJson, i);
    countKeysPerLevel(testRedeemed, 0, rawredemptionsJson, i);
    sumTotal.push(testTotal[1]);
    sumRedeemed.push(testRedeemed[1]);
  }

  let numberPart = test.map((item) => item.split("-")[1]);
  let uniq = [...new Set(numberPart)];
  var allTotals = 0;
  var allRedeemed = 0;
  for (var i = 0; i < sumTotal.length || i < sumRedeemed.length; i++) {
    allTotals = allTotals + sumTotal[i];
    allRedeemed = allRedeemed + sumRedeemed[i];
  }
  if (req.query.scheme === undefined) {
    res.sendStatus(400);
  }
  for (var i = 0; i < test.length; i++) {
    if (req.query.scheme === uniq[i] && req.query.scheme !== uniq[uniq.length]) {
      console.log(uniq[i]);
      thing = i;
      console.log(thing);
      res.send({
        label1: "Total users",
        value1: sumTotal[i],
        label2: "Users have redeemed",
        value2: sumRedeemed[i],
        sumTotal,
        sumRedeemed,
      });
    } else if(req.query.scheme === "all"){
      try {
        res.send({
          label1: "Total users",
          value1: allTotals,
          label2: "Users have redeemed",
          value2: allRedeemed,
          sumTotal,
          sumRedeemed,
        });
      } catch (error) {
        
      }
     
    }
  }
}
module.exports = actualTotalsPie;
