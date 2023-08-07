let Schema = mongoose.Schma;

let DepartmentSchema = new Schema(
    {
        name: { type: String, required: true, },
        company: { type: Schema.Types.ObjectId, required: true, ref: 'Company' },
        creationDate: { type: Date, required: true, default: Date.now },
    }
);

module.exports = mongoose.model('Department', DepartmentSchema);