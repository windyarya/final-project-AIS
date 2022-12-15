const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to REST API"
    })
});

require('./routes/routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, "10.100.26.158", () => {
    console.log(`Server is running on port ${PORT}`);
})