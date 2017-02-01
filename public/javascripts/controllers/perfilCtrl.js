(function(window, angular, undefined){
	angular.module('petApp').controller('perfilCtrl',['$rootScope','$scope', '$http', '$location',function($rootScope, $scope, $http, $location){
    var request = $http.post('http://localhost:5000/anunciante/' + $scope.token.email).success(function(dados){
      $scope.nomeFantasia = dados.nomeFantasia;
      $scope.razaoSocial = dados.razaoSocial;
			$scope.rua = dados.rua;
			$scope.numero = dados.numero;
			$scope.cnpj = dados.cnpj;
			$scope.cidade = dados.cidade
			$scope.email = dados.email;
			$scope.estado = dados.estado;
			$scope.telefone = dados.telefone;
			$scope.cep = dados.cep;
			$scope.site = dados.site;
			$scope.social = dados.social;
    });
  }]);

})(window, window.angular);
