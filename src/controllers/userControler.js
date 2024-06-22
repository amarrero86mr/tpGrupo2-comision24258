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

module.exports = getAllUser;

// exports.getAllUser = async (req, res) => {
//     try {
//       const [rows, fields] = await coneccionBD.query('SELECT * FROM usuario_tbl');
//       res.status(200).json(rows);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
