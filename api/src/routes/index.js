const express = require('express');
const router = express.Router();
const {
	getDogs,
	getTemperaments,
	getDogByBreedId,
	getDogByNameQuery,
	postDogs
} = require('../controllers');

router.get('/dogs', getDogs);
router.get('/temperaments', getTemperaments);
router.get('/dogs/:id', getDogByBreedId);
router.get('/search', getDogByNameQuery);
router.post('/dogs', postDogs);

module.exports = router;