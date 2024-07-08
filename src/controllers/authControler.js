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

const logout = (req,res) => {
    const token = ''
    res.cookie('token', token, { httpOnly: false });
    res.redirect('/index.html'); 
}

const register = async (req, res) =>{

    const {nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass, calle, altura, localidad, provincia, cod_postal, piso_dpto} = req.body; // tomamos los capos de del formulario /registro
    
    const sqlInsertUsuario = 'INSERT INTO usuario_tbl (nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    const sqlSelectUsuario = 'SELECT id_usuario FROM usuario_tbl WHERE email = ?';

    const sqlInsertDireccion = 'INSERT INTO direccion_tbl (id_usuario, calle, altura, localidad, provincia, cod_postal, piso_dpto) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    const hashedPassword = bcrypt.hashSync(pass, 8); //creamos el hashtad del pass
    
    try {
        const connection = await coneccionBD.getConnection();
        await connection.beginTransaction(); // iniciar la transacción o transmision de datos
        
        // Verificar si el email ya existe
        const [existingUser] = await connection.query(sqlSelectUsuario, [email]);
        if (existingUser.length > 0) {
            throw new Error('Email already exists');
        }
        
        await connection.query(sqlInsertUsuario, [nombre, apellido, tipo_documento, num_documento, genero, tel, email, hashedPassword]); // agrega el usuario en la tabla usuario

        const [rows] = await connection.query(sqlSelectUsuario, [email]); // solicitar el id_usuario a partir del email
        const id_usuario = rows[0].id_usuario;

        await connection.query(sqlInsertDireccion, [id_usuario, calle, altura, localidad, provincia, cod_postal, piso_dpto]); // insertar la dirección junto al id_usuario
        
        await connection.commit(); // confirmar la transacción
        connection.release(); // Liberar la conexión de vuelta al pool

        res.status(200)
        res.redirect('login'); // redireccionamos a login

    } catch (err) {
        res.status(500).send('Internal server error');
        console.log(err);
    }
};

const login = async (req, res) => {
    const { email, pass } = req.body;
    const sql = 'SELECT * FROM usuario_tbl WHERE email = ?';

    try {
        const connection = await coneccionBD.getConnection();
        const [rows] = await connection.query(sql, [email]);
        connection.release();

        if (rows.length > 0) {
            const user = rows[0];
            const isMatch = await bcrypt.compare(pass, user.pass);
            // console.log(user);
            if (isMatch) {
                const token = jwt.sign(
                    { id: user.id_usuario, email: user.email, admin_user: user.admin_user }, // Incluye admin_user en el token
                    process.env.JWT_SECRET,
                    { expiresIn: '3h' }
                );
                
                res.cookie('token', token, { httpOnly: true });
                res.redirect('/index.html');
                
            } else {
                res.status(401).send('Contraseña incorrecta');
            }
        } else {
            res.status(404).send('Email incorrecto');
        }
    } catch (err) {
        res.status(500).send('Internal server error');
        console.log('Error de loging: ', err);
    }
}


module.exports = { renderLogin, renderRegister, register, login, logout };