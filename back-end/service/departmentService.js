const Department = require('../models/department');
require('dotenv').config();

exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);

        res.status(200).json(department);
    } catch (err) {
        res.status(401).json({ message: 'Invalid id.' })
    }
}

exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        // console.log(departments)
        res.json(departments);
    } catch (err) {
        console.log(err);
    }
}

exports.newDepartment = async (req, res) => {
    try {
        if (req.body.name, req.body.company) {
            const { name, company } = req.body;
            var department = new Department({
                name: name,
                company: description
            });

            const response = await department.save();
            res.json(response);
        }
    } catch (err) {
        console.log(err);
    }
}

exports.updateDepartment = async (req, res) => {
    try {
        const department = {
            name: req.body.name
        }
        const oldDepartment = await Department.findById(req.params.id);

        oldDepartment.phone = department.phone;

        const response = await Department.findByIdAndUpdate(req.params.id, oldDepartment);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteDepartment = async (req, res) => {
    try {
        // console.log(req.params.phone);
        const response = await Department.findByIdAndDelete(req.params.id);
        // console.log(response)
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}