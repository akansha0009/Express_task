const Routes = require("express").Router();
const user = require('../controller/user.controller');

Routes.post('/signup', user.createUser);
Routes.post('/login', user.login);

module.exports = Routes;