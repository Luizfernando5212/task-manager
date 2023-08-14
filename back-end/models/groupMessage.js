let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// const autoIncrementModelID = require('./counter');

let GroupMessageSchema = new Schema(
    {
        groupId: { type: Schema.Types.ObjectId, unique: true, required: true, ref: 'Group' },
        // messageId: { type: Number, required: true, unique: true },
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        message: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
    }
);

// GroupMessageSchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }

//     autoIncrementModelID('activitities', this, next)
// })

// GroupSchema.index({ sender: 1, receiver: 1 }, { unique: true });

module.exports = mongoose.model('GroupMessage', GroupMessageSchema);