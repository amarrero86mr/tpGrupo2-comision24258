const coneccionBD = require('../db/dbConfig.js');


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

const getAllUserByID = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM usuario_tbl WHERE id_usuario = ?'
    
    coneccionBD.query(sql, [id] ,(err, result) => {
        if(err) throw err;

        res.json(result);
    });
};

module.exports = {getAllUser, getAllUserByID}

// exports.getAllUser = async (req, res) => {
//     try {
//       const [rows, fields] = await coneccionBD.query('SELECT * FROM usuario_tbl');
//       res.status(200).json(rows);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
