app.controller('MainController', ['$scope', '$uibModal', 'databaseService', 
	function($scope, $uibModal, databaseService){

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
			console.log('get all verifications', result);
			$scope.allVerifications = result;
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

	$scope.viewImage = function(front, back){
	    var modalInstance = $uibModal.open({
	      animation: true,
	      component: 'viewImageComponent',
	      resolve: {
	          front: function(){
	            return front;
	          },
	          back: function(){
	          	return back;
	          }
	      }
	    });

	    modalInstance.result.then(function () {
	      $scope.getAllTransactions();
	    }, function () {
	    });
	  };
}]);