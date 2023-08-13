const Group = require('../models/group')

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (err) {
        console.log(err);
    }
}

exports.getGroupById = async (req, res) => {
    try {
        const Group = await Group.findById(req.params.id)
        // res.render('imagepage', { items: group });
        res.json(group);
    } catch (err) {
        console.log(err);
    }
}

exports.insertGroup = async (req, res) => {
    try {

        var group = {
            users: req.body.users,
        }

        const response = await Group.create(group);
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}

exports.updateGroup = async (req, res) => {
    try {
        var group = {
            users: req.body.users,
        }

        const response = await Group.findByIdAndUpdate(req.params.id, group);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteGroup = async (req, res) => {
    try {
        const response = await Group.findByIdAndDelete(req.params.id);
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}