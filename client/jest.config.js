module.exports = {
	testEnvironment: 'jsdom',
	verbose: true,
    moduleFileExtensions: ['js', 'jsx'],
    transform: {
		"^.+\\.(js|jsx)$": "babel-jest",
        "^.+\\.css$": "jest-transform-stub",
	},
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    testPathIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};