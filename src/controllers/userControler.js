const coneccionBD = require('../db/dbConfig.js');

// metodo get solicita a la db todos los usuarios
const getAllUser = (req, res) => {
    const sql = 'SELECT * FROM usuario_tbl';
    coneccionBD.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            throw err
        };

        res.json(results);
    });
};
// metodo get solicita a la db un usuario por parametro (id)
const getAllUserByID = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM usuario_tbl WHERE id_usuario = ?'
    
    coneccionBD.query(sql, [id] ,(err, result) => {
        if(err) throw err;

        res.json(result);
    });
};

const postNewUser = (req,res) => {
    const {admin_user, nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass } = req.body;

    const sql = 'INSERT INTO usuario_tbl (admin_user, nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    coneccionBD.query(sql, [admin_user, nombre, apellido, tipo_documento, num_documento, genero, tel, email, pass], (err, result) => {
    
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Error creating user' });
        }
        
        res.json({
                mensaje : "Usuario Creado con EXITO",
                idUsuario : result.insertId
            });
    });    
};




module.exports = {getAllUser, getAllUserByID, postNewUser}

// exports.getAllUser = async (req, res) => {
//     try {
//       const [rows, fields] = await coneccionBD.query('SELECT * FROM usuario_tbl');
//       res.status(200).json(rows);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
