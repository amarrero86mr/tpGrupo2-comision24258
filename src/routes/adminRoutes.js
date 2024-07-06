const express = require('express');
const adminRouter = express.Router();
const adminControler = require('../controllers/adminControler.js');
const { verifyToken } = require('../middlewares/authMiddleware.js')

// adminRouter.get('/',  adminControler.getAllItems);

adminRouter.get('/', verifyToken, async (req, res) => {
    if (req.user.admin_user != '1') {
        return res.status(403).send('Acceso denegado. No tiene permisos de administrador.');
    }
    console.log(req.user);

    const dataItems = await adminControler.getAllItems(); // Obtiene los ítems de forma asincrónica
    res.render('admin', { dataItems }); // Renderiza la vista de administración con los ítems
});

adminRouter.get('/edit/:id', adminControler.getItemById);

adminRouter.post('/create', adminControler.postCreateItem);
adminRouter.get('/create', adminControler.getCreateItem);

module.exports = adminRouter;
