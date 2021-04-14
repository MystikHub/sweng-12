const fs = require("fs"); //File system
const moment = require("moment");
var url = require('url');//Split up the web address

async function retention (req, res) {
    var query = url.parse(req.url, true).query;
    var store = query.store;

    let sixty_days_ago = moment().subtract(60,'day');
    let thirty_days_ago = moment().subtract(30,'day');

    fs.readFile("./backendData/rawpurchases.json", function (err, data) {
        data=JSON.parse(data)
        let numData; 
        if(store){      
        let allShops=Object.keys(data)
        let shops=[]
        allShops.forEach(value => {
            if (value.includes(store)) {
                shops.push(value);
            }
            numData = search(data,shops);
        });
        } 
        if(store == "all") {
            let allShops=Object.keys(data)
            numData = search(data,allShops);
        }
        res.send(numData)  
    })
    function search(data,shops) {
        let arr1=[]
        shops.forEach(value => {
            arr1.push(...Object.keys(data[value]))
        })
        let peopleSet=new Set(arr1)
        //console.log(peopleSet)

        let obj={}
        shops.forEach(shop => {
            peopleSet.forEach(people => {
                if (data[shop][people]) {
                    obj[people]={...obj[people],...data[shop][people]}
                }
            })
        })
        //console.log(obj)

        let loyal_customers=0
        let not_loyal_customers=0
        for (const customers in obj) {
            //console.log(obj[o])
            let thirty_to_sixty=[]//for 30~60 days stamps
            let now_to_thirty=[]//for now~30 days stamps
            let timeStamps = Object.keys(obj[customers]);
            timeStamps.forEach(stamp=>{
                
                const diff1 = moment(parseInt(stamp)).diff(moment(sixty_days_ago), 'days')
                const diff2 = moment(parseInt(stamp)).diff(moment(thirty_days_ago), 'days')
                //console.log(diff2)
                if (diff1 >= 0 && diff1 <= 30) {
                    thirty_to_sixty.push(stamp)
                }
                if (diff2 >= 0) {
                    now_to_thirty.push(stamp)
                }
            })
            if (thirty_to_sixty.length * now_to_thirty.length) {
                loyal_customers++;
            } else {
                not_loyal_customers++
            }
        }
        return {"loyal_customers" :loyal_customers,"not_loyal_customers" :not_loyal_customers}
    }
}
module.exports = retention