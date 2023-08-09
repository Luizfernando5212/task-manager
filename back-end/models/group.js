let Schema = mongoose.Schema;

let GroupSchema = new Schema(
    {
        users: { type: String, required: true },
    }
);

// GroupSchema.index({ sender: 1, receiver: 1 }, { unique: true });

module.exports = mongoose.model('Group', GroupSchema);