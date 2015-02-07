'use strict';

// Guardians controller
angular.module('guardians').controller('GuardiansController', ['$scope', '$window', '$stateParams', '$location', 'Guardians','$modal', '$log',
	function($scope, $window, $stateParams, $location, Guardians, $modal, $log) {


		// Remove existing Guardian
		this.remove = function(guardian) {
			if($window.confirm('Are you sure you want to delete ' + guardian.gName + ' ?')) {
				if ( guardian ) {
					guardian.$remove();

					for (var i in $scope.guardians) {
						if ($scope.guardians [i] === guardian) {
							$scope.guardians.splice(i, 1);
						}
					}
				} else {
					$scope.guardian.$remove(function() {
						$location.path('guardians');
					});
				}
			}
		};

		// Find a list of Guardians
		$scope.find = function() {
			$scope.guardians = Guardians.query();
		};

		// Find existing Guardian
		$scope.findOne = function() {
			$scope.guardian = Guardians.get({
				guardianId: $stateParams.guardianId
			});
		};

		//find Guardians by ChildID
		$scope.findByChildID = function(id) {
			console.log($scope);
			$scope.guardians = Guardians.query();
			console.log(id);
		};




		//Open Modal Window to Add Guardian
		this.modalUpdate = function (size, selectedGuardian) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/guardians/views/edit-guardian.client.view.html',
				controller: function ($scope, $modalInstance, $stateParams, guardian) {
					$scope.guardian = guardian;


					$scope.ok = function () {
						$modalInstance.close($scope.guardian);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				size: size,
				resolve: {
					guardian: function() {
						return selectedGuardian;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	}
]);

angular.module('guardians').controller('GuardiansCreateController', ['$scope', '$stateParams', '$location', 'Guardians',
	function($scope, $stateParams, $location, Guardians) {
		// Create new Guardian
		$scope.create = function() {
			// Create new Guardian object
			var guardian = new Guardians ({
				gName: this.gName,
				childID: this.childID
			});

			// Redirect after save
			guardian.$save(function(response) {
				$location.path('guardians/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.relationships = ['Mom', 'Dad', 'Sister', 'Brother', 'Aunt', 'Uncle', 'Grandma', 'Grandpa', 'Other'];

	}
]);

angular.module('guardians').controller('GuardiansUpdateController', ['$scope', '$stateParams', '$location', 'Guardians',
	function($scope, $stateParams, $location, Guardians) {
		// Update existing Guardian
		this.update = function(updatedGuardian) {
			var guardian = updatedGuardian;

			guardian.$update(function() {
				//this updates the guardian

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.relationships = ['Mom', 'Dad', 'Sister', 'Brother', 'Aunt', 'Uncle', 'Grandma', 'Grandpa', 'Other'];

		$scope.guardians = Guardians.query();
	}
]);

