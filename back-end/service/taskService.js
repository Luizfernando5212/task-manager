const Task = require('../models/task');
require('dotenv').config();

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        res.status(200).json(task);
    } catch (err) {
        res.status(401).json({ message: 'Invalid id.' })
    }
}

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        // console.log(tasks)
        res.json(tasks);
    } catch (err) {
        console.log(err);
    }
}

exports.getTasksByAssignee = async (req, res) => {
    try {
        const tasks = await Task.find({ assignee: req.params.id }).populate('assignee');
        // console.log(tasks)
        res.json(tasks);
    } catch (err) {
        console.log(err);
    }
}

exports.insertTask = async (req, res) => {
    try {
        if (req.body.name, req.body.description, req.body.project, req.body.creator,
            req.body.assignee) {
            const { name, description, project, creator, assignee } = req.body;
            var task = new Task({
                name: name,
                description: description,
                project: project,
                creator: creator,
                assignee: assignee
            });
            
            if (req.body.timeEstimate) 
                task.timeEstimate = req.body.timeEstimate;

            const response = await task.save();
            res.json(response);
        } else {

        }
    } catch (err) {
        console.log(err);
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = req.body;

        const oldTask = await Task.findById(req.params.id);

        oldTask.timeSpent = task.timeSpent;

        const response = await Task.findByIdAndUpdate(req.params.id, task);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteTask = async (req, res) => {
    try {
        // console.log(req.params.phone);
        const response = await Task.findByIdAndDelete(req.params.id);
        // console.log(response)
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}