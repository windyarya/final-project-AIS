const db = require("../models/index");
const config = require("../config/auth.config");
const Users = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    Users.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            Users.findOne({
                where: {
                    phone: req.body.phone
                }
            }).then(user1 => {
                if (!user1) {
                    Users.create({
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        class: req.body.class,
                        password: bcrypt.hashSync(req.body.password, 8)
                    }).then(user2 => {
                        res.status(200).send({
                            message: "Sign up successful!",
                            data: {
                                name: user2.name,
                                email: user2.email,
                                phone: user2.phone,
                                class: user2.class
                            }
                        })
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message
                        })
                    })
                } else {
                    res.status(409).send({
                        message: "Phone number is already exists."
                    })
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                })
            })
        } else {
            res.status(409).send({
                message: "Email is already exists."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};

exports.signin = (req, res) => {
    if (req.body.email) {
        Users.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found."
                })
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password"
                })
            }

            var token = jwt.sign({
                id: user.id,
                email: user.email,
                class: user.class
            }, config.secret, {
                expiresIn: 86400
            });

            res.status(200).send({
                message: "Sign in successful!",
                data: {
                    email: user.email,
                    accessToken: token
                }
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
    }
}