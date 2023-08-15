const Project = require('../models/project');
require('dotenv').config();

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        res.status(200).json(project);
    } catch (err) {
        res.status(401).json({ message: 'Invalid id.' })
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        // console.log(projects)
        res.json(projects);
    } catch (err) {
        console.log(err);
    }
}

exports.insertProject = async (req, res) => {
    try {
        if (req.body.name, req.body.lead, req.body.department) {
            const { name, lead, department } = req.body;
            var project = new Project({
                name: name,
                department: department,
                lead: lead
            });
            
            if (req.body.description) 
                project.description = req.body.description;

            const response = await project.save();
            res.json(response);
        } else {

        }
    } catch (err) {
        console.log(err);
    }
}

exports.updateProject = async (req, res) => {
    try {
        const project = {
            description: req.body.description
        }
        const oldProject = await Project.findById(req.params.id);

        const response = await Project.findByIdAndUpdate(req.params.id, oldProject);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteProject = async (req, res) => {
    try {
        // console.log(req.params.phone);
        const response = await Project.findByIdAndDelete(req.params.id);
        // console.log(response)
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}