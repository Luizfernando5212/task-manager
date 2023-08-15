const service = require('../service/taskService')

const taskController = {
    insertTask: async (req, res) => {
        service.insertTask(req, res);
    },
    updateTask: async (req, res) => {
        service.updateTask(req, res)
    },
    getTasks: async (req, res) => {
        service.getTasks(req, res);
    },
    getTaskById: async (req, res) => {
        service.getTaskById(req, res);
    },
    deleteTask: async (req, res) => {
        service.deleteTask(req, res);
    }
}

module.exports = taskController;