packager('academy.directives', function() {
	academy.app.directive("scoreTooltip", [function() {
		return {
			templateUrl: "score-tooltip-tpl",
			scope : {
				score: "="
			},
			link: function(scope, element, attrs) {
				scope.updateSectionInfo = function() {
					//get section data from pointNum
					var section = scope.score.section;
					scope.sectionImage = section.image;
					scope.sectionName = section.number + ". " + section.name;
					scope.grade = parseInt(scope.score.score, 10);
					scope.average = parseInt(scope.score.average, 10);
				};

				scope.render = function() {
					scope.updateSectionInfo();
				};

				scope.$watch("score", function() {
					if (!scope.score) { return; }
					scope.render();
				});
			}
		};
	}]);
});
