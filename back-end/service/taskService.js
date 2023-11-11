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
        let project = {};

        if (req.query.project) {
            project = { project: req.query.project };
        }
        const tasks = await Task.find(project)
            .populate('assignee', '_id name role email')
            .populate('creator', '_id name role email');
        res.json(tasks);
    } catch (err) {
        console.log(err);
    }
}

exports.getTasksByAssignee = async (req, res) => {
    try {
        const tasks = await Task.find({ assignee: req.params.id }).populate('assignee').populate('creator');
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

        const oldTask = await Task.findById(req.params.id);

        oldTask.timeSpent = req.body.timeSpent || oldTask.timeSpent;
        oldTask.project = req.body.project || oldTask.project;
        oldTask.name = req.body.name || oldTask.name;
        oldTask.description = req.body.description || oldTask.description;
        oldTask.status = req.body.status || oldTask.status;
        oldTask.assignee = req.body.assignee || oldTask.assignee;
        oldTask.updatedAt = Date.now();
        

        const response = await Task.findByIdAndUpdate(req.params.id, oldTask);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const response = await Task.findByIdAndDelete(req.params.id);
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}