const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN);
        console.log('Db started');
    } catch (error) {
        console.log(error);
        throw new Error('Error starting up db');
    }
}

module.exports = {
    dbConnection
}