var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/config.js');
//var config = process.env.PROD_SECRETJWT
var jwt = require('jsonwebtoken');

//middleware / bloqueio das rotas
router.use(function (req, res, next) {
  //Verifica se há um token recebido via Header, query ou no corpo do request
  var token = req.body.token || req.headers['accesstoken'] || req.query.token;
  console.log(token)
  //Se houver o token, faz a verificação de autenticidade.
  if (token) {
    /* Verifica se o token recebido é válido*/
    jwt.verify(token, config.jwtSecret, function(error, dec) {
      if (error) { // erro na decodificação do token
        return res.json({ autenticação: false, msg: 'Falha na autenticação do Token.' });
      } else {
        /*Token válido libera as rotas privadas e armazena o token */
        req.dec = dec;
        next();
      }
    });
  } else {
    /*Caso o token não encontrado, retorna para o /login*/
    return res.status(403).send({
        autenticação: false,
        msg: 'Token não encontrado. Acesso Negado'
    });

  }

});


//Routas privadas só acessadas depois da verificação do token
/*router.get('/', function(req, res, next){
    res.json({ page: "dashboard"});
});*/

router.get('/chamados', function(req, res, next){
    res.json({ page: "chamados"});
});

module.exports = router;
