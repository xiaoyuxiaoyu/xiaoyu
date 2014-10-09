packager('academy.directives', function() {
	academy.app.directive("academyImage", [function() {
		return {
			templateUrl: "academy-image-tpl",
			scope : {
				imageSrc : "@",
				height: "@",
				width: "@"
			},
			link: function(scope, element, attrs) {
				scope.imageRoot = "http://cdn.whyyu.com/images";
				scope.init = function() {
					scope.image = scope.imageRoot + (scope.imageSrc[0] != "/" ? "/" : "") + scope.imageSrc;
				};

				scope.$watch("imageSrc", function() {
					if (!scope.imageSrc) { return }
					scope.init();
				});
			}
		};
	}]);
});
