const fs = require("fs"); //File system

async function vouncherCount (req, res) {
    
    let vouchers = 0
    fs.readFile("./backendData/vouchers.json", function(err, data){ 
        data=JSON.parse(data)
        const obj = data
        let packages = []       
        var allCustomers=Object.keys(data)
        allCustomers.forEach(value => {
            packages.push(...Object.keys(data[value]))
        })
        //console.log(packages)      
        Object.keys(obj).forEach(customers => {
            Object.keys(obj[customers]).forEach(purchases => {
               vouchers += obj[customers][purchases]["Amount"]
            })
        })
    
        res.send({
            "vouchers": vouchers,
            "voucher_packages": packages.length        
        })
    })
}

module.exports = vouncherCount