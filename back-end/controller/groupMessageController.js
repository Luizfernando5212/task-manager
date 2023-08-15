const service = require('../service/groupMessageService')

const groupMessageController = {
    insertGroupMessage: async (req, res) => {
        service.insertGroupMessage(req, res);
    },
    updateGroupMessage: async (req, res) => {
        service.updateGroupMessage(req, res)
    },
    getGroupMessages: async (req, res) => {
        service.getGroupMessages(req, res);
    },
}

module.exports = groupMessageController;