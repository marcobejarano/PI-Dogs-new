const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Dog = sequelize.define('Dog', {
	id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	image: {
		type: DataTypes.JSON,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	weight: {
		type: DataTypes.JSON,
		allowNull: false
	},
	height: {
		type: DataTypes.JSON,
		allowNull: false
	},
	life_span: {
		type: DataTypes.STRING,
		allowNull: false
	},
	origin: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	timestamps: false,
	tableName: 'dogs'
});

module.exports = Dog;