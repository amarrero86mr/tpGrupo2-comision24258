const express = require('express');
const adminRouter = express.Router();
const adminControler = require('../controllers/adminControler.js');
const { verifyToken } = require('../middlewares/authMiddleware.js')

// adminRouter.get('/',  adminControler.getAllItems);

adminRouter.get('/', verifyToken, async (req, res) => {
    if (req.user.admin_user != '1') {
        return res.status(403).send('Acceso denegado. No tiene permisos de administrador.');
    }
    // console.log(req.user);

    const dataItems = await adminControler.getAllItems(); // Obtiene los ítems de forma asincrónica
    res.render('admin', { dataItems }); // Renderiza la vista de administración con los ítems
});

adminRouter.get('/edit/:id', verifyToken, async (req, res) => {
    if (req.user.admin_user != '1') {
        return res.status(403).send('Acceso denegado. No tiene permisos de administrador.');
    }
    
    const dataItem = await adminControler.getItemById(req.params.id); // Obtiene los ítems de forma asincrónica
    res.render('edit', { dataItem }); // Renderiza la vista de administración con los ítems
});

adminRouter.post('/edit/:id', verifyToken, async (req, res) => {
    if (req.user.admin_user != '1') {
        return res.status(403).send('Acceso denegado. No tiene permisos de administrador.');
    }
    const { nombre_item, id_marca, cod_categoria, descripcion_item, cod_item, stock, descuento, precio, imgurl_1, imgurl_2 } = req.body;
    const dataItemedit = { nombre_item, id_marca, cod_categoria, descripcion_item, cod_item, stock, descuento, precio, imgurl_1, imgurl_2 };
    try {
        const dataItem = await adminControler.putEditItem(req.params.id, dataItemedit);
        if (dataItem) {
            res.redirect('/admin'); // Redirige a la vista de administración
        } else {
            res.status(500).send('Error al actualizar el ítem');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el ítem');
    }
});

adminRouter.post('/delete/:id', verifyToken, async (req, res) => {
    if (req.user.admin_user != '1') {
        return res.status(403).send('Acceso denegado. No tiene permisos de administrador.');
    }

    try {
        const result = await adminControler.deleteItemById(req.params.id);
        if (result.affectedRows > 0) {
            res.redirect('/admin');
        } else {
            res.status(500).send('Error al eliminar el ítem');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el ítem');
    }
});

adminRouter.post('/create', adminControler.postCreateItem);
adminRouter.get('/create', adminControler.getCreateItem);

module.exports = adminRouter;
