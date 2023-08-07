const service = require("../service/userService");

userController = {

    insertUser: async (req, res) => {
        service.newUser(req, res);
    },

    updateUser: async (req, res) => {
        service.updateUser(req, res)
    },

    getUsers: async (req, res) => {
        service.getUsers(req, res);
    },
    getUserByPhone: async (req, res) => {
        service.getUserByPhone(req, res);
    }

}

module.exports = userController;