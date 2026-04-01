const connectDB = require('./config/db');
const app = require('./app');
const { PORT } = require('./config/env');

const startServer = async () => {
    try {
        await connectDB();
        
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on: http://localhost:${PORT}`);
        });

        // Basic error handling for server
        server.on('error', (error) => {
            console.error(`❌ Server error: ${error.message}`);
            process.exit(1);
        });

    } catch (error) {
        console.error(`❌ Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();
