const mysql = require('mysql2');
require('dotenv').config();
// /promise
const coneccionBD = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:3306,
  waitForConnections:true,
  connectionLimit: 5,
  queueLimit: 0
});
// const coneccionBD = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   // port: 3306
// });
coneccionBD.connect((err) => {
  if (err) {
    console.error('error de coneccion con dataBase: ', err);
    return;
  }
  console.log('coneccion con dataBase exitosa');
})

module.exports = coneccionBD;
