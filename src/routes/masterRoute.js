const masterRoute = require('express').Router();
const user = require('./user');
const wallet = require('./walletRoute');

masterRoute.use('/user',user);
masterRoute.use('/wallet',wallet);

module.exports = masterRoute;