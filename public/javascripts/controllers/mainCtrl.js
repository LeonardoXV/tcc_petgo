(function(window, angular, undefined){
	angular.module('petApp').controller('mainCtrl',['$rootScope','$scope', '$http',function($rootScope, $scope, $http){
		$scope.trigger = function () { $('#modal1').openModal(); }

		$scope.date = new Date();

		$scope.sendReport = function(){

			$http.post('http://localhost:5000/anunciante/' + $scope.token.email).success(function(dados){
				$http.post("http://localhost:5000/abrir/chamado/", {  params: { titulo: $scope.titulo, nomeFantasia:dados.nomeFantasia, cnpj:dados.cnpj}});
			});
		}


		$scope.showChamado = function(chamado){
			$rootScope.novoChamado = chamado;
		}

		$scope.sendMessage = function(msg){
			$scope.novoChamado.conversa.push({remetente:$scope.novoChamado.nomeFantasia,mensagem:msg});
			$http.post("http://localhost:5000/chamado/enviar/mensagem",{params: {chamado:$scope.novoChamado}});
	 }

		window.onload = function(){

			var token = localStorage.getItem('token');

			//busca os dados to token
			var request = $http.post('http://localhost:5000/authtoken?token=' + token).success(function(dados){
				
				$rootScope.token = dados;

				//busca todos os chamados do usuario logado
				$http.post("http://localhost:5000/chamado/findallBy/", {  params: {cnpj:dados.cnpj}}).success(function(dados){$scope.chamados = dados;});

				//busca todos os chamados de todos os anunciantes
				$http.post("http://localhost:5000/chamado/findall/").success(function(dados){$scope.Todoschamados = dados;});

				//busca todos os chamados abertos
				$http.post("http://localhost:5000/chamado/findallNew/").success(function(dados){$scope.TodoschamadosNovos = dados;});

				//busca todos os Anunciantes aceitos
				$http.post('http://localhost:5000/anunciante/findallAc').success(function(dados){$scope.anunciantesAceitos = dados;});

				//busca todos os anunciantes em espera
				$http.post('http://localhost:5000/anunciante/findallEs').success(function(dados){$scope.anunciantesEspera = dados;;});


			}




			   ).error({});



		}



	}]);
})(window, window.angular);
