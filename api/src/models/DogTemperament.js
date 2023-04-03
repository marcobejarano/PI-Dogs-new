const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const DogTemperament = sequelize.define('DogTemperament', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	}
}, {
	timestamps: false,
	tableName: 'dogtemperaments'
});

module.exports = DogTemperament;