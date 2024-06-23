const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userControler.js');

router.get('/', userControler.getAllUser);
router.get('/:id', userControler.getAllUserByID);

// deberia haber otros endponits

module.exports = router;