const ApiError = require('../utils/ApiError');

/**
 * Middleware to restrict access to specific roles.
 * @param {...string} roles - The roles allowed to access the route.
 */
const authorize = (...roles) => {
    return (req, _, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new ApiError(403, `Access Denied. Required role: ${roles.join(' or ')}`);
        }
        next();
    };
};

module.exports = authorize;
