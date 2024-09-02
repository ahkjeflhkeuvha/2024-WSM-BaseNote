const express = require('express');
const router = express.Router();
const { ClientInfo } = require('../models'); // models에서 ClientInfo를 가져옴

router.post('/login', async (req, res) => {
  const { _id, pw } = req.body;
    console.log(req.body)
  try {
    const user = await ClientInfo.findOne({ where: { _id: _id, pw: pw } });
    console.log('User found:', user);
    if (!user) {
      res.status(401).json({ message: '로그인 정보가 일치하지 않습니다.' });
    } else {
      res.status(200).json({ message: '로그인 성공', user });
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: '로그인 실패', error: err.message });
  }
});

module.exports = router;
