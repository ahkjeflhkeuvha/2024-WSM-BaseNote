const sequelize = require('../config/config'); // DB 설정 불러오기

const ClientInfo = require('./clientinfo');  // 수정된 모델 불러오기
const Diary = require('./diary');  // Diary 모델 불러오기

module.exports = {
  sequelize,
  ClientInfo,
  Diary
};


