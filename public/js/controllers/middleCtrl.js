packager('academy.controllers', function() {
	academy.app.controller("MiddleCtrl", ["$scope", "StudentService", "ViewStateService", "StudentDataService", function($scope, StudentService, ViewStateService, StudentDataService) {
		var students = $scope.students = StudentService.students;
		var viewState = $scope.viewState = ViewStateService;
		$scope.StudentService = StudentService;
		$scope.StudentDataService = StudentDataService;

		$scope.MiddleCtrl = this;
	}]);
});
