
packager('academy.factory', function() {
	this.students = academy.app.factory('StudentService', ['$http', '$q', function ($http, $q) {
		var exports = {
			students : window.students
		};

		exports.validateAdd = function validateAdd(student) {
			var obj = academy.object_validators.new_student;

			var engine = academy.validator.create(student, obj);
			return engine.execute();
		};

		exports.validateEdit = function validateEdit (student) {
			var obj = academy.object_validators.student;

			var engine = academy.validator.create(student, obj);
			return engine.execute();
		};

		exports.get = function() {
			var success = function(data) {
				put(JSON.parse(data.students));
				return studentList;
			};

			return $http.get(academy.routes.list_students).success(success);
		}

		exports.save = function(student) {
			var success = function(data) {
				for (var i=0; i<students.length; i++) {
					students[i] = students[i].id == student.id ? student : students[i];
				}
			};

			return $http.post(academy.routes.edit_student, student).success(success);
		}

		exports.add = function(student) {
			var success = function(data) {
				if (data.response) {
					var new_student = JSON.parse(data.response);
					exports.students.push(new_student);
					exports.new_student = new_student;
					return new_student;
				}
			};
			return $http.post(academy.routes.add_student, student).success(success);
		}

		return exports;
	}]);

});
