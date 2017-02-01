var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chamado = new Schema({
  cnpj:String,
  nomeFantasia:String,
  dataDeCriacao: { type: Date, default: new Date() },
  titulo: String,
  conversa:{type:Array,default:[]},
  emAberto: {type:Boolean, default:true}
});
var Chamado = mongoose.model('Chamado',chamado);
module.exports = chamado;
