const route = require('express').Router();
const login = require('../controller/userlogin');
const registration = require ('./../controller/registration');
const authantication = require('./../middleware/authanitcation');
const logout = require('./../controller/logout');
const forgetPassword = require('../controller/forgetpassword');

route.post('/reg',registration.userRegistration);
route.post('/login',login.userLogin);
route.get('/logout',authantication.authantication,logout.logout);
route.post('/forgetpassword',forgetPassword.forgetPassword)

module.exports = route;