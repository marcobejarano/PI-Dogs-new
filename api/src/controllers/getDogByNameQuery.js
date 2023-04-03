const axios = require('axios');

const serverUrl = 'http://localhost:3001/api/v1';

// GET /api/v1/search?name=<name>
const getDogByNameQuery = async (req, res) => {
	try {
		const { name } = req.query;
		const response = await axios.get(`${ serverUrl }/dogs`);
		const dogs = response.data;
		const dogsSearched = dogs.filter(dog => {
			const dogToLoweCase = dog.name.toLowerCase();
			const nameToLowerCase = name.toLowerCase();
			return dogToLoweCase.includes(nameToLowerCase);
		});
		if (!dogsSearched.length) {
			res.status(400).send({ error: 'There is no breed name: ${ name }'})
		}
		res.status(200).send(dogsSearched);
	} catch(error) {
		console.error(error.message);
		res.status(500).send({ error: 'Internal server error' });
	}
};

module.exports = getDogByNameQuery;