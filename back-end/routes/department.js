const router = require('express').Router();
const departmentController = require('../controller/departmentController');

router.get('/', departmentController.getDepartments);
router.get('/:id', departmentController.getDepartmentById);
router.post('/', departmentController.insertDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;