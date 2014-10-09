packager('academy.controllers', function() {
	academy.app.controller("RightCtrl", ["$scope", "StudentService", "PassportService", "ViewStateService", function($scope, StudentService, PassportService, ViewStateService) {
		var students = $scope.students = StudentService.students;
		var passports = $scope.passports = PassportService.passports;
		var viewState = $scope.viewState = ViewStateService;

		//TODO we shouldn't actually need this, we might be able to use binding to fix this instead
		$scope.$watchCollection("[passports.length, students.length]", function() {
			viewState.setPassportsFull(students.length >= passports.length);
		});

		this.setPassports = function(list) {
			passports = $scope.passports = PassportService.passports;
		};

		this.error = function(err) {
		};

		PassportService.get().error(this.error).then(this.setPassports);
		$scope.RightCtrl = this;
	}]);
});
