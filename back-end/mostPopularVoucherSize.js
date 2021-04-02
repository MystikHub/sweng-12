const fs = require("fs"); //File system

let stampss=[];
let unused=[];

async function mostPopularVoucherSize (req, res) {
    if(req.query.scheme === undefined){
        res.sendStatus(400)
    }
    else if(req.query.scheme === "002"){
        
            res.send({
                "label1": "Total number of stamps",
                "label2": "Total number of unredeemed stamps",
                "label3": "Total number of stamps",
                "label4": "Total number of unredeemed stamps",
                "label5": "Total number of unredeemed stamps",

                "value1": stampy[3],
                "value2": unredeemed
            })
    }
    else{
        res.sendStatus(400)
    }
}

module.exports = mostPopularVoucherSize
