const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const caixaSchema = new Schema({
    valor: { type: Number },
  
    createdAt: { type: Date, default: new Date(Date.now()) }
});

module.exports = mongoose.model('Caixa', caixaSchema)