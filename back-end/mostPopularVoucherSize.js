const fs = require("fs"); //File system

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

async function mostPopularVoucherSize(req, res) {
  if (req.query.scheme === undefined) {
    res.sendStatus(400);
  } else {
    let findVouchersJson = fs.readFileSync("./backendData/vouchers.json");
    let vouchersJson = JSON.parse(findVouchersJson);

    var allVouchers = Object.entries(vouchersJson)
    var tally=0
    let tallyCount=[]
    var packageTypes = []

    allVouchers.filter((item) => {
      totalStamps(item);
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

    res.send({
      label1: "Package Size: " + packageTypes[0],
      label2: "Package Size: " + packageTypes[1],
      label3: "Package Size: " + packageTypes[2],

      value1: tallyCount[0],
      value2: tallyCount[1],
      value3: tallyCount[2]
    });
  }
}

module.exports = mostPopularVoucherSize;
