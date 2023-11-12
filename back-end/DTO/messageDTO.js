// exports.MessageDtoFactory = (object) => {
//     this.id = object._id;
//     this.sender = object.sender.name;
//     this.receiver = object.receiver.name;
//     this.message = object.message;
//     this.createdAt = object.createdAt;
//     this.status = object.status;
// }

function messageDtoFactory (object) {
    let obj = {
        id: object._id,
        sender: object.sender.name,
        receiver: object.receiver.name,
        message: object.message,
        createdAt: object.createdAt,
        status: object.status
    };
    return obj;
}

module.exports = messageDtoFactory;