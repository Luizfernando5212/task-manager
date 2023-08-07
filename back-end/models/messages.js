let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MessageSchema = new Schema(
    {
        sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        receiver: { type: Schema.Types.ObjectId, required: true , ref: 'User'},
        message: { type: String, required: true },
        creationDate: { type: Date, required: true, default: Date.now },
        systemMessage: { type: Boolean, required: true, default: false },
    }
);

module.exports = mongoose.model('Message', MessageSchema);