
packager('academy.factory', function() {
	this.studentData = academy.app.factory('StudentDataService', ['$http', '$q', function ($http, $q) {
		var exports = {
			scores: null,
			student: null,
			averages: null,
			labels: null,
			data: null
		};

		exports.cleanData = function() {
			exports.scores = [];
			exports.averages = [];
			exports.labels = [];
			exports.data = [];
		}

		exports.setCurrentStudent = function(student) {
			if (exports.student != student) {
				exports.cleanData();
			}
			exports.student = student;

			if (student.details) {
				exports.processGrades(student.details);
			}
		};

		exports.details = function(student) {
			var success = function(data) {
				exports.cleanData();
				if (data.response) {
					student.details = exports.currentDetails = data.response;
					exports.processGrades(student.details);
					return student.details;
				}
			};
			exports.setCurrentStudent(student);
			return $http.post(academy.routes.student_details, student).success(success);
		}

		exports.processGrades = function(details) {
			details.scores = _.sortBy(details.scores, function(score) {
				return new Date(score.date_modified);
			});

			var scores = _.each(details.scores, function(score) {
				score.score = parseFloat(score.score, 10);
				//go through each score and set average
				score.average =	_.find(details.averages, function(average) {
					return average.section_id === score.section_id 
				}).average;
				//if average is null, then set the default to 90
				score.average = score.average == null ? 90 : parseFloat(score.average, 10);
				
				exports.setData(score);
			});
			
			return exports.data;
		}

		exports.getSectionDisplay = function(section) {
			var name = section.number + '. ' + section.name;
			return name.length > 15 ? name.substr(0, 12) + "..." : name;
		};
	
		exports.setData = function(score) {
			var name = exports.getSectionDisplay(score.section);
			var date = moment(score.date_modified, 'YYYY-MM-DD h:mm:ss').format('MM/DD');
			exports.labels.push(date);
			exports.scores.push(score.score);
			exports.averages.push(score.average);
			exports.data.push(score);
		}

		return exports;
	}]);

});
