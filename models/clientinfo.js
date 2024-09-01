'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientInfo extends Model {

  }
  ClientInfo.init({
    _id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    pw: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    phonenum : {
      type : DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'ClientInfo',
    tableName : 'client_info',
    timestamps: false
  });
  return ClientInfo;
};