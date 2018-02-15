app.controller('LoginController', ['$location', '$scope', 'authService',
	function($location, $scope, authService){

	$scope.loginByEmail = function(email, password){
		console.log('login by email');
		if (typeof email != 'undefined' && typeof password != 'undefined') {
			authService.loginByEmail(email, password)
			.then(function(result){
				console.log(result, firebase.auth().currentUser);
			})
			.catch(function(error){
				console.log(error);
			});
		}		
	};
}]);