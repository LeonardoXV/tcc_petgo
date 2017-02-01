var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var anunciante = new Schema({
    nomeFantasia:String
  , cnpj:String
  , razaoSocial:String
  , cep:String
  , rua:String
  , numero:Number
  , complemento:String
  , bairro:String
  , cidade:String
  , estado:String
  , telefone:String
  , email:String
  , site:String
  , social:String
  , status: {
    ativo:Boolean
    , dataAceitacao:Date
    , dataRequisicao:Date
  }
  , senha:String
});

var Anunciante = mongoose.model('Anunciante', anunciante);

module.exports = anunciante;
