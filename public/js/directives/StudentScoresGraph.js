packager('academy.directives', function() {
	academy.app.directive("studentScoresGraph", [function() {
		return {
			templateUrl: "student-scores-graph-tpl",
			scope : {
				service : "=",
				chartId : "@",
				details : "="
			},
			link: function(scope, element, attrs) {
				var service = scope.service,
					ctx = element.children()[0].getContext('2d');

				scope.tooltip = element.children()[1];
				scope.scoreColor = '143, 209, 0';
				scope.averageColor = '52, 152, 219';
				scope.displayTooltip = false;

				scope.init = function() {
					scope.setup();
					scope.draw();
				};

				scope.getDetails = function() {
				};

				scope.setup = function() {
					scope.chart = new Chart(ctx);
					Chart.defaults.global.responsive = true;
					Chart.defaults.global.showTooltips = false;
				};

				scope.getDataSet = function(label, color, data) {
					return {
								label: label,
								fillColor: "rgba(" + color + ",0.2)",
								strokeColor: "rgba(" + color + ",1)",
								pointColor: "rgba(" + color + ",1)",
								pointStrokeColor: "#fff",
								pointHighlightFill: "#fff",
								pointHighlightStroke: "rgba(" + color + ",1)",
								data: data
							};
				};

				scope.draw = function() {
					if (!service.scores.length) { return; }

					var data = {
						labels: service.labels,
						datasets: [
							scope.getDataSet("Student Grades", scope.scoreColor, service.scores),
							scope.getDataSet("Student Averages", scope.averageColor, service.averages)
						]
					};

					scope.lineChart = scope.chart.Line(data, {
						 bezierCurveTension : 0.2
					});
				};

				scope.updateTooltip = function(e) {
					if (!scope.lineChart) { return; }
					scope.renderTooltip(scope.lineChart.getPointsAtEvent(e));
				};

				scope.renderTooltip = function(points) {
					if (!points.length) { 
						scope.hideTooltip();
						return; 
					}

					var point = points[0];

					scope.showTooltip();
					scope.updateTipPosition(point);
					scope.pointScore = scope.getPointScore(point);
				};

				scope.getPointScore = function(point) {
					var index = scope.lineChart.datasets[0].points.indexOf(point);
					index = index == -1 ? scope.lineChart.datasets[1].points.indexOf(point) : index;

					return service.data[index];
				};

				scope.updateTipPosition = function(point) {
					//get the point coordinates
					if (scope.chart.width > point.x + 250) {
						scope.tipX = point.x + 10;
					} else {
						var left = point.x - 130;
						scope.tipX = left < 0 ? 10 : left;
					}

					scope.tipY = point.y > scope.chart.height * 0.4 ? point.y - 70 : point.y;

					scope.tipX += "px";
					scope.tipY += "px";
				};

				scope.showTooltip = function() {
					scope.displayTooltip = true;
				};
	
				scope.hideTooltip = function() {
					setTimeout(function() {
						scope.displayTooltip = false;
					}, 10);
				};

				scope.$watch("details", function() {
					if (!scope.details) { return }
					scope.init();
				});
			}
		};
	}]);
});
