var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
//var config = process.env.PROD_SECRETJWT
var anun = require('../model/schemas/anunciante.js');
var bcrypt =  require('bcrypt-nodejs');//modulo de incriptação


module.exports = function (req, res, next){
    /* Verificar se o token existe (header) redirecionar para o /dashboard,
        se não existir redirecionar para o /login
    */

     var Anunciante = mongoose.model('Anunciante', anun);
     //Verifica email e senha no banco de dados
     Anunciante.findOne({email: req.body.email}, function(err, anunciante) {
        if (err) {
            res.json({
                type: false,
                data: "Erro" + err
            });
        } else {
            //Criação do Token
            if (anunciante) {
                if(bcrypt.compareSync(req.body.senha, anunciante.senha)){
                    if(!anunciante.status.ativo){//!anunciante.status.ativo
                        res.json({
                            status: "O seu cadastro está sendo avaliado!"});
                    } else {
                        //Criação do token com base no email e na senha
                        var payload = {
                            nomeFantasia: anunciante.nomeFantasia,
                            email: anunciante.email,
                            cnpj: anunciante.cnpj
                        }

                        var token = jwt.sign(payload, config.jwtSecret, {
                        expiresIn: '1h'  //Validade de 1 hora
                        });
                        //Redireciona para o dashboard do usuário
                        res.json({
                            type: true,
                            tokenUser: token
                        });
                    }
                } else {
                    res.json({
                        type: false,
                        data: "Senha inválida"
                    });
                }
            } else {
                //Email/Senha inválidos
                //Redireciona para o /login
                //res.redirect('/login');
                res.json({
                    type: false,
                    data: "E-mail/Senha inválidos"
                });
            }
        }
    });
}
