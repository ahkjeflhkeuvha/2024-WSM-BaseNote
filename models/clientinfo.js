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
    timestamps: false // timestamps 옵션 비활성화
  });
  return ClientInfo;
};
