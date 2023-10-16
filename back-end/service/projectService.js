const Project = require('../models/project');
const taskDto = require('../DTO/taskDTO');
const projectDTO = require('../DTO/projectDTO');
require('dotenv').config();

const fetch = require('node-fetch');
const taskDTO = require('../DTO/taskDTO');

exports.getProjectById = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        console.log(project)

        project = projectDTO(project);

        const request = 'http://localhost:3000/task?project=' + req.params.id;

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(request, options);

        let tasks = await response.json();
        
        for (let i = 0; i < tasks.length; i++) {
            tasks[i] = taskDto(tasks[i]);
        }

        project.tasks = tasks;

        res.status(200).json(project);
    } catch (err) {
        console.log(err);
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
            res.status(400).json({ message: 'Missing fields.'})
        }
    } catch (err) {
        console.log(err);
    }
}

exports.updateProject = async (req, res) => {
    try {
        const project = {
            description: req.body.description,
            updatedAt: Date.now()
        }
        const oldProject = await Project.findById(req.params.id);

        oldProject.description = project.description;
        oldProject.updatedAt = project.updatedAt;

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