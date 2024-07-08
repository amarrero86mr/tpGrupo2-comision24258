const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userControler.js');

router.get('/', userControler.getAllUser);
router.get('/:id', userControler.getAllUserByID);
router.post('/', userControler.postNewUser);
router.put('/:id', userControler.putEditUser);
router.delete('/:id', userControler.deleteUserByID);
// deberia haber otros endponits

module.exports = router;