const ucontroller = require("../controllers/users.controller");
const acontroller = require("../controllers/auth.controller");
const cors = require("cors");
const middleware = require("../middleware/index");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/signup", acontroller.signup);
    app.post("/signin", acontroller.signin);
    app.put("/edit", [middleware.verifyToken], ucontroller.editUser);
    app.delete("/delete", [middleware.verifyToken], ucontroller.deleteUser);
    app.get("/get", [middleware.verifyToken], ucontroller.getUser);
};