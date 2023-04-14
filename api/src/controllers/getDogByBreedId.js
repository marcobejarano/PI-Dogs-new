const axios = require('axios');

const serverUrl = 'http://localhost:3001/api/v1';

// GET /api/v1/dogs/:id
const getDogByBreedId = async (req, res) => {
	try {
		const { id } = req.params;
		let fixedId = '';
		if (id.length <= 3) {
			fixedId = +id;
		} else {
			fixedId = id;
		}
		const response = await axios.get(`${ serverUrl }/dogs`);
		const dogs = response.data;
		const dogSearched = dogs.find(dog => dog.id === fixedId);
		if (!dogSearched) {
			return res.status(400).send({ error: 'Dog breed was not found' });
		}
		res.status(200).send(dogSearched);
	} catch(error) {
		console.error(error.message);
		res.status(500).send({ error: 'Internal server error' });
	}
};

module.exports = getDogByBreedId;