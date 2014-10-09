
packager('academy.directives', function() {
	academy.app.directive("studentList", [function() {
		return {
			controller: "LeftCtrl",
			templateUrl: "student-list-tpl",
			link: function(scope, element, attrs, pageCtrl) {
				var viewState = scope.viewState;

				scope.viewStudent = function(student) {
					viewState.showStudentSummary(student);
				};

				scope.editStudent = function(student) {
					viewState.showEditStudent(student);
				};

				scope.addStudent = function() {
					scope.error = null;
					viewState.showAddStudent();
				};

				scope.deleteStudent = function(student) {
					alert('delete' + student.name);
				};

				scope.setStudents = function (students) {
					$scope.students = StudentService.students;
				}; 

				scope.error = function(err) {
				};

				scope.hideAddButton = function() {
					return !viewState.master_student && viewState.student;
				};
			}
		};
	}]);
});
