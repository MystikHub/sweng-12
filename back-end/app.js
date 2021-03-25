const express = require('express')
const app = express()
const multipleStore = require("./multiStore");

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

app.listen(port, () => {
  console.log(`Back end api reference listening at http://localhost:${port}`)
  console.log(`Restart node.js after making changes`)
})