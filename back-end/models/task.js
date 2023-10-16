let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TaskSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        project: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
        creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        assignee: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        status: { type: String, enum: ['não iniciada', 'em andamento', 'concluído'], required: true, default: 'não iniciada' },
        createdAt: { type: Date, required: true, default: Date.now },
        updatedAt: { type: Date, required: true, default: Date.now },
        resolutionDate: { type: Date },
        timeEstimate: { type: Number, default: 0 }, // Tempo estimado em horas para a conclusão
        timeSpent: { type: Number, default: 0 }, // Tempo em horas até a conclusão
    }
);

module.exports = mongoose.model('Task', TaskSchema);