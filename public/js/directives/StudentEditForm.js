packager('academy.directives', function() {
	academy.app.directive("studentEditForm", [function() {
		return {
			scope : {
				viewState : "=",
				studentService : "="
			},
			templateUrl: "edit-student-form-tpl",
			link: function(scope, element, attrs) {
				var viewState = scope.viewState, StudentService = scope.studentService;

				scope.$watch("viewState.get().showEditing", function() {
					scope.error = null;
				});
			
				scope.cancel = function() {
					viewState.revertToDefault();
				};

				scope.updateView = function() {
					scope.isSubmitting = false;
					viewState.showStudentSummary(viewState.student);
				};

				scope.setError = function(data, code) {
					scope.isSubmitting = false;
					if (data.error) {
						scope.error = data.error.message;
					} else if (code == 400) {
						//show general error
					} else if (code == 401) {
						//redirect to login
					} else if (code == 404) {
						//couldn't find student, refresh list
					} else if (code == 500) {
						//show general error
					}
				};

				scope.updateStudent = function() {
					if (!scope.validate()) { return; }

					scope.isSubmitting = true;
					promise = StudentService.save(viewState.student);
					promise.error(scope.setError).then(scope.updateView);
				};

				scope.validate = function() {
					var valid = StudentService.validateEdit(viewState.student);
					if (valid.error) {
						scope.error = valid.error.message;
						return false;
					};

					scope.error = null;
					return true;
				};
			}
		};
	}]);
});
