let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CommentSchema = new Schema(
    {
        task: { type: Schema.Types.ObjectId, required: true, ref: 'Task' },
        creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        comment: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
    }
);

module.exports = mongoose.model('Comment', CommentSchema);