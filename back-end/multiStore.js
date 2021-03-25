async function multiStore (req, res) {
    if(req.query.store === undefined) {
        res.sendStatus(400)
    }
    else if(req.query.store === "001") {
        res.send({
            "multi_store_customers": 10,    // Customers that visited this store, as well as another store
            "single_store_customers":  20   // Customers that only visited this store
        });
    }
    else {
        res.sendStatus(400)
    }
}

module.exports = multiStore