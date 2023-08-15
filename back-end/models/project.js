let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ProjectSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        lead: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        department: { type: Schema.Types.ObjectId, required: true, ref: 'Department' },
        createdAt: { type: Date, required: true, default: Date.now },
        updatedAt: { type: Date, required: true, default: Date.now },
    }
);

module.exports = mongoose.model('Project', ProjectSchema);