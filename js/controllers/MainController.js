app.controller('MainController', ['$scope', 'databaseService', function($scope, databaseService){
	console.log('Main controller');
	$scope.allVerifications;

	$scope.init = function(){
		//get all verifications
		databaseService.getAllVerifications()
		.then(function(result){
			$scope.allVerifications = result.val();
		})
		.catch(function(error){
			console.log('error', error.message);
		});
	};

	$scope.preview = function(verification){
		console.log('verification', verification);
	};

	$scope.verifiyId = function(verification){
		console.log('verification', verification);
	};
}]);