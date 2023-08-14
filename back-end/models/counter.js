var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CounterSchema = new Schema(
  {
    seq: { type: Number, default: 0 }
  }
);

CounterSchema.index({ _id: 1, seq: 1 }, { unique: true })

const counterModel = mongoose.model('counter', CounterSchema);

const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(        // ** Method call begins **
    modelName,                           // The ID to find for in counters model
    { $inc: { seq: 1 } },                // The update
    { new: true, upsert: true },         // The options
    function (error, counter) {           // The callback
      if (error) return next(error);

      doc.id = counter.seq;
      next();
    }
  );                                     // ** Method call ends **
}

module.exports = autoIncrementModelID;