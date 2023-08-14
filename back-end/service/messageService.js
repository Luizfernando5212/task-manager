const Message = require('../models/messages')
// const GroupMessage = require('../models/groupMessages');

exports.getMessagesByUserId = async (req, res) => {
    try {
        const messages = await Message.find({ receiver: req.params.userId });
        res.json(messages);
    } catch (err) {
        console.log(err);
    }
}

exports.getMessagesByReceiverSender = async (req, res) => {
    try {
        const messages = await Message.find({
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
        const messages = await Message.find({ sender: req.params.id }).distinct('receiver').populate('receiver');
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

        const response = await Message.create(message);
        console.log(response)
        req.io.emit('message', response)
        res.json(response);
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


        const response = await Message.findByIdAndUpdate(req.params.id, message);

        res.json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        const response = await Message.findByIdAndDelete(req.params.id);
        res.json(response);
    } catch (err) {
        console.log(err);
    }
}