module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        class: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return Users;
}