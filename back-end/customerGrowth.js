const fs = require("fs"); //File system

async function customerGrowth (req, res) {

    fs.readFile ("./backendData/totals.json", function(err, data) { 
        const obj = JSON.parse(data)
        var customer_growth_over_time = []
        var timescale_of_the_dates = []

        for (let locations in obj) {
            const timeStamps = Object.keys(obj[locations]["Month Unique Users"])
            
            timeStamps.forEach(date => {
                timescale_of_the_dates.push (date)
            })

            timeStamps.forEach(value => {
                customer_growth_over_time.push (value)
            })
        }
        res.send({
            "customer_growth_over_time": customer_growth_over_time,
            "timescale_of_the_dates": timescale_of_the_dates
        })
    })
}

module.exports = customerGrowth