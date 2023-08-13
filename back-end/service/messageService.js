const Message = require('../models/messages')

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
            receiver: req.params.receiver, 
            sender: req.params.sender 
        })
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
            sender: req.body.name,
            receiver: req.body.receiver,
            message: req.body.message,
        }

        const response = await Message.create(message);
        req.io.emit('message', response.data)
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