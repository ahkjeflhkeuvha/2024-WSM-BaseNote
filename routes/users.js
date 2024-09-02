const express = require('express');
const router = express.Router();
const { ClientInfo } = require('../models'); // models에서 ClientInfo를 가져옴

router.post('/login', async (req, res) => {
  const { _id, pw } = req.body;

  try {
    // `findOne` 메서드를 사용하여 조건에 맞는 데이터 검색
    const user = await ClientInfo.findOne({ where: { _id, pw } });

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

router.post('/signup', async (req, res) => {
  const { _id, pw, name, phonenum} = req.body;
  try {
    const user = await ClientInfo.create({
      _id : _id,
      pw : pw,
      name : name,
      phonenum : phonenum
    });
  
    if(!user) {
      res.status(401).json({ message : '회원가입에 실패했습니다.' })
    } else {
      res.status(200).json({ message : '회원가입 성공', user });
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: '회원가입에 실패', error: err.message });
  }
});

router.get('/findid', async (req, res) => {
  const { name, phonenum } = req.body;
  try {
    const user = await ClientInfo.findOne({
      attributes: ['_id'],
      where: {
        name : name,
        phonenum : phonenum
      }
    });

    if(!user) {
      res.status(401).json({ message : '아이디 찾기에 실패했습니다.' });
    } else {
      res.status(200).json({ message : '아이디 찾기 성공', user });
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: '아이디 찾기 실패', error: err.message });
  }
})

module.exports = router;
