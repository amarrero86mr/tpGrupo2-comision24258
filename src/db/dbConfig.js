//traemos el paquete de mysql y dontenv
const { createPool } = require('mysql2/promise');
require('dotenv').config();

// creammos y configuramos el pool de coneccion
const coneccionBD = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});


//testeamos la conceccion
// coneccionBD.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error de conexión con la base de datos:', err);
//     return;
//   }
//   console.log('Conexión con la base de datos exitosa');
//   connection.release();
// });

coneccionBD.getConnection()
    .then(connection => {
        console.log('Connected to the database');
        connection.release();
    })
    .catch(error => {
        console.log('Error connecting to the database', error);
    });


module.exports = coneccionBD;

// const coneccionBD = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port:3306,
//   waitForConnections:true,
//   connectionLimit: 5,
//   queueLimit: 0
// });

// coneccionBD.connect((err) => {
//   if (err) {
//     console.error('error de coneccion con dataBase: ', err);
//     return;
//   }
//   console.log('coneccion con dataBase exitosa');
// })