const Company = require('../models/company');
require('dotenv').config();

exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        res.status(200).json(company);
    } catch (err) {
        res.status(401).json({ message: 'Invalid id.' })
    }
}

exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        // console.log(companys)
        res.json(companies);
    } catch (err) {
        console.log(err);
    }
}

exports.newCompany = async (req, res) => {
    try {
        if (req.body.name, req.body.description) {
            const { name, description } = req.body;
            var company = new Company({
                name: name,
                description: description
            });

            const response = await company.save();
            res.json(response);
        }
    } catch (err) {
        console.log(err);
    }
}

exports.updateCompany = async (req, res) => {
    try {
        const company = {
            phone: req.body.phone
        }
        const oldCompany = await Company.findById(req.params.id);

        oldCompany.phone = company.phone;

        const response = await Company.findByIdAndUpdate(req.params.id, oldCompany);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteCompany = async (req, res) => {
    try {
        // console.log(req.params.phone);
        const response = await Company.findByIdAndDelete(req.params.id);
        // console.log(response)
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}