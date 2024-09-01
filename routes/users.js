const express = require('express');
const { ClientInfo } = require('../models'); // Sequelize에서 생성된 모델을 불러옴

const router = express.Router();

router.post('/login', async (req, res) => {
    const { id, pw } = req.body;

    try {
        // 데이터베이스에서 사용자 정보 조회
        const user = await ClientInfo.findOne({
            where: {
                _id: id,
                pw: pw
            }
        });

        if (user) {
            // 로그인 성공
            res.status(200).json({ message: '로그인 성공' });
        } else {
            res.status(401).json({ message: '로그인 정보가 일치하지 않습니다.' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: '로그인 실패' });
    }
});

module.exports = router;
