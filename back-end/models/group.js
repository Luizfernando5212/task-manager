let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GroupSchema = new Schema(
    {
        name: { type: String, required: true, max: 100 },
        users: { type: Array, required: true },
    }
);

// GroupSchema.index({ sender: 1, receiver: 1 }, { unique: true });

module.exports = mongoose.model('Group', GroupSchema);