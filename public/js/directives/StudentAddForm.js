packager('academy.directives', function() {
	academy.app.directive("studentAddForm", [function() {
		return {
			scope : {
				viewState : "=",
				studentService : "="
			},
			templateUrl: "add-student-form-tpl",
			link: function(scope, element, attrs) {
				var viewState = scope.viewState, StudentService = scope.studentService;

				scope.cancel = function() {
					viewState.revertToDefault();
				};

				scope.setError = function(data, code) {
					scope.isSubmitting = false;
					if (data.error) {
						scope.error = data.error.message;
					} else if (code == 400 || code == 500) {
						//show general error
					} else if (code == 401) {
						//show alert, unauthorized
					} else if (code == 403){
						//no more passports, refresh page
					} else if (code == 409) {
						//username/email conflict, user already exists
					}
				};

				scope.updateView = function() {
					scope.isSubmitting = false;
					viewState.showStudentSummary(StudentService.new_student);
				};

				scope.addStudent = function() {
					if (!scope.validate()) { return; }
					scope.isSubmitting = true;
					promise = StudentService.add(viewState.student);
					promise.error(scope.setError).then(scope.updateView);
				};

				scope.validate = function() {
					var valid = StudentService.validateAdd(viewState.student);
					if (valid.error) {
						console.log(valid.error);
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
