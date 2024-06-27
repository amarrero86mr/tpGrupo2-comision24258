const coneccionBD = require('../db/dbConfig.js');

const getAllItems = (req, res) => {
    const sql = 'SELECT * FROM item_tbl';
    coneccionBD.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            throw err
        };

        // res.json(results);
        console.log(results);
        return res.render('admin', (dataItems = results ));
    });
};

module.exports = getAllItems