'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db.js'); // Sequelize 인스턴스 가져오기

class Diary extends Model {}

Diary.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    bestPlayer: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    startingPitcher: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    result: {
        type: DataTypes.STRING(10), // '승', '패', '무' 등을 저장
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Diary',
    tableName: 'diaries', // 테이블 이름 설정
    timestamps: false // timestamps 옵션을 사용하여 createdAt, updatedAt을 사용하지 않도록 설정
});

module.exports = Diary;
