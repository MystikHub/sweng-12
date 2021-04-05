const fs = require("fs"); //File system
const moment = require("moment");

async function retention (req, res) {
    let sixty_days_ago = moment().subtract(60,'day');
    let thirty_days_ago = moment().subtract(30,'day');

    fs.readFile("./backendData/newStructure.json", function(err, data) {
        const obj = JSON.parse(data)  
        var loyal_customers=0
        var not_loyal_customers=0
       
        for(let customers in obj){
          const timeStamps = Object.keys(obj[customers]["All Purchases"])
          var thirty_to_sixty=[] //for 30~60 days stamps
          var now_to_thirty=[] //for now~30 days stamps
          
          timeStamps.forEach(stamp=>{
          const diff1 = moment(parseInt(stamp)).diff(moment(sixty_days_ago), 'days')
          const diff2 = moment(parseInt(stamp)).diff(moment(thirty_days_ago), 'days')
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
        res.send({
            "loyal_customers": loyal_customers,
            "not_loyal_customers": not_loyal_customers   
        })
    })         
}
module.exports = retention