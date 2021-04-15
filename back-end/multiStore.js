var url = require('url'); //Split up the web address
const fs = require("fs"); //File system

async function multiStore (req, res) { 
    var query = url.parse(req.url, true).query;
    var store = query.store;
    console.log("Store=" + store);
    
    fs.readFile("./backendData/rawpurchases.json", function(err, data) {
        data=JSON.parse(data)
        var multi,single
        let numData = {multi,single}
        if (store) {
           numData = f(data,store);
        } 
        if(store == "all") {
            let allShops=Object.keys(data)
            allShops=allShops.map(value => value.split("-")[1])
            allShops=new Set(allShops);
            
            for (let shop of allShops) {
                let num = f(data,shop);
                numData.multi =  [...new Set([...numData.multi, ...num.multi])];
                numData.single = [...new Set([...numData.single, ...num.single])];
            }
        }
        res.send({"multi_store_customers" :numData.multi.length,"single_store_customers" :numData.single.length})
    })
    function f(data,search) {
        let allShops=Object.keys(data)
        let shops=[]
        allShops.forEach(value => {
            if (value.includes(search)) {
                shops.push(value);
            }
        });
        //console.log(shops);
        //Complement
       let char = allShops.filter((val)=>!new Set(shops).has(val));

        let arr1=[] // for the asked store
        shops.forEach(value => {
            arr1.push(...Object.keys(data[value]))
        })
        let set1=new Set(arr1)
        //console.log(set1)

        let arr2=[] // rest stores
        char.forEach(value => {
            arr2.push(...Object.keys(data[value]))
        })
        let set2=new Set(arr2)
        //console.log(set2)

        var multi = [...set1].filter((val)=>set2.has(val)); 
        //console.log("multi: " + multi)
        var single = [...set1].filter((val)=>!set2.has(val));
        return{multi,single}
    }
}

module.exports = multiStore