angular.module('petApp').controller('admCtrlLocation', function($stateParams,$scope, $location, sweet){
    $scope.m="Maria";
    $scope.login = function(admin){
        if(admin.email == "admin" && admin.senha == "admin"){
            $location.path('/painel');
        }
    }
});


(function(window, angular, undefined){
	angular.module('petApp').controller('admCtrl',['$rootScope','$scope', '$http', 'sweet',function($rootScope, $scope, $http, sweet){
     $scope.date = new Date();

     $scope.aprovar = function(vali){
       if(vali==undefined){
         vali = false;
       }


       $scope.anuncianteModal.status.ativo = vali;

       $scope.anuncianteModal.status.dataAceitacao = new Date();
       $http.post("http://localhost:5000/anunciante/status/validar",{params: {anunciante:$scope.anuncianteModal}});

       sweet.show({
					title: '<small>Aceitar Anunciante</small>',
					text: '<span style="color:#000000">O anunciante foi aceito!!!<span>',
					type: 'success',
					confirmButtonText: 'OK',
  					confirmButtonColor: '#e65100',
					html: true
				});

     }


     $scope.showChamadoNovos = function(chamado){
       $rootScope.novoChamado = chamado;
     }

     $scope.showChamadoListagem = function(chamado){
       $rootScope.novoChamado = chamado;
     }

     $scope.sendMessage = function(msg){
       $scope.novoChamado.conversa.push({remetente:"suporte",mensagem:msg});
       $scope.textbox = null;
       $http.post("http://localhost:5000/chamado/enviar/mensagem",{params: {chamado:$scope.novoChamado}});
    }

    $scope.encerrarChamado = function(){
      $scope.novoChamado.emAberto = false;
      $http.post("http://localhost:5000/chamado/enviar/mensagem",{params: {chamado:$scope.novoChamado}});
      sweet.show({
					title: '<small>Chamado</small>',
					text: '<span style="color:#000000">O chamado foi encerrado!!!<span>',
					type: 'success',
					confirmButtonText: 'OK',
  					confirmButtonColor: '#e65100',
					html: true
				});
    }
    $scope.preencher = function(anunciante){
      $rootScope.anuncianteModal=anunciante;
    }
	}]);
})(window, window.angular);
