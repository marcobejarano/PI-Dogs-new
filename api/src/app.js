const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

const app = express();

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use('/api/v1/', router);

module.exports = app;