const Comment = require('../models/comments');
require('dotenv').config();

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        res.status(200).json(comment);
    } catch (err) {
        res.status(401).json({ message: 'Invalid id.' })
    }
}

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        console.log(err);
    }
}

exports.getCommentsByTask = async (req, res) => {
    try {
        const comments = await Comment.find({ task: req.params.id });
        res.json(comments);
    } catch (err) {
        console.log(err);
    }
}

exports.newComment = async (req, res) => {
    try {
        if (req.body.task, req.body.creator, req.body.message) {
            const { task, creator, message } = req.body;
            var comment = new Comment({
                task: task,
                creator: creator,
                message: message
            });

            const response = await comment.save();
            res.json(response);
        } else {

        }
    } catch (err) {
        console.log(err);
    }
}

exports.updateComment = async (req, res) => {
    try {
        const comment =  {
            message: req.body
        };

        const oldComment = await Comment.findById(req.params.id);

        oldComment.message = comment.message;

        const response = await Comment.findByIdAndUpdate(req.params.id, comment);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const response = await Comment.findByIdAndDelete(req.params.id);
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}