var url = require('url'); //Split up the web address
const fs = require("fs"); //File system

async function multiStore (req, res) {
    var query = url.parse(req.url, true).query;
    var store = query.store;
    console.log("Store=" + store);
    
    fs.readFile("./backendData/rawpurchases.json", function(err, data) { 
        data=JSON.parse(data)
        var allShops=Object.keys(data)
        //console.log(allShops);
        var shops=[] // all asked stores
        allShops.forEach(value => {
            if (value.includes(store)) {
                shops.push(value);
            }
        })

        //Complement
        var char = allShops.filter((val)=>!new Set(shops).has(val));
        //console.log("Stores: " + char)
        var arr1=[] // for the asked store
        shops.forEach(value => {
            arr1.push(...Object.keys(data[value]))
        })
        var set1=new Set(arr1)
        //console.log(set1)

        var arr2=[] // rest stores
        char.forEach(value => {
            arr2.push(...Object.keys(data[value]))
        })
        var set2=new Set(arr2)
        //console.log(set2)

        var multi = [...set1].filter((val)=>set2.has(val)); 
        //console.log("multi: " + multi)
        var single = [...set1].filter((val)=>!set2.has(val));

        res.send({
            "multi_store_customers": multi.length,
            "single_store_customers": single.length   
        })
    })
}

module.exports = multiStore