const coneccionBD = require('../db/dbConfig.js');

const getAllItems = (req, res) => {
    const sql = 'SELECT * FROM item_tbl';
    coneccionBD.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            throw err
        };

        // res.json(results);
        res.render('admin', (dataItems = results ));
        console.log(dataItem);
    });
};

const getItemById = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM item_tbl WHERE id_item = ?'
    
    coneccionBD.query(sql, [id] ,(err, result) => {
        if(err) throw err;
        if(result == ''){
            res.send({'item':'no encontrado'});
            console.log(result)
        } else {
            console.log(result);
            return res.render('edit', (dataItem = result[0]));
        }
    });
};

module.exports = { getAllItems, getItemById};