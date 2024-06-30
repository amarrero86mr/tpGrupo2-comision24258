const coneccionBD = require('../db/dbConfig.js');

// metodo get asincronico con renderizacion ejs
const getAllItems = async (req, res) => { // al metodo get... le asignamos una funcion asincronica
    const sql = 'SELECT * FROM item_tbl';

    try {
        const connection = await coneccionBD.getConnection(); // asignamos por la espera de la coneccion
        const [rows] = await connection.query(sql); // creamos una constante para almasenar el resitlado asincronuico de la peticion spl
        
        connection.release(); //liveramos el pool de coneccion
        res.render('admin', {dataItems: rows}); // respondemos renderizando admin.ejs a la vez que le pasamos dataItems como propiedad de render
        
    
    } catch (err){
        // tomamos el error y devolvemos una respuesta por pantalla y el error por consola
        res.status(500).send(`
            <h2>Internal server error</h2>
            <p>sentimos los inconvenientes, por favor intente nuevamente dentro de uno minutos o comuniquese con el administador</p>
        `); 
        console.log(err);
    }
};

// metodo get por id asincronico con renderizacion edit.ejs
const getItemById = async (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM item_tbl WHERE id_item = ?'
    
    try {
        const connection = await coneccionBD.getConnection(); // asignamos por la espera de la coneccion
        const [rows] = await connection.query(sql, [id]); // creamos una constante para almasenar el resitlado asincronuico de la peticion spl

        if(!rows[0]){
            return res.send('Item no encontrado'); //maneja la ausencia de id
        } else {
            connection.release(); //liveramos el pool de coneccion
            res.render('edit', {dataItem: rows[0]}); // respondemos renderizando admin.ejs a la vez que le pasamos dataItem como propiedad de render
        }
    
    } catch (err){
        res.status(500).send(`
            <h2>Internal server error</h2>
            <p>sentimos los inconvenientes, por favor intente nuevamente dentro de uno minutos o comuniquese con el administador</p>
        `); 
        console.log(err);
    }
};

module.exports = { getAllItems, getItemById};