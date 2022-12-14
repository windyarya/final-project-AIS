const client = require("./client");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    if (req.body.id) {
        client.get( { id: req.body.id }, (err, data) => {
            if (!err) {
                return res.status(200).send({
                    results: data
                })
            } else {
                console.log(err);
            }
        })
    } else {
        client.getAll(null, (err, data) => {
            if (!err) {
                return res.status(200).send({
                    results: data
                });
            }
        });
    }
});

app.post("/create", (req, res) => {
    let newOrder = {
        username: req.body.username,
        idItem: req.body.idItem,
        itemName: req.body.itemName,
        amount: req.body.amount,
        total: req.body.total,
        paymentMethod: req.body.paymentMethod,
    };

    client.insert(newOrder, (err, data) => {
        if (err) throw err;

        return res.status(200).send({
            message: "Insert new order successfully",
            results: data
        })
    });
});

app.put("/update", (req, res) => {
    const updateOrder = {
        id: req.body.id,
        idItem: req.body.idItem,
	    itemName: req.body.itemName,
	    amount: req.body.amount,
	    total: req.body.total,
	    paymentMethod: req.body.paymentMethod
    };

    client.update(updateOrder, (err, data) => {
        if (err) throw err;

        return res.status(200).send({
            message: "Order updated successfully",
            results: data
        })
    });
});

app.delete("/remove", (req, res) => {
    client.remove({ id: req.body.id }, (err, _) => {
        if (err) throw err;

        return res.status(200).send({
            message: "Delete order successfully"
        })
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});