app.controller('MainController', ['$scope', 'databaseService', function($scope, databaseService){
	console.log('Main controller');
	$scope.allVerifications;

	$scope.init = function(){
		//get all verifications
		databaseService.getAllVerifications()
		.then(function(result){
			console.log('result', result);
			$scope.allVerifications = result;
		})
		.catch(function(error){
			console.log('error', error.message);
		});
	};
}]);