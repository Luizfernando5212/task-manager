let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let DepartmentSchema = new Schema(
    {
        name: { type: String, required: true, },
        company: { type: Schema.Types.ObjectId, required: true, ref: 'Company' },
        createdAt: { type: Date, required: true, default: Date.now },
    }
);

module.exports = mongoose.model('Department', DepartmentSchema);