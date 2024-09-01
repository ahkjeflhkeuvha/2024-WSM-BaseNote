'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientInfo extends Model {

  }
  ClientInfo.init({
    _id: DataTypes.STRING,
    pw: DataTypes.STRING,
    name: DataTypes.STRING,
    phonenum: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClientInfo',
    tableName : 'client_info'
  });
  return ClientInfo;
};