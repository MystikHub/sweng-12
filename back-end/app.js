const express = require('express')
const app = express()
const selector = require("./selector");
const multipleStore = require("./multiStore");
const retention = require("./retention");
const vouncherCount = require('./voucherCount');

const port = 3000;

function enableLocalCors(res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
}

app.get('/', (req, res) => {
  enableLocalCors(res)
  res.send('Hello World!')
})

app.get('/all_stores', (req, res) => {
  enableLocalCors(res)
  selector(req,res)
})

app.get('/multi_store_customers', (req, res) => {
  enableLocalCors(res)
  multipleStore(req, res)
})

app.get('/retention_rate', (req, res) => {
  enableLocalCors(res)
  retention(req, res)
})

app.get('/voucher_purchase_counts', (req, res) => {
  enableLocalCors(res)
  vouncherCount(req, res)
})

app.listen(port, () => {
  console.log(`Back end api reference listening at http://localhost:${port}`)
  console.log(`Restart node.js after making changes`)
})