const dotenv = require('dotenv');
const { TokenExpiredError } = require('jsonwebtoken');

module.exports = {
    secretKey: process.env.JWT_SECRET,
    TokenExpiresIn: '1h'
};