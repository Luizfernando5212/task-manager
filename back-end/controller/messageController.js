const service = require('../service/messageService');

const messageController = {
    messagesByUserId: async (req, res) => {
        service.getMessagesByUserId(req, res);
    },
    postMessage: async (req, res) => {
        service.insertMessage(req, res);

    },
    updateMessage: async (req, res) => {
        service.updateMessage(req, res);
    },

}