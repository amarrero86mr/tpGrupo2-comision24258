const express = require('express');
const sequelize = require('./src/db/dbConfig');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.json());
