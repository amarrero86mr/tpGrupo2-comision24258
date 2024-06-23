const mysql = require('mysql2');
require('dotenv').config();

const coneccionBD = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar la conexión antes de exportar el pool
coneccionBD.getConnection((err, connection) => {
  if (err) {
    console.error('Error de conexión con la base de datos:', err);
    return;
  }
  console.log('Conexión con la base de datos exitosa');
  connection.release();
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