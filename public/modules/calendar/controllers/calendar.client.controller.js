'use strict';

angular.module('calendar').controller('CalendarController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
		$scope.day = moment();
	}
]);