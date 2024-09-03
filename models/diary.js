'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db.js'); // DB 설정 가져오기

class Diary extends Model {}

Diary.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    startingPitcher: {
        type: DataTypes.STRING(50),
    },
    location: {
        type: DataTypes.STRING(100),
    },
    result: {
        type: DataTypes.STRING(10),
    },
    content: {
        type: DataTypes.TEXT,
    }
}, {
    sequelize,
    modelName: 'Diary',
    tableName: 'diaries',
    timestamps: false,
});

module.exports = Diary;
