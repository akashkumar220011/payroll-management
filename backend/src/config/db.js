const mongoose = require('mongoose');
const { mongoUri} = require('./env');


const connectDb = async ()=>{
    try {
        await mongoose.connect(mongoUri);
        console.log("Db is connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDb;