const express = require('express');
const router = express.Router();
const db = require('../models'); // 여기서 모델을 가져옵니다

// 일기 저장 API
router.post('/save', async (req, res) => {
    const { userId, date, bestPlayer, startingPitcher, location, result, title, content } = req.body;

    try {
        const newDiary = await db.Diary.create({
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
        res.status(500).json({ message: '일기 저장 실패', error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const diaries = await db.Diary.findAll({ where : { id : id}});
        console.log(diaries)
        if (!diaries.length) {
            return res.status(404).json({ success : false, message : 'Diary not found' });
        }
        
        return res.json({ success : true, diaries : diaries })
    }
    catch (err) {
        return res.status(500).json({ success:false, message : 'Server error' })
    }
}) 

router.get('/basenote/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // ID가 일치하는 diaries 데이터를 모두 조회
        const diaries = await db.Diary.findAll({ where: { userId: id } });
        if (!diaries.length) {
            return res.status(404).json({ success: false, message: 'Diary not found' });
        }

        return res.json({ success: true, diaries: diaries });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

const axios = require('axios');
const cheerio = require('cheerio');

// KBO 경기 일정 크롤링 API
router.get('/schedule', async (req, res) => {
    const url = 'https://www.koreabaseball.com/Schedule/Schedule.aspx';
    console.log(url)
    try {
        const { data } = await axios.get(url);
        console.log(data)
        const $ = cheerio.load(data);
        const games = [];

        $('.tbl > tbody > tr').each((index, element) => {
            const date = $(element).find('.day').text().trim();  // 날짜 추출
            const teams = $(element).find('.play').text().trim(); // 팀 정보 추출
            if (date && teams) {
                games.push({ date, teams });
            }
        });

        res.json(games);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch schedule' });
    }
});

module.exports = router;
