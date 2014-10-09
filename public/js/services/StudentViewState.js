//TODO set up front end sass frameworks - 0.5 days
//TODO build out styles using sass frameworks - 1.5 day

//TODO add in models for creating new students on front end and backend, use validators.js
//TODO setup angular service tests - 1 day
//TODO start testing with protractor and phantom - 2 days
//TODO figure out how to compile assets

packager('academy.factory', function() {
	this.ViewState = academy.app.factory('ViewStateService', [function () {
		var exports = {
			isAddingShowing : false,
			isEditingShowing : false,
			isViewingStudentSummary : false,
			studentListFull : true,
			student : null,
			passportsFull : true,
			master_student : null
		};

		exports.get = function() {
			return {
				showAdding: exports.isAddingShowing,
				showEditing: exports.isEditingShowing,
				showStudentSummary : exports.isViewingStudentSummary,
				showWideList : exports.studentListFull,
				student: exports.student
			};
		};
		exports.showAddStudent = function() {
			exports.isAddingShowing = true;
			exports.isEditingShowing = false;
			exports.isViewingStudentSummary = false;
			exports.studentListFull = false;

			exports.student = {set_password : true, fullname: ""};
			exports.master_student = null;
		};
		exports.showEditStudent = function (student) {
			exports.isAddingShowing = false;
			exports.isEditingShowing = true;
			exports.isViewingStudentSummary = false;
			exports.studentListFull = false;

			exports.student = angular.copy(student);
			exports.master_student = student;
		};
		exports.revertToDefault = function () {
			exports.isAddingShowing = false;
			exports.isEditingShowing = false;
			exports.isViewingStudentSummary = false;
			exports.studentListFull = true;

			exports.student = null;
			exports.master_student = null;
		};
		exports.showStudentSummary = function (student) {
			exports.isAddingShowing = false;
			exports.isEditingShowing = false;
			exports.isViewingStudentSummary = true;
			exports.studentListFull = false;

			exports.student = angular.copy(student);
		};
	
		exports.hideAddStudents = function() {
			return (exports.isAddingShowing && !exports.master_student) || (exports.passportsFull);
		};

		exports.setPassportsFull = function(full) {
			exports.passportsFull = full;
		};
		
		exports.isViewingStudent = function(stu) {
			return stu && exports.student && stu.id === exports.student.id;
		};
		return exports;
	}]);
});
