const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userControler');

router.get('/usuarios/', userControler.getAllUser);

// deberia haber otros endponits

module.exports = router;