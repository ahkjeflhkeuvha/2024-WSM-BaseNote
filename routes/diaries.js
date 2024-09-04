const express = require('express');
const router = express.Router();
const { Diary } = require('../models/diary');

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

router.get('/basenote/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // userId가 일치하는 diaries 데이터를 조회
        const diaries = await Diary.findAll({ where: { userId: id } });

        if (!diaries.length) {
            return res.status(404).json({ success: false, message: 'Diary not found' });
        }

        return res.json({ success: true, diaries: diaries });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
