const rp = require('request-promise-native');
var fs = require("fs");
const Txid = require ('./../model/txid');
const https = require("https");
var http = require('http');
var axios = require("axios");
var certificado = fs.readFileSync("./private/prod279021.p12");
const newCert = new https.Agent({
  pfx: certificado,
  passphrase: ""
});
const getToken = async ()=>{
 

  var credenciais = {
      client_id: "Client_Id_092ec20b492f2b39a134230f5fcd11b908ef4587",
      client_secret: "Client_Secret_57b78e17003385f05e8073a3a57fb55bbf10bc61",
    };
    
    var data = JSON.stringify({ grant_type: "client_credentials" });
    var data_credentials = credenciais.client_id + ":" + credenciais.client_secret;
    
    // Codificando as credenciais em base64
    var auth = Buffer.from(data_credentials).toString("base64");
    
    const agent = new https.Agent({
      pfx: certificado,
      passphrase: ""
    });
    var config = {
      method: "POST",
      url: "https://api-pix.gerencianet.com.br/oauth/token",
      headers: {
        Authorization: "Basic " + auth,
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
      data: data,
    };
  return  axios(config)
    .then(function (response) {
      
      return "Bearer " + response.data.access_token
    })
    .catch(function (error) {
      console.log(error);
    });
}

const charge = async (dadosCobranca, idOp, req, res, next  )=>{ 
  console.log('idOp', idOp)
 const auth = await getToken(); 
 const url = `https://api-pix.gerencianet.com.br/v2/cob/${idOp}` 
 let options = {
  method: 'PUT',
  url: url,    
  headers: {            
    authorization: auth,
    'Content-Type': 'application/json',  
      },
  httpsAgent: newCert,
  data: dadosCobranca  
}  

 return axios(options)
    .then((response)=> { 
      console.log(response.data)
      return (response.data)
    })
    .catch((err) =>{     
     console.log(err.response.data);
      return err.response.data
    });


  
}


module.exports = charge;
