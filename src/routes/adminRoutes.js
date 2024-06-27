const express = require('express');
const adminRouter = express.Router();
const getAllItems = require('../controllers/adminControler.js');

adminRouter.get('/', getAllItems);

module.exports = adminRouter;