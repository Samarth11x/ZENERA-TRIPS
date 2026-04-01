const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const _env = {
    PORT: process.env.PORT || 8000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1d',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '10d',
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    NODE_ENV: process.env.NODE_ENV || 'development',
};

// Simple validation to ensure critical variables are present
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'REFRESH_TOKEN_SECRET'];
const missingVars = requiredEnvVars.filter(v => !_env[v]);

if (missingVars.length > 0 && _env.NODE_ENV === 'production') {
    console.error(`❌ Missing critical environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
}

module.exports = _env;
