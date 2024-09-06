'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClientInfo = sequelize.define('ClientInfo', {
    _id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    pw: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    phonenum: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true // 고유한 값 설정
    },
    image: {
      type: DataTypes.BLOB, // 이미지 데이터를 저장할 Blob 필드
      allowNull: true // 이미지가 필수가 아니므로 allowNull: true
    },
    team: {
      type: DataTypes.STRING(100), // 팀 필드, 최대 100자
      allowNull: true // 팀 정보도 필수가 아니므로 allowNull: true
    }
  }, {
    timestamps: false, // createdAt, updatedAt 필드를 사용하지 않음
    tableName: 'client_info' // 실제 테이블 이름을 명시적으로 설정
  });

  return ClientInfo;
};
