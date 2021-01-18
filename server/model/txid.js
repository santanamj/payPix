const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstwxyz', 26);
const daclient = ''
const txidSchema = new Schema({
    dadoClient: { type: String },
    tx:
    {
        type: String,
        default: () => nanoid(), dadoClient: String
    },
    createdAt: { type: Date, default: new Date(Date.now()) }
});
txidSchema.virtual('numberTx').get(function () {
    return this.dadoClient + this.tx;
}, 'unique');
module.exports = mongoose.model('Txid', txidSchema)
