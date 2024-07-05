const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const coneccionBD = require('../db/dbConfig');
const config = require('../config/config');


const renderRegister = (req, res) => {
    res.render('registro');
};

const renderLogin = (req, res) => {
    res.render('login');
};


const register = async (req, res) =>{

    const {nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass, calle, altura, localidad, provincia, cod_postal, piso_dpto} = req.body; // tomamos los capos de del formulario /registro
    
    const sqlInsetUsuario = 'INSERT INTO usuario_tbl (nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    const sqlSelectUsuario = 'SELECT id_usuario FROM usuario_tbl WHERE email = ?';

    const sqlInsertDireccion = 'INSERT INTO direccion_tbl (id_usuario, calle, altura, localidad, provincia, cod_postal, piso_dpto) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    const hashedPassword = bcrypt.hashSync(pass, 8); //creamos el hashtad del pass
    
    try {
        const connection = await coneccionBD.getConnection()
        await connection.query(sqlInsetUsuario, [nombre, apellido, tipo_documento, num_documento, genero, tel, email, hashedPassword]); //insertamos el usuario en la tabla usuario

        const [rows] = await connection.query(sqlSelectUsuario, [email]); // solicitamos el id_usuario a partir del email
        const id_usuario = rows[0].id_usuario;

        const [rows2] = await connection.query(sqlInsertDireccion, [id_usuario, calle, altura, localidad, provincia, cod_postal, piso_dpto]);

        console.log(rows[0], rows2[0]);

    } catch (err) {
        res.status(500).send('Internal server error');
        console.log(err);
    }
};


module.exports = { renderLogin, renderRegister, register };