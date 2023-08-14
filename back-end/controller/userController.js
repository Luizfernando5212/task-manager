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
    getUserById: async (req, res) => {
        service.getUserById(req, res);
    },
    deleteUser: async (req, res) => {
        service.deleteUser(req, res);
    },
    getChannelsByUserId: async (req, res) => {
        service.getChannelsByUserId(req, res);
    }

}

module.exports = userController;