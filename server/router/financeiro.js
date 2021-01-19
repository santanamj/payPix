const financeiroController = require ('./../controllers/financeiro');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();
api.post('/gerarToken', financeiroController.gerarToken);
api.post('/closeCaixa', financeiroController.closeCaixa);
api.get('/getAllPix', financeiroController.getAllPix);
api.get('/getPendenteCob', financeiroController.getPendenteCob);
api.get('/fecharCaixa', financeiroController.fecharCaixa);
api.get('/getpixdate', financeiroController.getpixdate);
api.get('/getCobrancaId/:id', financeiroController.getCobrancaId);
api.get('/getCaixas', financeiroController.getCaixas);
api.get('/searchgetCaixasDate', financeiroController.searchgetCaixasDate)
api.put('/cancelarCobranca', financeiroController.cancelarCobranca);
module.exports = api;