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
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    bestPlayer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pitcher: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stadium: {
        type: DataTypes.STRING,
        allowNull: true
    },
    winLose: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Diary',
    tableName: 'diaries', // 테이블 이름 설정
    timestamps: false
});

module.exports = Diary;
