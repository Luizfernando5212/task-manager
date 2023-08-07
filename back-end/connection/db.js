const mongoose = require('mongoose');
require('dotenv').config();

async function main() {

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, connectionParams);
        console.log('Connected to the database');
    } catch (err) {
        console.log('Error connecting to the database. ' + err);
    }
}
module.exports = main;