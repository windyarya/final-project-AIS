const db = require("../models/index");
const Users = db.user;

exports.editUser = (req, res) => {
    Users.findOne({
        where: {
            id: req.uid
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        if (req.body.name) {
            Users.update({
                name: req.body.name
            }, {
                where: {
                    id: req.uid
                }
            }).then(user1 => {
                return res.status(200).send({
                    message: "Update user successfully!"
                })
            }).catch(err => {
                return res.status(500).send({
                    message: err.message
                })
            })
        } else if (req.body.class) {
            Users.update({
                class: req.body.class
            }, {
                where: {
                    id: req.uid
                }
            }).then(user => {
                return res.status(200).send({
                    message: "Update user successfully!"
                })
            }).catch(err => {
                return res.status(500).send({
                    message: err.message
                })
            })
        }
    }).catch(err => {
        return res.status(500).send({
            message: err.message
        })
    })
};

exports.getUser = (req, res) => {
    if (req.body.id) {
        Users.findOne({
            where: {
                id: req.body.id
            }
        }).then(user => {
            return res.status(200).send({
                message: "Get user successfully!",
                data: user
            })
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            })
        })
    } else {
        Users.findAll().then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "No user found!"
                })
            }

            return res.status(200).send({
                message: "Get all users successfully",
                data: user
            })
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            })
        })
    }
};

exports.deleteUser = (req, res) => {
    Users.findOne({
        where: {
            id: req.body.id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found!"
            })
        }

        Users.destroy({
            where: {
                id: req.body.id
            }
        }).then(user1 => {
            return res.status(200).send({
                message: "Delete user successfully!"
            })
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            })
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message
        })
    })
};

