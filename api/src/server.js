require('dotenv').config()
const app = require('./app');
const { synchronizeModels } = require('./models');

const { SERVER_HOST, SERVER_PORT } = process.env;

app.listen(SERVER_PORT, async () => {
	await synchronizeModels();
	console.log(`Server is running and listening at http://${ SERVER_HOST }:${ SERVER_PORT}`);
});