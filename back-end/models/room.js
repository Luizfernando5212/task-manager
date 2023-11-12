let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let RoomSchema = new Schema(
    {
        roomId: { type: Number, required: true },
    }
);

RoomSchema.pre('save', async function (next) {
    let r = this;
    let maxId = await room.findOne().sort({ roomId: -1 });
    if (maxId) {
        r.roomId = maxId.roomId + 1;
    } else {
        r.roomId = 1;
    }
    next();
});

// RoomSchema.statics.findMaxId = async function () {
//     let maxId = await this.findOne().sort({roomId: -1});
//     return maxId.roomId;
// }

const room = mongoose.model('Room', RoomSchema);
module.exports = room;