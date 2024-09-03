const express = require('express');
const router = express.Router();
const { Diary, ClientInfo } = require('../models');

// 특정 사용자가 작성한 모든 일기 조회
router.get('/diaries/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await ClientInfo.findOne({ where: { _id: userId } });
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        const diaries = await Diary.findAll({ where: { userId } });
        if (diaries.length === 0) {
            res.status(404).json({ message: '일기가 없습니다.' });
        } else {
            res.status(200).json({ diaries });
        }
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ message: '일기 조회 실패', error: err.message });
    }
});

module.exports = router;
