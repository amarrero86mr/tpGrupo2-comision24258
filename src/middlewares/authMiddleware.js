const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Aquí debería ser req.cookies
    console.log(token);
    
    if (!token) {
        return res.status(401).send('Acceso denegado. Token no proporcionado.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user); // Aquí debería ser req.user, no user
        next();
        
    } catch (err) {
        res.status(403).send('Acceso denegado. Token inválido.');
        console.log(err)
    }
};

module.exports = { verifyToken };