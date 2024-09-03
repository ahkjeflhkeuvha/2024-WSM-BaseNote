const express = require('express');
const router = express.Router();
const { Diary } = require('../models'); // Diary 모델을 가져옵니다

// 일기 저장 API
router.post('/save', async (req, res) => {
    const { userId, date, bestPlayer, startingPitcher, location, result, title, content } = req.body;

    try {
        // Diary 모델을 사용하여 데이터베이스에 새로운 일기 추가
        const newDiary = await Diary.create({
            userId: userId,
            date: date,
            bestPlayer: bestPlayer,
            startingPitcher: startingPitcher,
            location: location,
            result: result,
            title: title,
            content: content
        });

        res.status(201).json({ message: '일기 저장 성공', diary: newDiary });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: '일기 저장 실패', error: err.message });
    }
});

// 특정 사용자의 일기 목록 조회 API
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Diary 모델을 사용하여 특정 사용자의 모든 일기 가져오기
        const diaries = await Diary.findAll({
            where: { userId: userId }
        });

        if (!diaries.length) {
            return res.status(404).json({ message: '일기를 찾을 수 없습니다.' });
        }

        res.status(200).json(diaries);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: '일기 조회 실패', error: err.message });
    }
});

module.exports = router;
