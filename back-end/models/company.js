let Schema = mongoose.Schema;

let CompanySchema = new Schema(
    {
        name: { type: String, required: true},
        phone: { type: String, required: true, index: {
            unique: true,
            partialFilterExpression: {phone: {$type: "string"}}
        }},
        createdAt: { type: Date, required: true, default: Date.now },
        // address: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
    }
);

module.exports = mongoose.model('Company', CompanySchema);