'use strict';

// Advents controller
angular.module('advents').controller('AdventsController', ['$scope', '$stateParams', '$location', 'Advents',
	function($scope, $stateParams, $location, Advents) {

		// Create new Advent
		$scope.create = function() {
			// Create new Advent object
			var advent = new Advents ({
				name: this.name,
				date:{
					day: this.day,
					month: this.month,
					year: this.year
				},
				description: this.description
			});

			// Redirect after save
			advent.$save(function(response) {
				$location.path('advents/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Advent
		$scope.remove = function(advent) {
			if ( advent ) { 
				advent.$remove();

				for (var i in $scope.advents) {
					if ($scope.advents [i] === advent) {
						$scope.advents.splice(i, 1);
					}
				}
			} else {
				$scope.advent.$remove(function() {
					$location.path('advents');
				});
			}
		};

		// Update existing Advent
		$scope.update = function() {
			var advent = $scope.advent;

			advent.$update(function() {
				$location.path('advents/' + advent._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Advents
		$scope.find = function() {
			$scope.advents = Advents.query();
		};

		// Find existing Advent
		$scope.findOne = function() {
			$scope.advent = Advents.get({ 
				adventId: $stateParams.adventId
			});
		};
	}
]);