const service = require('../service/projectService')

const projectController = {
    insertProject: async (req, res) => {
        service.insertProject(req, res);
    },
    updateProject: async (req, res) => {
        service.updateProject(req, res)
    },
    getProjects: async (req, res) => {
        service.getProjects(req, res);
    },
    getProjectById: async (req, res) => {
        service.getProjectById(req, res);
    },
    deleteProject: async (req, res) => {
        service.deleteProject(req, res);
    }
}

module.exports = projectController;