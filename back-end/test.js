const Factory = require('./DTO/messageDTO');

let message = {
    "_id": "64da830c3d4ffb95ff28dba5",
    "sender": {
        "_id": "64d96a85e2480dfe18963cbe",
        "email": "luiz@gmail.com",
        "name": "Luiz Fernando",
        "createdAt": "2023-08-13T23:43:01.717Z",
        "__v": 0
    },
    "receiver": {
        "_id": "64d96a98e2480dfe18963cc0",
        "email": "erick@gmail.com",
        "name": "Erick Carvalho",
        "createdAt": "2023-08-13T23:43:20.010Z",
        "__v": 0
    },
    "message": "kmaskmd",
    "status": "sent",
    "createdAt": "2023-08-14T19:39:56.752Z",
    "__v": 0
}

message = new Factory(message);
