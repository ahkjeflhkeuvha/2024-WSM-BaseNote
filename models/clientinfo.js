'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClientInfo = sequelize.define('ClientInfo', {
    _id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    pw: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phonenum: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false, // timestamps 옵션 비활성화
    tableName: 'client_info' // 테이블 이름 명시 (기본값은 모델 이름의 복수형)
  });
  return ClientInfo;
};
