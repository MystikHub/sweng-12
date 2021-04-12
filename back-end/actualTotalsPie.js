var url = require('url'); //Split up the web address
const fs = require("fs"); //File system

async function actualTotalsPie(req, res) {
    if(req.query.scheme === undefined){
        res.sendStatus(400)
    }
    else if(req.query.store === "002"){
        let findRawPurchasesJson = fs.readFileSync('./rawpurchases.json');
        let rawpurchasesJson = JSON.parse(findRawPurchasesJson);
        var test =[]
        var loc1 =[]
        var loc2 =[]
        var sw =[]
        test = Object.keys(rawpurchasesJson)
        test.forEach(value => {
                if(value === test[0]){
                    test = Object.keys(rawpurchasesJson.test[0])
                    res.send({
                        test
                    })
                }
        })
        
    }
    else{
        res.sendStatus(400)
    }
}

module.exports = actualTotalsPie