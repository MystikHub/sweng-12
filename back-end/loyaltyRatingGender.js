const fs = require("fs"); //File system
const moment = require("moment")

async function loyaltyRatingGender(req, res) {

    moment.locale();

    fs.readFile("./backendData/newStructure.json", function (err, data) {
        const obj = JSON.parse(data)
        let average_time_between_stamps = []
        let average_days_between_stamps = []

        let male = []
        let female = []
        let otherGender = []

        for (let customers in obj) {
            let timeDifference = []
            const timeStamps = Object.keys(obj[customers]["All Purchases"])
            let customerGenderSplit
            let customerGender
            if (obj[customers]["Gender"]) {
                customerGenderSplit = Object.values(obj[customers]["Gender"])
                let string = customerGenderSplit.join("")
                customerGender = string
            }
            else {
                customerGender = null
            }
            console.log(customerGender)

            for (let i = 0; i < timeStamps.length - 1; i++) {
                timeDifference.push(timeStamps[i + 1] - timeStamps[i])
            }
            if (timeStamps.length - 1 == 0) {
                timeDifference.push(0)
            }

            let total = 0
            for (let i = 0; i < timeDifference.length; i++) {
                total += timeDifference[i];
            }
            let averageTime = total / timeDifference.length;

            if (customerGender == "female") {
                female.push(averageTime)
            }
            else if (customerGender == "male") {
                male.push(averageTime)
            }
            else {
                otherGender.push(averageTime)
            }
        }

        let total = 0
        for (let i = 0; i < female.length; i++) {
            total += female[i];
        }
        average_time_between_stamps.push(total / female.length)

        total = 0
        for (let i = 0; i < male.length; i++) {
            total += male[i];
        }
        average_time_between_stamps.push(total / male.length)

        total = 0
        for (let i = 0; i < otherGender.length; i++) {
            total += otherGender[i];
        }
        average_time_between_stamps.push(total / otherGender.length)

        average_time_between_stamps.forEach(time => {
            let duration = moment.duration(time, 'milliseconds')
            average_days_between_stamps.push(duration.days())
        })

        res.send({
            "average_days_between_stamps": average_days_between_stamps,
            "gender": ["Male", "Female", "Other"]
        })
    })
}

module.exports = loyaltyRatingGender