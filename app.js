const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// const methodOverride = require('method-override'); //dependencia desinstalada
const helmet = require('helmet');
const userRoutes = require('./src/routes/userRoutes.js');
const { coneccionBD, checkConnection } = require('./src/db/dbConfig.js');
const adminRoutes = require('./src/routes/adminRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js')

const app = express();

dotenv.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

// app.use(methodOverride('_method')); // dependensia desinstalada
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: ["*"],
          scriptSrc: ["*", "https://i.postimg.cc"],
          styleSrc: ["*", "'unsafe-inline'"],
          imgSrc: ["*"], // Permitir imágenes desde cualquier origen y datos base64
          objectSrc: ["*"],
          upgradeInsecureRequests: [],
      },
  })
);

app.use(express.json());
app.use(cookieParser());


app.get('/', (req,res) => 
  {
    res.sendFile(__dirname + '/public/index.html');
    res.status(200);
});

app.use('/usuarios', userRoutes);
app.use('/admin', adminRoutes);
app.use('/edit', adminRoutes);
app.use('/delete', adminRoutes);
app.use('/', authRoutes);
  


const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});