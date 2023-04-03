require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
	POSTGRES_HOST
} = process.env;

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
	host: POSTGRES_HOST,
	dialect: 'postgres',
	logging: false
});

module.exports = sequelize;