const fs = require("fs"); //File system

let stampss=[];
let unused=[];

async function mostPopularVoucherSize (req, res) {
    if(req.query.scheme === undefined){
        res.sendStatus(400)
    }
    else if(req.query.scheme === "002"){
        
            res.send({
                "label1": "PAV-001",
                "label2": "PAV-002",
                "label3": "PAVSW-001",
                "label4": "Unredeemed",

                "value1": 100,
                "value2": 125,
                "value3": 245,
                "value4": 140
            })
    }
    else{
        res.sendStatus(400)
    }
}

module.exports = mostPopularVoucherSize
