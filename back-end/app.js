const express = require('express')
const app = express()

const multipleStore = require("./multiStore");
const stampTotalTrend = require("./stampTotalTrend");
const totalRedeemedTotalUnredeemed = require("./totalRedeemedTotalUnredeemed");
const actualTotalsPie = require("./actualTotalsPie");
const mostPopularVoucherSize = require("./mostPopularVoucherSize");

const port = 3000;

function enableLocalCors(res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
}

app.get('/', (req, res) => {
  enableLocalCors(res)
  res.send('Hello World!')
})

app.get('/multi_store_customers', (req, res) => {
  enableLocalCors(res)
  multipleStore(req, res)
})

app.get('/stamp_total_trend', (req, res) => {
  enableLocalCors(res)
  stampTotalTrend(req, res)
})

app.get('/total_redeemed_total_unredeemed', (req, res) => {
  enableLocalCors(res)
  totalRedeemedTotalUnredeemed(req, res)
})

app.get('/actual_totals_pie', (req, res) => {
  enableLocalCors(res)
  actualTotalsPie(req, res)
})

app.get('/most_popular_scheme', (req, res) => {
  enableLocalCors(res)
  mostPopularVoucherSize(req, res)
})

app.listen(port, () => {
  console.log(`Back end api reference listening at http://localhost:${port}`)
  console.log(`Restart node.js after making changes`)
})