const controller = require("../controllers/users.controller");
const cors = require("cors");

module.exports = function(app) {
    app.post("/add", controller.addUser);
    app.put("/edit", controller.editUser);
    app.delete("/delete", controller.deleteUser);
    app.get("/get", controller.getUser);
};