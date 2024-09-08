const express = require('express');
const router = express.Router();
const db = require('../models'); // 올바른 경로

// findOne 사용 예시

router.post('/login', async (req, res) => {
  const { _id, pw } = req.body;
  console.log(_id, pw)
  try {
    const user = await db.ClientInfo.findOne({
      where: {
        _id: _id,
        pw: pw
      }
    });

    if (!user) {
      res.status(401).json({ message: '로그인 정보가 일치하지 않습니다.' });
    } else {
      res.status(200).json({ success: true, userinfo : user });  // userId 반환
    }
  } catch (err) {
    res.status(500).json({ message: '로그인 실패', error: err.message });
  }
});

// 아이디 찾기 API (GET 요청)
router.get('/findid', async (req, res) => {
  const { name, phonenum } = req.body;
  console.log(name, phonenum)
  try {
    const user = await db.ClientInfo.findOne({
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
    res.status(500).json({ message: '아이디 찾기 실패', error: err.message });
  }
});

// 회원가입 API (POST 요청)
router.post('/signup', async (req, res) => {
  const { _id, pw, name, phonenum } = req.body;
  try {
    const user = await db.ClientInfo.create({
      _id: _id,
      pw: pw,
      name: name,
      phonenum: phonenum
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: '회원가입에 실패했습니다.', error: err.message });
  }
});

module.exports = router;
