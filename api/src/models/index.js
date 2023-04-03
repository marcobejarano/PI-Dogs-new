const sequelize = require('../db');
const Dog = require('./Dog');
const Temperament = require('./Temperament');
const DogTemperament = require('./DogTemperament');

Dog.belongsToMany(Temperament, { through: DogTemperament });
Temperament.belongsToMany(Dog, { through: DogTemperament });

const synchronizeModels = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection to the database has been established successfully.');
		await sequelize.sync({ force: true });
		console.log('All models were synchronized successfully.');
	} catch(error) {
		console.error('Unable to connect to the database:', error);
	}
}

module.exports = { Dog, Temperament, DogTemperament, synchronizeModels };