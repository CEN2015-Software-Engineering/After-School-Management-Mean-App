'use strict';

angular.module('calendar').controller('CalendarController', ['$scope', 'Advents',
	function($scope, Advents) {
		// Controller Logic
		// ...
		$scope.day = moment();

        $scope.find = function() {
            $scope.advents = Advents.query();
        };


	}
]);