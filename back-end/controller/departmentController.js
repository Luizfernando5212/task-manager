const service = require("../service/departmentService");

const departmentController = {
    insertDepartment: async (req, res) => {
        service.newDepartment(req, res);
    },
    updateDepartment: async (req, res) => {
        service.updateDepartment(req, res)
    },
    getDepartments: async (req, res) => {
        service.getDepartments(req, res);
    },
    getDepartmentById: async (req, res) => {
        service.getDepartmentById(req, res);
    },
    deleteDepartment: async (req, res) => {
        service.deleteDepartment(req, res);
    }
}

module.exports = departmentController;