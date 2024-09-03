const express = require('express');
const router = express.Router();
const { Diary } = require('../models');

// 일기 저장 API
router.post('/save', async (req, res) => {
    const { userId, date, bestPlayer, startingPitcher, location, result, title, content } = req.body;

    try {
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

module.exports = router;
