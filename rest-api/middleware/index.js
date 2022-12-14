const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const Users = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]) {
        return res.status(403).send({
            message: "No token provided!"
        })
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            })
        }

        req.uid = decoded.id;
        req.emailT = decoded.email;
        req.classT = decoded.class;
        next();
    });
};

const authJwt = {
    verifyToken
}

module.exports = authJwt;