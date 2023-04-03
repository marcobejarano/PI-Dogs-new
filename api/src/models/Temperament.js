const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Temperament = sequelize.define('Temperament', {
	id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	timestamps: false,
	tableName: 'temperaments'
});

module.exports = Temperament;