const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Dog, Temperament, DogTemperament } = require('../models');

// POST /api/v1/dogs
const postDogs = async (req, res) => {
	try {
		const dog = req.body;
		const { imageUrl, name, minWeight, maxWeight, minHeight, maxHeight,
		    minLifeSpan, maxLifeSpan, temperament } = dog;
		if(!imageUrl || !name || !minWeight || !maxWeight || !minHeight || !maxHeight || 
			!minLifeSpan || !maxLifeSpan || temperament.length === 0) {
			return res.status(400).send({ error: 'Missing fields' })
		}

		const alreadyExistingBreed = await Dog.findOne({ where: { name } });
		if (alreadyExistingBreed) {
			return res.status(400).send({ error: 'Dog breed already exists in the database'});
		}

		const image = {};
		image.id = uuidv4();
		image.width = 1600;
		image.height = 1200;
		image.url = imageUrl;

		const weight = {};
		weight.metric = `${ minWeight } - ${ maxWeight }`;
		weight.imperial = Math.floor(minWeight * 2.20462) + ' - ' + Math.ceil(maxWeight * 2.20462);

		const height = {};
		height.metric = `${ minHeight } - ${ maxHeight }`;
		height.imperial = Math.floor(minHeight / 2.54) + ' - ' + Math.ceil(minHeight / 2.54);

		const dogId = uuidv4();

		const temperamentRecords = await Promise.all(
			temperament.map(async (temperamentElement) => {
				const temperamentRecord = await Temperament.findOne({ where: { name: temperamentElement } });
				return temperamentRecord;
			})
		);

		const newDog = await Dog.create({
			id: dogId,
			image,
			name,
			weight,
			height,
			life_span: `${ minLifeSpan } - ${ maxLifeSpan }`,
			origin: 'Database'
		});

		await Promise.all(
			temperamentRecords.map(async (temperamentRecord) => {
				await DogTemperament.create({
					DogId: dogId,
					TemperamentId: temperamentRecord.id
				});
			})
		);

		res.status(201).send(newDog);
	} catch(error) {
		console.error(error.message);
		res.status(500).send({ error: 'Error when trying to create the dog' });
	}
};

module.exports = postDogs;