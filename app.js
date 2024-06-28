const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes.js');
const { coneccionBD, checkConnection } = require('./src/db/dbConfig.js');
const adminRoutes = require('./src/routes/adminRoutes.js');

const app = express();

dotenv.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());

app.use('/usuarios', userRoutes);

app.use('/admin', adminRoutes);
app.use('/edit', adminRoutes);


app.get('/', (req,res) => 
    {
      res.sendFile(__dirname + '/public/index.html');
      res.status(200);
    });

const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});