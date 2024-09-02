require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


const user = require('./routes/users');
const { sequelize } = require('./models');
app.use('/users', user);


app.listen(port, () => {
    console.log(`Example app listeing on port ${port}`)
});