'use strict';

// Sidebars controller
angular.module('sidebars').controller('SidebarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sidebars',
	function($scope, $stateParams, $location, Authentication, Sidebars) {
		$scope.authentication = Authentication;

		// Create new Sidebar
		$scope.create = function() {
			// Create new Sidebar object
			var sidebar = new Sidebars ({
				name: this.name
			});

			// Redirect after save
			sidebar.$save(function(response) {
				$location.path('sidebars/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Sidebar
		$scope.remove = function(sidebar) {
			if ( sidebar ) { 
				sidebar.$remove();

				for (var i in $scope.sidebars) {
					if ($scope.sidebars [i] === sidebar) {
						$scope.sidebars.splice(i, 1);
					}
				}
			} else {
				$scope.sidebar.$remove(function() {
					$location.path('sidebars');
				});
			}
		};

		// Update existing Sidebar
		$scope.update = function() {
			var sidebar = $scope.sidebar;

			sidebar.$update(function() {
				$location.path('sidebars/' + sidebar._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Sidebars
		$scope.find = function() {
			$scope.sidebars = Sidebars.query();
		};

		// Find existing Sidebar
		$scope.findOne = function() {
			$scope.sidebar = Sidebars.get({ 
				sidebarId: $stateParams.sidebarId
			});
		};
	}
]);