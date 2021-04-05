const express = require('express')
const app = express()
const port = 3000

function enableLocalCors(res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
}

app.get('/', (req, res) => {
    enableLocalCors(res)
    res.send('Hello World!')
})

// Visit http://localhost:3000/multi_store_customers?store=001 in your browser to test this
app.get('/multi_store_customers', (req, res) => {
    enableLocalCors(res)

    if(req.query.store === undefined)
        res.sendStatus(400)
    else if(req.query.store === "001")
        res.send({
            "multi_store_customers": 10,    // Customers that visited this store, as well as another store
            "single_store_customers":  20,   // Customers that only visited this store
        })
    else
        res.sendStatus(400)
}),

// Visit http://localhost:3000/stamp_total_Trend?scheme=002 in your browser to test this
app.get('/stamp_total_trend', (req, res) => {
    enableLocalCors(res)

    if(req.query.scheme === undefined)
        res.sendStatus(400)
    else if(req.query.scheme === "002")
        res.send({
            "label1":'PAV-001',
            "label2":'PAV-002',
            "seriesname1":'PAV',
            "value1":16616,
            "value2":2670,
            "seriesname2":'PAVSW',
            "value6":0,
            "value7":195,

        })
    else
        res.sendStatus(400)
})

// Visit http://localhost:3000/retention_rate in your browser to test this
app.get('/retention_rate', (req, res) => {
    enableLocalCors(res)

    res.send({
        "loyal_customers": 55,      // Customers that have been a customer 60-30 days ago
                                    //   and have redeemed a stamp in the past 30 days
        "not_loyal_customers":  34  // Other customers
    })
})

// Visit http://localhost:3000/customer_growth in your browser to test this
app.get('/customer_growth', (req, res) => {
    enableLocalCors(res)

    res.send({
        "customer_growth_over_time": [10, 20, 30, 45, 60, 70, 100],
        "timescale_of_the_dates":  ["2020-10", "2020-11", "2020-12", "2021-01", "2021-02", "2021-03", "2021-04"]
    })
})

// Visit http://localhost:3000/voucher_purchase_counts in your browser to test this
app.get('/voucher_purchase_counts', (req, res) => {
    enableLocalCors(res)

    res.send({
            "vouchers": 1155,
            "voucher_packages": 231
        })
})

app.listen(port, () => {
    console.log(`Back end api reference listening at http://localhost:${port}`)
    console.log(`Restart node.js after making changes`)
})