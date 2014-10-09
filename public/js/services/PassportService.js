packager('academy.factory', function() {
	var passportList = [];

	this.passports = academy.app.factory('PassportService', ["$http", "$q", function ($http, $q) {
		function get () {
			var success = function(data) {
				put(JSON.parse(data.passports));
				return passportList;
			};

			return $http.get(academy.routes.passports).success(success);
		}

		function put (list) {
			passportList.length = 0;
			_.each(list, function(passport) {
				passportList.push(list);
			});
		}
		return {
			passports: passportList,
			get: get,
			put: put
		};
	}]);
});
