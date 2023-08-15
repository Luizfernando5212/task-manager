const service = require("../service/commentsService");

const commentsController = {
    insertComment: async (req, res) => {
        service.newComment(req, res);
    },
    updateComment: async (req, res) => {
        service.updateComment(req, res)
    },
    getComments: async (req, res) => {
        service.getComments(req, res);
    },
    getCommentsByTask: async (req, res) => {
        service.getCommentsByTask(req, res);
    },
    getCommentById: async (req, res) => {
        service.getCommentById(req, res);
    },
    deleteComment: async (req, res) => {
        service.deleteComment(req, res);
    }
}

module.exports = commentsController;