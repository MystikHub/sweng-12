const express = require('express')
const app = express()

const multipleStore = require("./multiStore");
const stampTotalTrend = require("./stampTotalTrend");
const totalRedeemedTotalUnredeemed = require("./totalRedeemedTotalUnredeemed");
const actualTotalsPie = require("./actualTotalsPie");
const selector = require("./selector");
const retention = require("./retention");
const vouncherCount = require('./voucherCount');
const customerGrowth = require("./customerGrowth");
const mostPopularVoucherSize = require("./mostPopularVoucherSize");

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

app.get('/retention_rate', (req, res) => {
  enableLocalCors(res)
  retention(req, res)
})

app.get('/voucher_purchase_counts', (req, res) => {
  enableLocalCors(res)
  vouncherCount(req, res)
})
app.get('/most_popular_scheme', (req, res) => {
  enableLocalCors(res)
  mostPopularVoucherSize(req, res)
})

app.get('/customer_growth', (req, res) => {
  enableLocalCors(res)
  customerGrowth(req, res)
})

// Visit http://localhost:3000/loyalty_rating_age_group in your browser to test this
app.get('/loyalty_rating_age_group', (req, res) => {
    enableLocalCors(res)

    res.send({
        "average_days_between_stamps":[19,12, 15, 21, 24, 27, 33],
        "age_groups":  ["Under 19","19 to 24","24 to 30","30 to 40","40 to 50","50 to 60","Over 60"]
    })
})

// Visit http://localhost:3000/loyalty_rating_gender in your browser to test this
app.get('/loyalty_rating_gender', (req, res) => {
    enableLocalCors(res)

    res.send({
        "average_days_between_stamps":[3.2,1.9],
        "gender":  ["Male","Female"]
    })
})

app.get('/most_popular_scheme', (req, res) => {
  enableLocalCors(res)
  mostPopularVoucherSize(req, res)
})

app.listen(port, () => {
  console.log(`Back end api reference listening at http://localhost:${port}`)
  console.log(`Restart node.js after making changes`)
})