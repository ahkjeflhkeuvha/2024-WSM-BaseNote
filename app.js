require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const user = require('./routes/users');
app.use('/users', user);

const admin = require('./routes/admins');
app.use('/admins', admin);

app.listen(port, () => {
    console.log(`Example app listeing on port ${port}`)
});