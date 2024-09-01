const pool = require('../db/db');
const router = require('express').Router();

router.post('/login', (req, res) => {
    let {id, pw} = req.body;
    pool.query('SELECT * FROM client_info WHERE _id = ? AND pw = ?', [id, pw], (err, result) => {
        if(err){
            console.error(err.message)
            res.status(500).json({ message : '로그인 실패' })
        }
        else {
            res.status(200).json({ message : '로그인 성공' })
        }
    })
})