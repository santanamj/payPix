const rp = require('request-promise-native');
const Txid = require ('./../model/txid');
const Caixa =  require ('./../model/caixa');
const charge =  require ('./charge');
const moment = require("moment");
const getPix = require ('./allpix');
const pendeteCob = require('./pendentecob');
const getCob = require ('./allcob');
const getToken = require ('./getToken');
const PIXiD = require ('./onepix');
const PixCancel = require ('./devolucao');
const pixHook = require ('./notificacao');
const { PIX } = require('gpix/dist');
var axios = require("axios");
var fs = require("fs");
const https = require("https");
var certificado = fs.readFileSync("./private/prod279021.p12");
const newCert = new https.Agent({
  pfx: certificado,
  passphrase: ""
});
exports.gerarToken =  async (req,res,next) => {
  console.log('valor', req.body);
  const valor = req.body.valor;
  const client = req.body.nameClient;
    const tx = new Txid ({
      dadoClient: 'msantana'
    });
   
    tx.save((err, tx)=>{
       if(err){
         return (err)
       }else{         
         return tx
       }
      })
      console.log('tx', tx.numberTx)
    const idOp = await tx.numberTx;   
    nome = [{
      "infoAdicionais": "Nome",
      "valor": "MSantana"
     }]  
    const dadospix = {
        "calendario": {
            "expiracao": 3600
          },
          "infoAdicionais": [
            {
              "nome": "client",
              "valor": client
            }
          ],
          "valor": {
            "original": valor
          },
          "chave": "df68f73b-63eb-4f5b-b682-a9d4dc797dda",
          "solicitacaoPagador": 'Serviço de desenvolvimento de software'
    }  

  const dadosCobranca = JSON.stringify(dadospix);   
  const dadosCharge = await charge(dadosCobranca, idOp);
  let dpix = PIX.dinamic();
  dpix.setReceiverName('Minha Empresa LTDA')
  dpix.setReceiverCity('Rio Preto')
  dpix.setLocation(dadosCharge.location)
  dpix.setAmount(parseFloat(dadosCharge.valor.original)) // some PSP are not recovering the amount through the charge. Then temporarily enter the amount to avoid problems.
  console.log('\nBRCODE dinamic - GPIX >>>>\n', String(dpix.getBRCode()));
  const qrcode = String(dpix.getBRCode());
  const dataPix = {
    dados: dadosCharge,
    qrcode: qrcode
  }
    res.json(dataPix)
}
exports.getAllPix = async (req, res )=>{
 // const allPix = await getPix();
  const allCob = await getCob(); 
  try {
    res.json({ cob: allCob});
  } catch(e) {
    console.log('error:', e.message);
  } 
}
exports.getPendenteCob = async (req, res )=>{  
  const allCob = await pendeteCob();
  try {
    res.json({cob: allCob});
  } catch(e) {
    console.log('error:', e.message);
  } 
}
exports.fecharCaixa = async (req, res)=>{
  const allCob = await getPix();
  try {
    res.json({pix: allCob});
  } catch(e) {
    console.log('error:', e.message);
  } 
}
exports.closeCaixa = (req, res)=>{
  const caixa  = new Caixa({
    valor: req.body.valor
  })
  caixa.save((err, caixa)=>{
    if(err){
      res.json({success: false})
    }else{
      console.log(caixa)
      res.json({success: true})
    }
  })
}
exports.getCaixas = (req, res)=>{
  Caixa.find({}, (err, caixas)=>{
   res.json(caixas)
  })
}
exports.searchgetCaixasDate = (req, res, next)=>{    
  
  const datasB = JSON.parse(req.query.buscaDate); 
  
  console.log('data', datasB)
  Caixa.find({'createdAt':{$in:datasB}}, (err, caixas)=>{
      console.log(caixas)
      res.json(caixas)
  }).limit(35)
}
const PixDate = async (token, init, end)=>{
  // /const url = `https://api-pix.gerencianet.com.br/v2/pix/?inicio=${init}&fim=${end}&devolucaoPresente=false`;
  const url = `https://api-pix.gerencianet.com.br/v2/pix?inicio=${init}T00:00:00Z&fim=${end}T23:59:59Z&devolucaoPresente=false`;
  let options = {
   method: 'GET',
   url: url,    
   headers: {            
     authorization: token,
     'Content-Type': 'application/json',  
       },
   httpsAgent: newCert,
   json: true 
 } 
  return axios(options)
     .then((response)=> { 
      console.log(response.data.pix)
       return (response.data.pix)
     })
     .catch((err) =>{     
      console.log(err.response);
       return err.response
     });
}
exports.getpixdate = async (req, res)=>{
  console.log(req.query)
  const dateDay = moment(new Date(req.query.dateInit)).format('YYYY-MM-DD');
  const endDate = moment(new Date(req.query.dataEnd)).format('YYYY-MM-DD');
  const init = dateDay;
  const end = endDate;
  const token = await getToken(); 
  const allPix = await PixDate(token, init, end);  
  try {
    res.json(allPix);
  } catch(e) {
    console.log('error:', e.message);
  } 
}

exports.getCobrancaId = async (req, res)=>{
  const txid = req.params.id;
  const pixId = await PIXiD(txid);
  let dpix = PIX.dinamic();
  dpix.setReceiverName('Minha Empresa LTDA')
  dpix.setReceiverCity('Rio Preto')
  dpix.setLocation(pixId.location)
  dpix.setAmount(parseFloat(pixId.valor.original)) // some PSP are not recovering the amount through the charge. Then temporarily enter the amount to avoid problems.
  console.log('\nBRCODE dinamic - GPIX >>>>\n', String(dpix.getBRCode()));
  const qrcode = String(dpix.getBRCode());
  const dataPix = {
    dados: pixId,
    qrcode: qrcode
  }
  console.log(dataPix)
    res.json(dataPix)
}
exports.getHooks = async(req, res)=>{
  const hooks = await pixHook();
  console.log(hooks)
}
exports.cancelarCobranca = async(req, res)=>{
  console.log(req.body);  
  const dadostx2id = req.body.t2id;
  const id = req.body.id;
  const valor = {
    valor: req.body.valor
  }
  const Cancel =  await PixCancel(dadostx2id, id, valor);  
  res.json(Cancel)
}