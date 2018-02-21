app.service('databaseService', ['$q', function($q){
	var self = this;

	this.usersRef = firebase.database().ref('users/');
	this.verificationsRef = firebase.database().ref('verifications/');

	this.getAllVerifications = function(){
		var deferred = $q.defer();
		var verifications = [];

		self.verificationsRef.orderByKey().once('value', function(snapshot){
			var promises = [];
			snapshot.forEach(function(childSnapshot){
				var verification = {};
				verification = childSnapshot.val();
				verification.key = childSnapshot.key;
				self.getUserByKey(verification.id)
				.then(function(result){
					verification.user = result;
					verifications.push(verification);
					if (verifications.length == snapshot.numChildren()) {
						deferred.resolve(verifications);
					}
				})
				.catch(function(error){
					deferred.reject(error.message);
				});
			});
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

	this.verifyApplication = function(vericationKey, status){
		var deferred = $q.defer();
		var ref = firebase.database().ref('verifications/' + vericationKey);

		ref.once('value', function(snapshot){
			var verification = snapshot.val();

			verification.id_verification_status = status;

			var updateVerification = {};
			updateVerification[snapshot.key] = verification;
			self.verificationsRef.update(updateVerification, function(){
				deferred.resolve(verification);
			});
		}, function(error){
			deferred.reject(error.message);
		});

		return deferred.promise;
	};

	this.verifyId = function(vericationKey, userKey, status){
		var deferred = $q.defer();
		var promises = [];

		promises.push(self.verifyApplication(vericationKey, status));
		promises.push(self.verifyUser(userKey, status));

		$q.all(promises)
		.then(function(result){
			deferred.resolve('Verified');
		})
		.catch(function(error){
			deferred.reject(error.message);
		});

		return deferred.promise;
	};

	this.verifyUser = function(userKey, status){
		var deferred = $q.defer();
		var ref = firebase.database().ref('users/' + userKey);

		ref.once('value', function(snapshot){
			var user = snapshot.val();

			user.id_verification_status = status;

			var updateUser = {};
			updateUser[snapshot.key] = user;
			self.usersRef.update(updateUser, function(){
				deferred.resolve(user);
			});
		}, function(error){
			deferred.reject(error.message);
		});

		return deferred.promise;
	};
	
}]);