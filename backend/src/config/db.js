const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}`);
        console.log(`\n✅ MongoDB Connected! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection error: ", error);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.warn("⚠️ MongoDB Disconnected");
});

mongoose.connection.on('error', (err) => {
    console.error(`❌ MongoDB Error: ${err}`);
});

module.exports = connectDB;
