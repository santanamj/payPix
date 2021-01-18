const jwt = require ('jsonwebtoken');
const config = require ('../config/database');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/register', AuthenticationControler.register);
api.post('/login',  AuthenticationControler.login);
api.get('/checkEmail/:email', AuthenticationControler.checkEmail);
api.get('/checkUsername/:username', AuthenticationControler.checkUsername);
api.get('/profile', AuthenticationControler.use, AuthenticationControler.profile);
//api.put('/updateUser/:id', AuthenticationControler.use, AuthenticationControler.updateUser);

module.exports = api;