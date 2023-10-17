const service = require("../service/userService");

const userController = {

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
    },
    recoveryEmail: async (req, res) => {
        service.passwordRecoveryEmail(req, res);
    },
    recoveryPassword: async (req, res) => {
        service.passwordRecovery(req, res);
    },
    oauth: async (req, res) => {
        service.oauth(req, res);
    },
    login: async (req, res) => {
        service.verifyUser(req, res);
    },

}

module.exports = userController;