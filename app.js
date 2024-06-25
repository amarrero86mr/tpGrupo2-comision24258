const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes.js');
const { coneccionBD, checkConnection } = require('./src/db/dbConfig.js');
const app = express();

dotenv.config();

app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());


app.use('/usuarios', userRoutes);

app.get('/', (req,res) => 
    {
      res.sendFile(__dirname + '/public/index.html');
      res.status(200);
    });

const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});