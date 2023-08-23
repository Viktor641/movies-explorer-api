const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(express.json());

app.use(routes);

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
