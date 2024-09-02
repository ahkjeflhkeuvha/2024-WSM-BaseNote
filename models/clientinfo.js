'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db.js'); // Sequelize 인스턴스 가져오기

const ClientInfo = sequelize.define('ClientInfo', {
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
  },
}, {
  tableName: 'client_info',
  timestamps: false, // createdAt, updatedAt 사용하지 않음
});

module.exports = ClientInfo;