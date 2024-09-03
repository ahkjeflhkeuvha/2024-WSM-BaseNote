const express = require('express');
const router = express.Router();
const { ClientInfo, Diary } = require('../models');

// 로그인 API 경로
router.post('/login', async (req, res) => {
    const { _id, pw } = req.body;

    try {
        const user = await ClientInfo.findOne({ where: { _id: _id, pw: pw } });

        if (!user) {
            res.status(401).json({ message: '로그인 정보가 일치하지 않습니다.' });
        } else {
            // 로그인 성공시 사용자 아이디로 다이어리 페이지로 이동
            res.status(200).json({ message: '로그인 성공', redirectUrl: `/diaries/${_id}` });
        }
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: '로그인 실패', error: err.message });
    }
});

// 사용자의 다이어리를 가져오는 API
router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
      const diaries = await Diary.findAll({ where: { user_id: userId } });

      if (diaries.length === 0) {
          return res.status(404).json({ message: '다이어리가 존재하지 않습니다.' });
      }

      res.status(200).json({ diaries });
  } catch (err) {
      console.error('Error fetching diaries:', err);
      res.status(500).json({ message: '다이어리 불러오기 실패', error: err.message });
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
  const { name, phonenum } = req.query;
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
