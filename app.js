const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes.js');
const coneccionBD = require('./src/db/dbConfig.js');
const app = express();

dotenv.config();

app.use(express.json());

app.use('/usuarios', userRoutes);

app.get('/', (req,res) => 
    {
        res.status(200).send('esto es el index.html');
    });

const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});