if ((process.env.NODE_ENV || 'development') === 'development') {
  require('dotenv').config();
}

const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const mongoose = require('mongoose');
var helmet = require('helmet');

const server = jsonServer.create();
const router = jsonServer.router('./database.json');
const codes = require('./lib/codes');

const login = require('./login');
const createPassword = require('./login/create-password');
const forgotPassword = require('./login/forgot-password');
const forgotUsername = require('./login/forgot-username');
const getAccounts = require('./login/get-accounts');
const sendPin = require('./login/send-pin');
const verifyPin = require('./login/verify-pin');
const authorizeRoutes = require('./login/authorize-routes');
const createAccount = require('./create-account');
const checkUsername = require('./accounts/check-username');
const checkEmail = require('./accounts/check-email');
const robinhood = require('./robinhood');
const robinhoodTest = require('./robinhood-test');

const users = require('./users');
const accounts = require('./accounts');
const merchants = require('./merchants');
const transactions = require('./transactions');

const seed = require('./lib/seed');

const {
  NODE_ENV,
  MONGO_USER,
  MONGO_PASS,
  MONGO_URL,
  MONGO_PORT,
  MONGO_DATABASE_NAME,
  MONGO_DATABASE_CONFIG,
  MASHAPE_HEADER_VALUE,
  MASHAPE_HEADER_KEY
} = process.env;

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}/${MONGO_DATABASE_NAME}${MONGO_DATABASE_CONFIG}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to db');
});

server.use(helmet());

server.use((req, res, next) => {
  if (NODE_ENV === 'development') return next();

  if (req.headers[MASHAPE_HEADER_KEY.toLowerCase()] !== MASHAPE_HEADER_VALUE) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  next();
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(codes.serverError.status).send(codes.serverError);
});

server.use('/robinhood', robinhood);
server.use('/robinhood-test', robinhoodTest);

server.post('/auth/login', login);
server.post('/auth/login/create-password', createPassword);
server.post('/auth/login/forgot-password', forgotPassword);
server.post('/auth/login/forgot-username', forgotUsername);
server.post('/auth/login/get-accounts', getAccounts);
server.post('/auth/login/send-pin', sendPin);
server.post('/auth/login/verify-pin', verifyPin);

server.use('/create-account', createAccount);
server.use('/accounts/check-username', checkUsername);
server.use('/accounts/check-email', checkEmail);

server.use(/^(?!\/auth).*$/, authorizeRoutes);
server.use('/users', users);
server.use('/accounts', accounts);
server.use('/merchants', merchants);
server.use('/transactions', transactions);

server.use('/seed', seed);

server.use(router);

server.listen(process.env.PORT || 3000, () => {
  console.log('Run Auth API Server');
});
