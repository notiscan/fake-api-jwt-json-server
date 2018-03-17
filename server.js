if ((process.env.NODE_ENV || 'development') === 'development') {
  require('dotenv').config();
}

const bodyParser = require('body-parser');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./database.json');

const login = require('./login');
const createPassword = require('./login/create-password');
const forgotPassword = require('./login/forgot-password');
const forgotUsername = require('./login/forgot-username');
const selectUsername = require('./login/select-username');
const sendPin = require('./login/send-pin');
const verifyPin = require('./login/verify-pin');
const authorizeRoutes = require('./login/authorize-routes');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

server.post('/auth/login', login);
server.post('/auth/login/create-password', createPassword);
server.post('/auth/login/forgot-password', forgotPassword);
server.post('/auth/login/forgot-username', forgotUsername);
server.post('/auth/login/select-username', selectUsername);
server.post('/auth/login/send-pin', sendPin);
server.post('/auth/login/verify-pin', verifyPin);

server.use(/^(?!\/auth).*$/, authorizeRoutes);
server.use(router);

server.listen(process.env.PORT || 3000, () => {
  console.log('Run Auth API Server');
});
