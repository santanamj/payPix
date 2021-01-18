const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const acessoSchema = new Schema({
   
    username: {type: String},
    idUser: {type: String},
    createdAt: { type: Date, default: new Date(Date.now()) }
    
    
});

module.exports = mongoose.model('Acesso', acessoSchema)