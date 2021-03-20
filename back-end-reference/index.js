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
            "single_store_customers":  20   // Customers that only visited this store
        })
    else
        res.sendStatus(400)
})

app.listen(port, () => {
    console.log(`Back end api reference listening at http://localhost:${port}`)
    console.log(`Restart node.js after making changes`)
})