require('dotenv').config();
const axios = require('axios');
const { Temperament } = require('../models')

const apiUrl = 'https://api.thedogapi.com/v1/breeds';
const { API_KEY } = process.env;

const fetchTemperaments = async () => {
	const response = await axios.get(`${ apiUrl }?api_key=${ API_KEY }`);
	const dogs = response.data;
	const temperaments = dogs
	    .map(dog => dog.temperament && dog.temperament.split(', '))
	    .reduce((accumulator, value) => accumulator.concat(value), [])
	    .filter(temperament => temperament && temperament.trim() !== '')
	    .reduce((accumulator, value) => {
	    	if (!accumulator.includes(value)) {
	    		accumulator.push(value);
	    	}
	    	return accumulator;
	    }, [])
	    .sort((a, b) => a.localeCompare(b));
	return temperaments;
};

// GET /api/v1/temperaments
const getTemperaments = async (req, res) => {
	try {
		const temperaments = await fetchTemperaments();
		for (const temperament of temperaments) {
			const existingTemperament = await Temperament.findOne({ where: { name: temperament } });
			if (!existingTemperament) {
				await Temperament.create({ name: temperament });
			}
		}
		const allTemperaments = await Temperament.findAll();
		console.log(allTemperaments.length);
		res.status(200).send(allTemperaments);
	} catch(error) {
		console.error(error.message);
		res.status(500).send({ error: 'Internal server error' });
	}
};

module.exports = getTemperaments;