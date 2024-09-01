const pool = require('../db/db');
const router = require('express').Router();

router.post('/login', (req, res) => {
    let {id, pw} = req.body;
})