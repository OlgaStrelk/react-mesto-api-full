const jwt = require('jsonwebtoken');

const JWT_SECRET = 'kjhzsdkdkjsa';

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

const checkToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { generateToken, checkToken };
