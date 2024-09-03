const express = require('express');
const router = express.Router();
const { Diary } = require('../models'); // Diary 모델을 가져옵니다

// 일기 저장 API
router.post('/save', async (req, res) => {
    const { date, bestPlayer, pitcher, stadium, winLose, title, content } = req.body;

    try {
        // Diary 모델을 사용하여 데이터베이스에 새로운 일기 추가
        const newDiary = await Diary.create({
            date: date,
            bestPlayer: bestPlayer,
            pitcher: pitcher,
            stadium: stadium,
            winLose: winLose,
            title: title,
            content: content
        });

        res.status(201).json({ message: '일기 저장 성공', diary: newDiary });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: '일기 저장 실패', error: err.message });
    }
});

module.exports = router;
