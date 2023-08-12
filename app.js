require('dotenv').config();
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorPath = require('./utils/errorPath');

const { PORT = 3000 } = process.env;
const errorHandler = require('./middlewares/errorHandler');
const { createUserValid, loginValid } = require('./middlewares/validate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.use(requestLogger);

app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);

app.use(auth, userRouter);
app.use(auth, movieRouter);

app.use('/*', auth, errorPath);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
