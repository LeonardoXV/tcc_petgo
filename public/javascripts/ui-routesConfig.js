angular.module('petApp').config( function($stateProvider, $urlRouterProvider /*,loginService*/){
     //var token = localStorage.getItem('token');
     $stateProvider
        //Rota anunciante Login
        .state('login', {
            url: '/',
            templateUrl: 'login.html'
        })
        //Rota login administrador
        .state('admin', {
            url: '/admin',
            templateUrl: 'admin/loginadmin.html',
            controller: 'admCtrl'
        })
        //Rota Painel administrador (NAVBAR)
        .state('painel', {
            url: '/painel',
            abstract: true,
            views: {
                '': { templateUrl: 'admin/navbar.html' }
                //'center@dashboard': { templateUrl: 'center.html' }
            },
            //Load Lazy scripts
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('javascripts/lib/nav.js');
                    }]
                }
            })
        //Rota Home do dashboard
        .state('painel.home' ,{
            url: '',
            templateUrl: 'admin/dashboard.html'
        })

        //Rota do chamado selecionado
        .state('painel.chat-chamado' ,{
            url: '/chamado',
            templateUrl: 'admin/chat-chamado.html',
             params:{
             chamado: { objectProperty: "test_not_default1" },
            }
        })
        //Rota Gerenciar anunciante
        .state('painel.gerenciar-anunciante' ,{
            url: '/anunciante/gerenciar',
            templateUrl: 'admin/gerenciar-anunciante.html'
        })
        //Rota Listagem-anunciantes
        .state('painel.listagem-anunciante' ,{
            url: '/anunciante/listagem',
            templateUrl: 'admin/listagem-anunciantes.html'
        })
        //Rota Listagem-chamados
        .state('painel.listagem-chamados' ,{
            url: '/chamado/listagem',
            templateUrl: 'admin/listagem-chamados.html'
        })
        //Rota novos-anunciantes
        .state('painel.listagem-novos-anunciante' ,{
            url: '/anunciante/listagem/novos',
            templateUrl: 'admin/novos-anunciantes.html'
        })
        //Rotas novos-chamados
        .state('painel.listagem-novos-chamados' ,{
            url: '/chamado/listagem/novos',
            templateUrl: 'admin/novos-chamados.html'
        })


        /* ---- ROTAS ANUNCIANTE ---- */

        //Rota Dashboard anunciante (NAVBAR)
        .state('dashboard', {
            url: '/dashboard',
            abstract: true,
            views: {
                '': { templateUrl: 'navbar.html' }
                //'center@dashboard': { templateUrl: 'center.html' }
            },
            //Load Lazy scripts
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('javascripts/lib/nav.js');
                    }]
                }
            })
              /*,
            resolve: function(token){
                loginService.authToken(token).success(function (token) {
                    if(token.type){
                        //Redirect to dashboard
                        return token.type;
                    } else {
                        //Redirect to login
                    }
                }).error();
            }*/
        //Rota Dashboard.home anunciante
        .state('dashboard.home' ,{
            url: '',
            templateUrl: 'dashboard.html'
        })
        //Rota Dashboard.chamados anunciantes
        .state('dashboard.chamados' ,{
            url: '/ticket',
            templateUrl: 'meuschamados-usuario.html'
        })
        //Rota dashboard.profile anunciante
        .state('dashboard.profile' ,{
            url: '/profile',
            templateUrl: 'gerenciarperfil-usuario.html'
        }).state('dashboard.chat' ,{
            url: '/msg',
            templateUrl: 'chat.html'
        });
        //$urlRouterProvider.otherwise('/');
});
