const express = require('express');
const router = express.Router();
const ClientInfo = require('../models/clientinfo');  // 모델 이름 확인

// 로그인 API
router.post('/login', async (req, res) => {
  const { _id, pw } = req.body;
  try {
    const user = await ClientInfo.findOne({
      attributes: ['name'],
      where: {
        _id: _id,
        pw: pw
      }
    });

    console.log(user);
    if (!user) {
      res.status(401).json({ message: '로그인 정보가 일치하지 않습니다.' });
    } else {
      res.status(200).json({ success: true, userId: _id });  // userId 반환
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: '로그인 실패', error: err.message });
  }
});

// 아이디 찾기 API (GET 요청)
router.get('/findid', async (req, res) => {
  const { name, phonenum } = req.query;
  try {
    const user = await ClientInfo.findOne({
      attributes: ['_id'],
      where: {
        name: name,
        phonenum: phonenum
      }
    });

    if (!user) {
      res.status(401).json({ message: '아이디 찾기에 실패했습니다.' });
    } else {
      res.status(200).json({ success: true, user });
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: '아이디 찾기 실패', error: err.message });
  }
});

// 회원가입 API (POST 요청)
router.post('/signup', async (req, res) => {
  const { _id, pw, name, phonenum } = req.body;
  try {
    const user = await ClientInfo.create({
      _id: _id,
      pw: pw,
      name: name,
      phonenum: phonenum
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: '회원가입에 실패했습니다.', error: err.message });
  }
});

module.exports = router;
