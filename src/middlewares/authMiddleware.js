const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {

    authHeader = req.headers['autorization'];

    if (!autheader) {
        return res.status(403).send({ auth: false, message: 'token faltante'});
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(403).send({ auth: false, message: 'token invalido'});
    }

    jwt.verify(token, config.secretKey, (err, decode) => {
        
        if (err) {
            return res.status(500).send({auth: false, message: 'Falla de autenticacion de token'})
        }

        req.userid = decode.indexOf;

        next();
    });
};