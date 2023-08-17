// exports.MessageDtoFactory = (object) => {
//     this.id = object._id;
//     this.sender = object.sender.name;
//     this.receiver = object.receiver.name;
//     this.message = object.message;
//     this.createdAt = object.createdAt;
//     this.status = object.status;
// }

function MessageDtoFactory (object) {
    this.id = object._id;
    this.sender = object.sender.name;
    this.receiver = object.receiver.name;
    this.message = object.message;
    this.createdAt = object.createdAt;
    this.status = object.status;
}

module.exports = MessageDtoFactory;