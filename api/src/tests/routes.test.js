require('dotenv').config();
const session = require('supertest');
const axios = require('axios');
const app = require('../app');
const agent = session(app);

describe('Route: GET /api/v1/dogs', () => {
	it('responds with status 200', async () => {
		const response = await agent.get('/api/v1/dogs');
		expect(response.status).toBe(200);
	});
	it('responds with a list of objects with the properties: ' + 
		'id, image, name, weight, height, life_span, temperament, origin', async () => {
		const response = await agent.get('/api/v1/dogs');
		const dogs = response.body;

		expect(Array.isArray(dogs)).toBe(true);

		dogs.forEach(dog => {
			expect(dog).toHaveProperty('id');
			expect(dog).toHaveProperty('image');
			expect(dog).toHaveProperty('name')
			expect(dog).toHaveProperty('weight');
			expect(dog).toHaveProperty('height');
			expect(dog).toHaveProperty('life_span');
			expect(dog).toHaveProperty('temperament');
			expect(dog).toHaveProperty('origin');
		});
	});
});

describe('Route: GET /api/v1/dogs/:id', () => {
	it('responds with status 200', async () => {
		const response = await agent.get('/api/v1/dogs/1');
		expect(response.status).toBe(200);
	});
	it('responds with an object with the properties: ' + 
		'id, image, name, weight, height, life_span, temperament, origin', async () => {
		const response = await agent.get('/api/v1/dogs/1');
		const dog = response.body;

		expect(dog).toHaveProperty('id');
		expect(dog).toHaveProperty('image');
		expect(dog).toHaveProperty('name')
		expect(dog).toHaveProperty('weight');
		expect(dog).toHaveProperty('height');
		expect(dog).toHaveProperty('life_span');
		expect(dog).toHaveProperty('temperament');
		expect(dog).toHaveProperty('origin');
	});
	it('responds with status code 400 if the dog is not found', async () => {
		const response = await agent.get('/api/v1/dogs/1000');
		expect(response.status).toBe(400);
	});
});