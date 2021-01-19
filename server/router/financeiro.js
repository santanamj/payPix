const financeiroController = require ('./../controllers/financeiro');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();
api.post('/gerarToken', financeiroController.gerarToken);
api.post('/closeCaixa', AuthenticationControler.use, financeiroController.closeCaixa);
api.get('/getAllPix', AuthenticationControler.use, financeiroController.getAllPix);
api.get('/getPendenteCob', AuthenticationControler.use, financeiroController.getPendenteCob);
api.get('/fecharCaixa', AuthenticationControler.use, financeiroController.fecharCaixa);
api.get('/getpixdate', AuthenticationControler.use, financeiroController.getpixdate);
api.get('/getCobrancaId/:id', financeiroController.getCobrancaId);
api.get('/getCaixas', AuthenticationControler.use, financeiroController.getCaixas);
api.get('/searchgetCaixasDate', AuthenticationControler.use, financeiroController.searchgetCaixasDate)
api.put('/cancelarCobranca', financeiroController.cancelarCobranca);
module.exports = api;