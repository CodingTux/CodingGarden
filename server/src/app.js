const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.NODE_ENV === 'development' ? process.env.MONGO_ENDPOINT_DEVELOPMENT : process.env.MONGO_ENDPOINT_PRODUCTION, {useNewUrlParser: true, useUnifiedTopology: true});

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to coding garden backend'
  });
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
