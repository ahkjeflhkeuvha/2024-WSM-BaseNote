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
  }, {});
  // ClientInfo.associate = function(models) {
  //   // associations can be defined here
  // };
  return ClientInfo;
};
