const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const coneccionBD = require('../db/dbConfig.js');

const renderRegister = (req, res) => {
    res.render('registro');
};

const renderLogin = (req, res) => {
    res.render('login');
};

const registerUser = async (req, res) => {
    const { nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass, calle, altura, localidad, provincia, cod_postal, piso_dpto } = req.body;
    const hashedPassword = await bcrypt.hash(pass, 10);

    const sqlInsertUser = 'INSERT INTO usuario_tbl (nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const sqlSelectUserId = 'SELECT id_usuario FROM usuario_tbl WHERE num_documento = ? AND tel = ?';
    const sqlInsertAddress = 'INSERT INTO direccion_tbl (id_usuario, calle, altura, localidad, provincia, cod_postal, piso_dpto) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
        const connection = await coneccionBD.getConnection();

        await connection.query(sqlInsertUser, [nombre, apellido, tipo_documento, num_documento, genero, tel, email, hashedPassword]);

        const [rows] = await connection.query(sqlSelectUserId, [num_documento, tel]);
        const id_usuario = rows[0].id_usuario;

        await connection.query(sqlInsertAddress, [id_usuario, calle, altura, localidad, provincia, cod_postal, piso_dpto]);

        connection.release();

        console.log('nuevo usuario id: ' + rows[0].id_usuario);
        res.render('login');
        // res.status(200).send({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).send({ error: 'Error al registrar el usuario' });
        console.log(error);
    }
};


// <!-- <script src="../scripts/registro.js"></script> -->
module.exports = { renderRegister, renderLogin, registerUser };