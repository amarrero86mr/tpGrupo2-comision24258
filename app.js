const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

dotenv.config();

app.use(express.json());

app.use('/usuarios', userRoutes);

app.get('/', (req,res) => 
    {
        res.status(200).sendFile(__dirname + '/index.html');
    });

const Port = 3306;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});