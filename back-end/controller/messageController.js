const service = require('../service/messageService');

const messageController = {
    messagesByUserId: async (req, res) => {
        service.getMessagesByUserId(req, res);
    },
    messagesByReceiverSender: async (req, res) => {
        service.getMessagesByReceiverSender(req, res);
    },
    messagesByChannelId: async (req, res) => {
        service.getMessagesByChannelId(req, res);
    },
    postMessage: async (req, res) => {
        service.insertMessage(req, res);
    },
    updateMessage: async (req, res) => {
        service.updateMessage(req, res);
    },
    deleteMessage: async (req, res) => {
        service.deleteMessage(req, res);
    }

}

module.exports = messageController;