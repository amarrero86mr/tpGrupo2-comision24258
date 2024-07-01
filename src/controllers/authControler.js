const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const coneccionBD = require('../db/dbConfig.js');

const renderRegister = (req, res) => {
    res.render('register');
};

const renderLogin = (req, res) => {
    res.render('login');
};

const registerUser = async (req, res) => {
    const { nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass, calle, altura, localidad, provincia, cod_postal, piso_dpto } = req.body;
    const hashedPassword = await bcrypt.hash(pass, 10);
// con bcrypt.hash encriptamos el pass que se almacena en la db

    const sql = 'INSERT INTO uiuario_tbl (nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    const sql2 = 'SELECT id_usuario FROM usuario_tbl WHERE num_documento = ? and tel = ?'

    const sql3 = 'INSERT INTO direccion_tbl (id_usuario, calle, altura, localidad, provincia, cod_postal, piso_dpto VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
        const connection = await coneccionBD.getConnection();
        await connection.query(sql, [nombre, apellido, tipo_documento, num_documento, genero, tel, email, hashedPassword]);
        if (connection){
            let id_usuario = await connection.query(sql2, [num_documento, tel])
            console.log(id_usuario)
            await coneccionBD.query(sql2, [id_usuario, calle, altura, localidad, provincia, cod_postal, piso_dpto]);
        
        }
        connection.release();

        res.redirect('/login');
    } catch (error) {
        res.status(500).send(`
            <h2>Internal server error</h2>
            <p>sentimos los inconvenientes, por favor intente nuevamente dentro de uno minutos o comuniquese con el administador</p>
        `); 
        console.log(error)
    }
};

module.exports = { renderRegister, renderLogin, registerUser };