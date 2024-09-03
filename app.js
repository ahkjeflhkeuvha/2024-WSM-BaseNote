require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // JSON 형식의 본문을 파싱합니다


const user = require('./routes/users');
app.use('/users', user);

const diaryRouter = require('./routes/diaries'); // diaries 라우터를 가져옵니다
app.use('/diaries', diaryRouter); // /diaries 경로에 대한 요청을 diaryRouter로 처리합니다


app.listen(port, () => {
    console.log(`Example app listeing on port ${port}`)
});