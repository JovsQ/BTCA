app.controller('MainController', ['$scope', 'databaseService', function($scope, databaseService){
	console.log('Main controller');
	$scope.allVerifications;
	var verified = 'Verified';
	var pending = 'Pending Approval';

	$scope.init = function(){
		//get all verifications
		getAllVerifications();
	};

	var getAllVerifications = function(){
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

	$scope.verified = function(status){
		return status == verified;
	};

	$scope.verifiyId = function(applicationKey, userKey){
		console.log('applicationKey', applicationKey);
		console.log('userKey', userKey);

		databaseService.verifyId(applicationKey, userKey, verified)
		.then(function(result){
			console.log(result);
			getAllVerifications();
		})
		.catch(function(error){
			console.log(error);
		});
	};
}]);