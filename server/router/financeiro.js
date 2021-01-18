const financeiroController = require ('./../controllers/financeiro');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();
api.post('/gerarToken', financeiroController.gerarToken);
api.get('/getAllPix', financeiroController.getAllPix);
api.get('/getpixdate', financeiroController.getpixdate);
api.get('/getCobrancaId/:id', financeiroController.getCobrancaId);
api.put('/cancelarCobranca', financeiroController.cancelarCobranca);
module.exports = api;