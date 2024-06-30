const coneccionBD = require('../db/dbConfig');

// metodo get asincronico solicita a la db todos los usuarios utilizando una declaracion asincronica
const getAllUser = async (req, res) => {
    const sql = 'SELECT * FROM usuario_tbl';
    try {
        const connection = await coneccionBD.getConnection() //genera la coneccion
        const [rows] = await connection.query(sql); // genera la peticion 
        connection.release(); // libera y cierra la coneccion
        res.json(rows); // devuelve la respuesta de la peticion
    } catch {
        res.status(500).send('Internal server error'); 
    }
};

// metodo get asincronico solicita a la db un usuario por parametro (id)
const getAllUserByID = async (req, res) => {
    const {id} = req.params; // toma la id de la url
    const sql = 'SELECT * FROM usuario_tbl WHERE id_usuario = ?' //sentencia sql a enviar
    try {
        const connection = await coneccionBD.getConnection(); // genera la coneccion y espaera por ella
        const [rows] = await coneccionBD.query(sql, [id]); // envia ña sentencia sql junto con el parameto id y espera por la respuesta
        if(!rows[0]){
            return res.send({'usuario':'no encontrado'}); //maneja la ausencia de id
        } else {
        connection.release()
        res.json(rows); // devuelve el resultado de la db
        console.log(rows[0])
        }    
    } catch {
        res.status(500).send('Internal server error'); 
    }
};

// metodo post asincronico para generar un nuevo usuario
const postNewUser = async (req,res) => {
    const {admin_user, nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass } = req.body;
    const sql = 'INSERT INTO usuario_tbl (admin_user, nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const connection = await coneccionBD.getConnection();
        const rows = await coneccionBD.query(sql, [admin_user, nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass])

        if (!rows[0].affectedRows) {
            console.error('Error inserting user:');
            return res.status(500).json({ error: 'Error creating user'});
        } else {
        res.json({
                mensaje : "Usuario Creado con EXITO",
                idUsuario : rows[0].id_usuario
            });
        } 
    }  catch {
        res.status(500).send('Internal server error');
    }
};

// falta cambiar a asincronico

const putEditUser = (req, res) => {
    const {id} = req.params;
    const {admin_user, nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass } = req.body;
    const sql = 'UPDATE usuario_tbl SET admin_user=?, nombre=?, apellido=?, tipo_documento=?, num_documento=?, genero=?, tel=?, email=?, pass=? WHERE id_usuario=?'
    
    coneccionBD.query(sql, [admin_user, nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass, id], (err, result) => {
        if(err){
            console.error('Error editing user:', err);
            throw err;
        } else {
        res.json({
            mensaje : "Usuario EDITADO con EXITO"
        });
        console.log(result);
        }
    });
};


// falta cambiar a asincronico


const deleteUserByID = (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM usuario_tbl WHERE id_usuario = ?'
    
    coneccionBD.query(sql, [id] ,(err, result) => {
        if(err) throw err;
        if(result.affectedRows == 0){
            res.send({'usuario':'no encontrado'});
            console.log(result)
        } else {
        res.json({
            mensaje: "usuario Eliminado"
        });
        }
    });
};



module.exports = {getAllUser, getAllUserByID, postNewUser, putEditUser, deleteUserByID}