const fs = require("fs"); //File system

async function selector (req, res) {

    fs.readFile("./backendData/rawpurchases.json", function(err, data) {
        data=JSON.parse(data)
        var allShops=Object.keys(data)
        var shops=[]// all asked stores
        allShops.forEach(value => {
            shops.push(value);
        })
        //console.log(shops);
        let numberPart = shops.map(item => item.split("-")[1])
        let uniq = [...new Set(numberPart)]
        res.send(uniq)   
    })
}

module.exports = selector