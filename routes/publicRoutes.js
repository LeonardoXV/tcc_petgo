var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var assert  = require('assert');
var controllerLogin = require('../controller/loginController.js');
var bcrypt =  require('bcrypt-nodejs');//modulo de incriptação
var config = require('../config/config.js');
//var config = process.env.PROD_SECRETJWT
var jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/ppppppp', function(req, res){
  req.body.senha = bcrypt.hashSync(req.body.senha);
  console.log(req.body);
  mongoose.model('Anunciante').findOneAndUpdate({cnpj:req.body.cnpj}, req.body, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    res.redirect("/login#/dashboardprofile");
});
});
// GET login page
router.get('/login', function(req, res, next){
    res.render('mainpage', { title: 'Express' });
});

//Post login page, chama o Controller
router.post('/login', controllerLogin);

//Autenticação do Token
router.post('/authtoken', function(req, res){
    var token = req.body.token || req.headers['accesstoken'] || req.query.token;
    //console.log(token);
    jwt.verify(token, config.jwtSecret, function(error, dec) {
      if (error) {
        return res.json({ type: false, msg: 'Falha na autenticação do Token.' });
      } else {
        var tokenDec = dec;
        return res.json(tokenDec);
      }
  })
});

//GET para a confirmação do request do Anunciante
router.get('/confirmacao', function(req, res, next) {
  res.render('confirmacao', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'Express' });
});

router.get('/chamado/abrir', function(req, res, next) {
  res.render('abrirChamado', { title: 'Express' });
});

router.get('/chamado/findall',function(req, res, next){
  mongoose.model('Chamado').find({},function(err,data){
    if(err){
      //console.log(err);
    }else{
      //console.log(data);
    }
    res.redirect("/");
  });
});

router.post('/chamado/findallBy/',function(req, res, next){
  mongoose.model('Chamado').find({cnpj:req.body.params.cnpj},function(err,data){
    if(err){
    //  console.log(err);
    }else{
      //console.log(data);
    }
    return res.json(data);
  });
});

router.post('/abrir/chamado/',function(req, res) {
  mongoose.model('Chamado').create(req.body.params, function (err, chamado) {
        if (err) {
            res.send("Houve um erro ao inserir no banco de dados.");
        } else {
          res.send("Cadastro efetuado");
        }
  });

});
/*
router.get('/chamado/cnpj/:cnpj', function(req, res, next){
  console.log('Por cnpj');
  mongoose.model('Chamado').findOne({cnpj:req.params.cnpj},{},'busca por cnpj',function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
    }
    res.redirect("/");
  });
});*/

/*router.get('/chamado/nomeFantasia/:nomeFantasia', function(req, res, next){
  console.log('Por nome fantasia');
  mongoose.model('Chamado').findOne({nomeFantasia:req.params.nomeFantasia},{},'busca por cnpj',function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
    }
    res.redirect("/");
  });
});
*/
//Post Insert no banco
router.post('/insert',function(req, res) {
    var hash = bcrypt.hashSync(req.body.senha); //incripta senha
    var anunciante = {
       nomeFantasia:req.body.nome
     , cnpj:req.body.cnpj
     , razaoSocial:req.body.razaoSocial
     , cep:req.body.cep
     , rua:req.body.rua
     , numero:req.body.numero
     , complemento:req.body.complemento
     , bairro:req.body.bairro
     , cidade:req.body.cidade
     , estado:req.body.estado
     , telefone:req.body.telefone
     , email:req.body.email
     , status: {
        ativo: false
        , dataAceitacao:null
        , dataRequisicao: Date()
     }
     , senha:hash
   };
    console.log(anunciante);
    mongoose.model('Anunciante').create(anunciante, function (err, anunciante) {
          if (err) {
              res.send("Houve um erro ao inserir no banco de dados.");
          } else {
              //console.log('POST criação de um anunciante: ' + anunciante);
              res.format({
                html: function(){
                    res.location("anunciantes");
                    res.redirect("/confirmacao");
                },
                json: function(){
                    res.json(anunciante);
                }

            });
          }
    });
});

//busca todos os anunciantes aceitos
router.post('/anunciante/findallAc',function(req, res, next){
  mongoose.model('Anunciante').find({'status.ativo':true},function(err,data){
    if(err){
      //console.log(err);
    }else{
      //console.log(data);
    }
    return res.json(data);
  });

});

//busca todos os anunciantes em espera
router.post('/anunciante/findallEs',function(req, res, next){
  mongoose.model('Anunciante').find({'status.ativo':false},function(err,data){
    if(err){
      //console.log(err);
    }else{
      //console.log(data);
    }
    return res.json(data);
  });

});

//busca todos os chamados
router.post('/chamado/findall',function(req, res, next){
  mongoose.model('Chamado').find({},function(err,data){
    if(err){
      //console.log(err);
    }else{
      //console.log(data);
    }
    return res.json(data);
  });

});

//busca todos os novos chamados
router.post('/chamado/findallNew',function(req, res, next){
  mongoose.model('Chamado').find({emAberto:true},function(err,data){
    if(err){
      //console.log(err);
    }else{
      //console.log(data);
    }
    return res.json(data);
  });

});
//busca anunciante pelo email
router.post('/anunciante/:email', function(req, res, next){
  mongoose.model('Anunciante').findOne({email:req.params.email},{},'busca por email',function(err,data){
    if(err){
      //console.log(err);
    }else{
      //console.log(data);
    }
    return res.json(data);
  });
});

router.post('/chamado/enviar/mensagem', function(req, res, next){
/*  mongoose.model('Anunciante').findOne({email:req.params.email},{},'busca por email',function(err,data){
  });*/
//  console.log(req.body.params.chamado);

  mongoose.model('Chamado').findOneAndUpdate({_id:req.body.params.chamado._id}, req.body.params.chamado, {upsert:true}, function(err, chamado){
  });
});

router.post('/anunciante/status/validar', function(req, res, next){

mongoose.model('Anunciante').findOneAndUpdate({_id:req.body.params.anunciante._id}, req.body.params.anunciante, {upsert:true}, function(err, anunciante){
});

});

module.exports = router;
