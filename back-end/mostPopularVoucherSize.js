const fs = require("fs"); //File system

let unused = [];
let packageSize = [];

function totalStamps(obj) {
  let inner_obj = {};

  for (prop in obj) {
    if (typeof obj[prop] == "object") {
      totalStamps(obj[prop]);
    } else {
      if (prop == "Amount") {
        inner_obj[prop] = obj[prop];
        packageSize.push(Object.values(inner_obj));
      }
    }
  }
}

function totalUnredeemedStamps(obj) {
  let inner_obj = {};

  for (prop in obj) {
    if (typeof obj[prop] == "object") {
      totalUnredeemedStamps(obj[prop]);
    } else {
      if (prop == "Unredeemed Vouchers") {
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
    let findRawRedemptionsJson = fs.readFileSync(
      "./backendData/rawredemptions.json"
    );
    let rawredemptionsJson = JSON.parse(findRawRedemptionsJson);

    let findVouchersJson = fs.readFileSync("./backendData/vouchers.json");
    let vouchersJson = JSON.parse(findVouchersJson);

    var allSeries = Object.keys(totalsJson);
    var allLocations = Object.keys(rawredemptionsJson);
    var allStamps = Object.entries(totalsJson);
    var allVouchers = Object.entries(vouchersJson);
    var unredeemed = [];
    var locations = []; // all locations of company
    var stampy = []; //all stamps
    var packageTypes = [];

    var tally=0
    let tallyCount=[]
    var duplicate=true;

    allLocations.forEach((value) => {
      if (value.includes("-")) {
        locations.push(value);
      }
    });
    allVouchers.filter((item) => {
      totalStamps(item);
    });
    allStamps.filter((item) => {
      totalUnredeemedStamps(item);
    });
    packageSize = packageSize.flat()
    for (var i=0; i < packageSize.length; i++) {
      if(packageTypes.includes(packageSize[i])){
        
      }
      else{
        packageTypes.push(packageSize[i])
        console.log("passing through")
        for (var j=0; j < packageSize.length; j++) {
          if (packageSize[i] === packageSize[j] ) {
            tally = tally + 1
          }
        }
        tallyCount.push(tally)
        tally=0
      }
        
    }
    packageSize = [];
    unredeemed[0] = Object.values(unused[0]);

    res.send({
      label1: "Package Size: " + packageTypes[0],
      label2: "Package Size: " + packageTypes[1],
      label3: "Package Size: " + packageTypes[2],
      //label4: "Unredeemed",

      value1: tallyCount[0],
      value2: tallyCount[1],
      value3: tallyCount[2],
      //value4: unredeemed,
      "package":packageSize,
      packageTypes,
      tallyCount,
      "length":packageSize.length
    });
  }
}

module.exports = mostPopularVoucherSize;
