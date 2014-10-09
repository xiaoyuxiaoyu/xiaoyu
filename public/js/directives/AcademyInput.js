packager('academy.directives', function() {
	academy.app.directive("academyInput", [function() {
		return {
			scope: {
				inputModel : '=',
				inputId : '@',
				inputLabel : '@',
				inputError : '=',
				inputType: '@'
			},
			templateUrl: "academy-form-input",
			transclude: true,
			link: function(scope, element, attrs) {
			}
		};
	}]);
});
