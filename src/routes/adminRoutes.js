const express = require('express');
const adminRouter = express.Router();
const adminControler = require('../controllers/adminControler.js');

adminRouter.get('/', adminControler.getAllItems);
adminRouter.get('/edit/:id', adminControler.getItemById);

module.exports = adminRouter;