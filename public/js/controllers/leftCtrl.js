
packager('academy.controllers', function() {
	academy.app.controller("LeftCtrl", ["$scope", "StudentService", "ViewStateService", function($scope, StudentService, ViewStateService) {
		var students = $scope.students = StudentService.students;
		var viewState = $scope.viewState = ViewStateService;

		//StudentService.get().error(this.error).then(this.setStudents);
		$scope.LeftCtrl = this;
	}]);
});
