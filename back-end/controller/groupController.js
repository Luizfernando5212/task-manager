const service = require('../service/groupService')

const groupController = {
    insertGroup: async (req, res) => {
        service.insertGroup(req, res);
    },
    updateGroup: async (req, res) => {
        service.updateGroup(req, res)
    },
    getGroups: async (req, res) => {
        service.getGroups(req, res);
    },
    getGroupById: async (req, res) => {
        service.getGroupById(req, res);
    },
    deleteGroup: async (req, res) => {
        service.deleteGroup(req, res);
    }
}

module.exports = groupController;