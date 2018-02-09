app.service('databaseService', ['$q', function($q){
	var self = this;

	this.usersRef = firebase.database().ref('users/');
	this.verificationsRef = firebase.database().ref('verifications/');

	this.getAllVerifications = function(){
		var deferred = $q.defer();
		var verifications = [];

		self.verificationsRef.orderByKey().once('value', function(snapshot){
			deferred.resolve(snapshot.val());
		});

		return deferred.promise;
	};

	this.getUserByKey = function(key){
		var deferred = $q.defer();
		var ref = firebase.database().ref('users/' + key);

		ref.once('value', function(snapshot){
			deferred.resolve(snapshot.val());
			console.log('user', snapshot.val());
		}, function(error){
			deferred.reject(error.message);
		});

		return deferred.promise;
	};
	
}]);