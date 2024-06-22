const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userControler.js');

router.get('/', userControler);

// deberia haber otros endponits

module.exports = router;