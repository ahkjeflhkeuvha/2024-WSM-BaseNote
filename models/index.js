const sequelize = require('../config/config');   // DB 설정을 불러옴
const ClientInfo = require('./clientinfo');      // 모델 정의 파일을 불러옴

const db = {
  sequelize,
  ClientInfo: ClientInfo // 모델을 직접 사용
};

module.exports = db;
