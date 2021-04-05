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

  if (req.query.scheme === undefined) {
    res.sendStatus(400);
  } else {
    for (var i = 0; i < test.length; i++) {
      if (req.query.scheme === uniq[i]) {
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
      }
    }
  }
}
module.exports = actualTotalsPie;
