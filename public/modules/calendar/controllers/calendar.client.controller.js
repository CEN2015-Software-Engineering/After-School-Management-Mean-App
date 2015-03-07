'use strict';

angular.module('calendar').controller('CalendarController', ['$scope', 'Advents',
	function($scope, Advents) {
		// Controller Logic
		// ...
		$scope.day = moment();

        $scope.find = function() {
            $scope.advents = Advents.query();
        };

                        $scope.getToday = function() {
                	var result = false;
                	console.log(1);
                	$scope.month = $scope.selected.clone();
					$scope.selected = moment();
					var start = $scope.selected.clone();
					start.date(1);
					_removeTime(start.day(0));
					_buildMonth($scope, start, $scope.month);
					result = true;
					console.log(0);
					return result;
	                };


	}
]);