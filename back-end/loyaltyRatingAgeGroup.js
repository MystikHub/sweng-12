const fs = require("fs"); //File system
const moment = require("moment")

async function loyaltyRatingAgeGroup(req, res) {

    moment.locale();

    fs.readFile("./backendData/newStructure.json", function (err, data) {
        const obj = JSON.parse(data)
        let average_time_between_stamps = []
        let average_days_between_stamps = []

        let under19 = []
        let nineteenTo24 = []
        let twentyFourTo30 = []
        let thirtyTo40 = []
        let fourtyTo50 = []
        let fiftyTo60 = []
        let over60 = []

        for (let customers in obj) {
            let timeDifference = []
            const timeStamps = Object.keys(obj[customers]["All Purchases"])
            const customerDOB = Object.values(obj[customers]["DOB"])
            let string = customerDOB.join("")
            let customerAge = moment().diff(moment(string, 'YYYY/DD/MM'), 'years')

            for (let i = 0; i < timeStamps.length - 1; i++) {
                timeDifference.push(timeStamps[i + 1] - timeStamps[i])
            }
            if (timeStamps.length - 1 == 0) { 
                timeDifference.push(0)
            }

            let total = 0
            for(let i = 0; i < timeDifference.length; i++) {
                total += timeDifference[i];
            }
            let averageTime = total / timeDifference.length;

            if (customerAge == undefined) {
                break
            }
            else if (customerAge < 19) {
                under19.push(averageTime)
            }
            else if (customerAge > 19 && customerAge < 24) {
                nineteenTo24.push(averageTime)
            }
            else if (customerAge > 24 && customerAge < 30) {
                twentyFourTo30.push(averageTime)
            }
            else if (customerAge > 30 && customerAge < 40) {
                thirtyTo40.push(averageTime)
            }
            else if (customerAge > 40 && customerAge < 50) {
                fourtyTo50.push(averageTime)
            }
            else if (customerAge > 50 && customerAge < 60) {
                fiftyTo60.push(averageTime)
            }
            else {
                over60.push(averageTime)
            }
        }

        let total = 0
        for(let i = 0; i < under19.length; i++) {
            total += under19[i];
        }
        average_time_between_stamps.push(total/under19.length)

        total = 0
        for(let i = 0; i < nineteenTo24.length; i++) {
            total += nineteenTo24[i];
        }
        average_time_between_stamps.push(total/nineteenTo24.length)

        total = 0
        for(let i = 0; i < twentyFourTo30.length; i++) {
            total += twentyFourTo30[i];
        }
        average_time_between_stamps.push(total/twentyFourTo30.length)

        total = 0
        for(let i = 0; i < thirtyTo40.length; i++) {
            total += thirtyTo40[i];
        }
        average_time_between_stamps.push(total/thirtyTo40.length)

        total = 0
        for(let i = 0; i < fourtyTo50.length; i++) {
            total += fourtyTo50[i];
        }
        average_time_between_stamps.push(total/fourtyTo50.length)

        total = 0
        for(let i = 0; i < fiftyTo60.length; i++) {
            total += fiftyTo60[i];
        }
        average_time_between_stamps.push(total/fiftyTo60.length)

        total = 0
        for(let i = 0; i < over60.length; i++) {
            total += over60[i];
        }
        average_time_between_stamps.push(total/over60.length)

        average_time_between_stamps.forEach(time => {
            let duration = moment.duration(time, 'milliseconds')
            average_days_between_stamps.push(duration.days())
        })

        res.send({
            "average_days_between_stamps": average_days_between_stamps,
            "age_groups":  ["Under 19","19 to 24","24 to 30","30 to 40","40 to 50","50 to 60","Over 60"]
        })
    })
}

module.exports = loyaltyRatingAgeGroup