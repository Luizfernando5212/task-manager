const GroupMessage = require('../models/groupMessage')

// const GroupMessage = require('../models/groupMessages');

exports.getMessagesByUserId = async (req, res) => {
    try {
        const messages = await GroupMessage.find({ receiver: req.params.userId });
        res.json(messages);
    } catch (err) {
        console.log(err);
    }
}

exports.getMessagesByReceiverSender = async (req, res) => {
    try {
        const messages = await GroupMessage.find({
            $or: [{
                receiver: req.params.receiver,
                sender: req.params.sender
            }, {
                receiver: req.params.sender,
                sender: req.params.receiver
            }]
        }).populate('sender').populate('receiver').sort({ _id: 1 });

        // console.log(messages)
        res.json(messages);
    } catch (err) {
        console.log(err);
    }
}

exports.getMessagesByChannelId = async (req, res) => {
    try {
        const messages = await GroupMessage.find({ sender: req.params.id }).distinct('receiver').populate('receiver');
        console.log(messages)
        res.json(messages);
    } catch (err) {
        console.log(err);
    }
}

// exports.getMessageById = async (req, res) => {
//     try {
//         const message = await Message.findById(req.params.id)
//         // res.render('imagepage', { items: message });
//         res.json(message);
//     } catch (err) {
//         console.log(err);
//     }
// }

exports.insertMessage = async (req, res) => {
    try {
        let message = {
            sender: req.body.sender,
            receiver: req.body.receiver,
            message: req.body.message,
        }
        console.log(message)
        // console.log(req)

        const response = await GroupMessage.create(message);
        const populatedRepsonse = await GroupMessage.findById(response._id).populate('sender').populate('receiver');
        req.io.emit('message', populatedRepsonse)
        res.json(populatedRepsonse);
    } catch (err) {
        console.log(err);
    }
}

exports.updateMessage = async (req, res) => {
    try {
        let message = {}
        if (req.body.message)
            message.message = req.body.name;

        message.status = req.body.status;


        const response = await GroupMessage.findByIdAndUpdate(req.params.id, message);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        const response = await GroupMessage.findByIdAndDelete(req.params.id);
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}