const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const { Dog } = require('../models');

describe('Dog Model', () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true });
	});

	it('should create a new dog', async () => {
		const dog = await Dog.create({
			image: {
				id: "BJa4kxc4X",
				width: 1600,
				height: 1199,
				url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
			},
			name: 'Test Dog',
			weight: {
				imperial: '10 - 15', 
				metric: '5 - 7'
			},
			height: {
				imperial: '10 - 12', 
				metric: '25 - 30'
			},
			life_span: '10 - 12 years',
			origin: 'Test Origin'
		});

		expect(dog.image).toEqual({ 
			id: "BJa4kxc4X",
			width: 1600,
			height: 1199,
			url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg" 
		});
		expect(dog.name).toBe('Test Dog');
		expect(dog.weight).toEqual({
			imperial: '10 - 15', 
			metric: '5 - 7'
		});
		expect(dog.height).toEqual({
			imperial: '10 - 12', 
			metric: '25 - 30'
		});
		expect(dog.life_span).toBe('10 - 12 years');
		expect(dog.origin).toBe('Test Origin');
	});
});