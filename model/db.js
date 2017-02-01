var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/PetGo');
//mongoose.connect(process.env.PROD_MONGODB);


var db = mongoose.connection;

//Conexão com o banco MongoDB
db.on('error', function (err) {
   console.log('Erro ao conectar ao Banco de Dados', err);
});

db.once('open', function () {
   console.log('Conexão com o Banco de Dados realizada');
});
