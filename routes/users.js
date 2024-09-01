const express = require('express');
const router = express.Router();
const { ClientInfo } = require('../models');

console.log(ClientInfo)

// 로그인 API 경로
router.post('/login', async (req, res) => {
    const { _id, pw } = req.body;

    try {
        const user = await ClientInfo.findAll({ where: { _id: _id, pw: pw } });

        if (user) {
            res.status(200).json({ message: '로그인 성공' });
        } else {
            res.status(401).json({ message: '로그인 정보가 일치하지 않습니다.' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ id : _id, pw : pw, message: '로그인 실패' });
    }
});

module.exports = router; // router를 제대로 export해야 합니다.
