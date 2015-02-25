'use strict';

// Medicals controller
angular.module('medicals').controller('MedicalsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Medicals',
	function($scope, $stateParams, $location, Authentication, Medicals) {
		$scope.authentication = Authentication;

		// Create new Medical
		$scope.create = function() {
			// Create new Medical object
			var medical = new Medicals ({
				name: this.name
			});

			// Redirect after save
			medical.$save(function(response) {
				$location.path('medicals/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Medical
		$scope.remove = function(medical) {
			if ( medical ) { 
				medical.$remove();

				for (var i in $scope.medicals) {
					if ($scope.medicals [i] === medical) {
						$scope.medicals.splice(i, 1);
					}
				}
			} else {
				$scope.medical.$remove(function() {
					$location.path('medicals');
				});
			}
		};

		// Update existing Medical
		$scope.update = function() {
			var medical = $scope.medical;

			medical.$update(function() {
				$location.path('medicals/' + medical._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Medicals
		$scope.find = function() {
			$scope.medicals = Medicals.query();
		};

		// Find existing Medical
		$scope.findOne = function() {
			$scope.medical = Medicals.get({ 
				medicalId: $stateParams.medicalId
			});
		};
	}
]);