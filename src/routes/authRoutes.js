const express = require('express');
const authRouter = express.Router();
const authControler = require('../controllers/authControler.js');

authRouter.get('/login', authControler.renderLogin);
authRouter.post('/login', authControler.login);

authRouter.get('/registro', authControler.renderRegister);
authRouter.post('/registro', authControler.register);


module.exports = authRouter;