var express = require('express');
var router = express.Router();
var publicRoutes = require('./publicRoutes.js');
var anunciantesRoutes = require('./anuncianteRoutes.js');
//var admRoutes = require('./admRoutes.js');

router.use('/', publicRoutes); //Rotas publicas

router.use('/dashboard',anunciantesRoutes); //Rotas privadas, acessadas via TOKEN

//router.use('/api/v1', require('./routes/api')); //Rotas private da API
 
module.exports = router;
