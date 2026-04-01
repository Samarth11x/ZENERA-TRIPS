const { Router } = require('express');
const { register, login, logout, refreshAccessToken } = require('../controllers/auth.controller');
const verifyJWT = require('../middleware/auth.middleware');

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);

// Secured route
router.post('/logout', verifyJWT, logout);

module.exports = router;
