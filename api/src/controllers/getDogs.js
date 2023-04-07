require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament, DogTemperament } = require('../models');

const apiUrl = 'https://api.thedogapi.com/v1/breeds';
const { API_KEY } = process.env;

const fetchDogsFromDogApi = async () => {
	try {
		const response = await axios.get(`${ apiUrl }?api_key=${ API_KEY }`);
		const dogsData = response.data;
		const dogsFromDogApi = dogsData.map(dog => {
			const { id, image, name, weight, height, life_span, temperament } = dog;
			const dogDetails = { id, image, name, weight, height, life_span, temperament: temperament || '', origin: 'Dog API' };
			return dogDetails;
		});
		return dogsFromDogApi;
	} catch(error) {
		console.log(error.message);
		throw new Error('Failed to fetch dogs from the Dog API');
	}
};

const fetchDogsFromDb = async () => {
	try {
		const dogsFromDb = await Dog.findAll();
		const promises = dogsFromDb.map(async (dog) => {
			const { id, image, name, weight, height, life_span, origin } = dog;
			const dogTemperaments = await DogTemperament.findAll({ where: { DogId: id } });
			let temperamentsArray = [];
			for (const dogTemperament of dogTemperaments) {
				const temperamentRecord = await Temperament.findOne({ where: { id: dogTemperament.TemperamentId } });
				const temperament = temperamentRecord.name;
				temperamentsArray.push(temperament);
			}
			const temperamentsList = temperamentsArray.join(', ');
			const dogDetails = { id, image, name, weight, height, life_span, temperament: temperamentsList, origin };
			return dogDetails;
		});
		const dogsFromDbWithTemperaments = await Promise.all(promises);
		return dogsFromDbWithTemperaments;
	} catch(error) {
		console.log(error.message);
		throw new Error('Failed to fetch dogs from the Database');
	}
};

// GET /api/v1/dogs
const getDogs = async (req, res) => {
	try {
		const dogsFromDogApi = await fetchDogsFromDogApi();
		const dogsFromDb = await fetchDogsFromDb();
		const allDogs = dogsFromDogApi.concat(dogsFromDb);
		res.status(200).send(allDogs);
	} catch(error) {
		console.error(error.message);
		res.status(500).send({ error: 'Internal server error' });
	}
};

module.exports = getDogs;