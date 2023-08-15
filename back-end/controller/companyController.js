const service = require('../service/companyService')

const companyController = {
    insertCompany: async (req, res) => {
        service.newCompany(req, res);
    },
    updateCompany: async (req, res) => {
        service.updateCompany(req, res)
    },
    getCompanies: async (req, res) => {
        service.getCompanies(req, res);
    },
    getCompanyById: async (req, res) => {
        service.getCompanyById(req, res);
    },
    deleteCompany: async (req, res) => {
        service.deleteCompany(req, res);
    }
}

module.exports = companyController;