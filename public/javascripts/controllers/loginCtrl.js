angular.module('petApp').controller('loginCtrl',function($scope, loginService, config, $location, sweet){

	$scope.login = function(anunciante){
		loginService.login(anunciante).success(function (dados){

			if(dados.tokenUser){
				localStorage.setItem('token', dados.tokenUser);
				$location.path('/dashboard');
			} else if (!dados.data){
				sweet.show({
					title: '<small>Seu cadastro está sendo analisado!</small>',
					text: '<span style="color:#000000">Em breve seu login será disponibilizado<span>',
					type: 'warning',
					confirmButtonText: 'OK',
  					confirmButtonColor: '#e65100',
					html: true
				});
			} else if(!dados.type){
				sweet.show({
					title: '<small>Login e/ou senha inválidos</small>',
					text: '<span style="color:#000000">Tente novamente...<span>',
					type: 'error',
					confirmButtonText: 'OK',
  					confirmButtonColor: '#e65100',
					html: true
					});
				$location.path('/');
			}
		});
	}

	$scope.logout = function(){
		//Destriuir o token
		localStorage.removeItem('token');
	}

});
