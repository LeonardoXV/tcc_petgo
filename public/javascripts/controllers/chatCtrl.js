(function(window, angular, undefined){
	angular.module('chat').controller('chatCtrl',['$rootScope','$scope', '$http',function($rootScope, $scope, $http){

		var socket = window.io('127.0.0.1:5001');
		var vm = this;
		vm.dados = undefined;
		vm.name = undefined;
		vm.messages = [];

		window.onload = function(){
			var token = localStorage.getItem('token');
			var request = $http.get('http://localhost:5000/authtoken?token=' + token).success(function(dados){
				vm.dados = dados;
				socket.emit('set-name',dados.email);
			}).error({//error from request
			});

		}
		$scope.m="Maria";
		window.onbeforeunload = function(){
			socket.emit('end',vm.name);
		}

		socket.on('receive-message', function(msg){
			$scope.$apply(function(){
				vm.messages.push(msg);
			});
		});

		$scope.sendMessage = function(msg,name){
			var newMessage = {
				user:vm.dados.email,
				id:vm.id,
				message:msg
			}
			socket.emit('new-message',newMessage);
		}


		$scope.setName = function(name){
			vm.name = name;
			socket.emit('set-name',name);
		}

		$scope.get = function(){
			var token = localStorage.getItem('token');
			var request = $http.post('http://localhost:5000/authtoken?token=' + token).success(function(dados){
				console.log(dados);
			}).error({//error from request
			});
			/*tokenService.auth(token).success(function (data) {
				console.log(data.type);
            });*/
		}
	}]);



})(window, window.angular);
