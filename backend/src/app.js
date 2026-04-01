const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { CORS_ORIGIN, NODE_ENV } = require('./config/env');

const app = express();

// Standard middleware
app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Import routes
const authRouter = require('./routes/auth.routes');

// Route declarations
app.use('/api/v1/users', authRouter);

// Root route
app.get('/', (req, res) => {
    res.json({ message: "🚀 ZENERA TRIPS Backend API is running." });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(`❌ Global Error: ${err.stack}`);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: NODE_ENV === 'development' ? err.errors : []
    });
});

module.exports = app;
