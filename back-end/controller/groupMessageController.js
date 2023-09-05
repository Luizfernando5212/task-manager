const service = require('../service/groupMessageService')

const groupMessageController = {
    insertGroupMessage: async (req, res) => {
        service.insertMessage(req, res);
    },
    updateGroupMessage: async (req, res) => {
        service.updateMessage(req, res)
    },
    getGroupMessages: async (req, res) => {
        service.getGroupMessages(req, res);
    },
}

module.exports = groupMessageController;