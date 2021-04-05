var url = require("url"); //Split up the web address
const fs = require("fs"); //File system
var oneTotal = {};
var oneRedeemed = {};
var twoTotal = {};
var twoRedeemed = {};
var threeTotal = {};
var threeRedeemed = {};
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
  let findRawRedemptionsJson = fs.readFileSync(
    "./backendData/rawredemptions.json"
  );
  let rawredemptionsJson = JSON.parse(findRawRedemptionsJson);
  test = Object.keys(rawpurchasesJson);

  countKeysPerLevel(oneTotal, 0, rawpurchasesJson, 0);
  countKeysPerLevel(oneRedeemed, 0, rawredemptionsJson, 0);

  countKeysPerLevel(twoTotal, 0, rawpurchasesJson, 1);
  countKeysPerLevel(twoRedeemed, 0, rawredemptionsJson, 1);

  countKeysPerLevel(threeTotal, 0, rawpurchasesJson, 2);
  countKeysPerLevel(threeRedeemed, 0, rawredemptionsJson, 2);

  var one = (oneTotal[1] / oneRedeemed[1]) * 100;
  var two = (twoTotal[1] / twoRedeemed[1]) * 100;
  var three = (threeTotal[1] / threeRedeemed[1]) * 100;
  if (req.query.scheme === undefined) {
    res.sendStatus(400);
  } else if (req.query.scheme === "002") {
    res.send({
      label1: "Total users",
      value1: oneTotal[1],
      label2: "Users have redeemed",
      value2: oneRedeemed[1],
    });
  } else if (req.query.scheme === "001") {
    res.send({
      label1: "Total users",
      value1: twoTotal[1],
      label2: "Users have redeemed",
      value2: twoRedeemed[1],
    });
  } else if (req.query.scheme === "SW-002") {
    res.send({
      label1: "Total users",
      value1: threeTotal[1],
      label2: "Users have redeemed",
      value2: threeRedeemed[1],
    });
  }
}

module.exports = actualTotalsPie;
