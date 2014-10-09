packager('academy.directives', function() {
	academy.app.directive("studentDetail", [function() {
		return {
			templateUrl: "student-detail-tpl",
			scope : {
				viewState : "=",
				studentService : "=",
				studentDataService : "="
			},
			link: function(scope, element, attrs) {
				var viewState = scope.viewState,
					studentService = scope.studentService,
					studentDataService = scope.studentDataService;
				scope.student = viewState.student;
				
				scope.editStudent = function() {
					viewState.showEditStudent(viewState.student);
				};

				scope.deleteStudent = function() {
	//				studentService.delete(viewState.student).then().finally();
				};

				scope.assignSection = function() {
				};

				scope.resetPassword = function() {
				};

				scope.cancelSummary = function() {
					viewState.revertToDefault();
				};

				
				scope.getDetails = function() {
					if (viewState.student && viewState.student.details) { 
						studentDataService.setCurrentStudent(viewState.student);
						return; 
					};
					scope.updateDetails();
				};

				scope.updateDetails = function() {
					var promise = studentDataService.details(viewState.student);
	//				promise.error(scope.cannotShowErrors).then(scope.detailsUpdated);
				};

				scope.$watch("viewState.student.id", function() {
					if (!viewState.student) { return; }
					//call student service to get the details
					scope.getDetails();
				}, true);
			}
		};
	}]);
});
