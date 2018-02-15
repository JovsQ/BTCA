app.service('authService', ['$location', '$q', 'databaseService',
	function($location, $q, databaseService){

	var self = this;
	this.ref = firebase.auth();

	this.loginByEmail = function(username, password){
		var deferred = $q.defer();

		self.ref.signInWithEmailAndPassword(username, password).then(function(result){
			if (!result.emailVerified) {
				deferred.reject('email not verified');
			} else {
				deferred.resolve('login success');
			}
		}, function(error){
			deferred.reject(error.message);
		});

		return deferred.promise;
	};
}]);