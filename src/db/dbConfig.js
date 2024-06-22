const mysql = require('mysql2/promise');
require('dotenv').config();

const coneccionBD = mysql.createConnection({
  host:'bjhtasgcrg335gemekbd-mysql.services.clever-cloud.com',
  user:'u8gcdzylz1a1c0m4',
  password:'GJZOWkt16dmUVmjXKjp5',
  name:'bjhtasgcrg335gemekbd',
  port: 3306
});

// const coneccionBD = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   // port: 3306
// });

// coneccionBD.connect((err) => {
//   if (err) {
//     console.error('error de coneccion con dataBase: ', err);
//     return;
//   }
//   console.log('coneccion con dataBase exitosa');
// })

module.exports = coneccionBD;