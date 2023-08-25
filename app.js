const express = require('express');
const mongoose = require('mongoose');
const generalError = require('./middlewares/generalError');

const routes = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(generalError);

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
