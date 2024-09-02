'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db.js'); // Sequelize 인스턴스 가져오기

class ClientInfo extends Model {}

ClientInfo.init({
  _id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
  },
  pw: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  phonenum: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  }
}, {
  sequelize,
  modelName: 'ClientInfo',
  tableName: 'client_info',
  timestamps: false,
});

module.exports = ClientInfo;
