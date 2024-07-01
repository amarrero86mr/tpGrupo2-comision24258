const express = require('express');
const authRouter = express.Router();
const authControler = require('../controllers/authControler.js');

authRouter.get('/login', authControler.renderLogin);


module.exports = authRouter;
