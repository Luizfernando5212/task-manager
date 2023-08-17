const router = require('express').Router();
const companyController = require('../controller/companyController');

router.get('/', companyController.getCompanies);
router.get('/:id', companyController.getCompanyById);
router.post('/', companyController.insertCompany);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;