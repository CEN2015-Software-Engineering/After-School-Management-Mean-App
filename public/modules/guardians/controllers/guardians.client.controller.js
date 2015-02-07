'use strict';

// Guardians controller
angular.module('guardians').controller('GuardiansController', ['$scope', '$stateParams', '$location', 'Guardians','$modal', '$log',
	function($scope, $stateParams, $location, Guardians, $modal, $log) {

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



		// Remove existing Guardian
		$scope.remove = function(guardian) {
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
		};

		// Update existing Guardian
		$scope.update = function() {
			var guardian = $scope.guardian;

			guardian.$update(function() {
				$location.path('guardians/' + guardian._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
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
		$scope.modalCreate = function (size) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/guardians/views/create-guardian-child-profile.client.view.html',
				controller: function ($scope, $modalInstance, $stateParams) {
					// Create new Guardian
					$scope.createByChildId = function() {
						// Create new Guardian object
						var guardian = new Guardians ({
							gName: this.gName,
							childID: $stateParams.childId
						});

						// Redirect after save
						guardian.$save(function(response) {

							$modalInstance.close();

						}, function(errorResponse) {
							$scope.error = errorResponse.data.message;
						});
					};

					$scope.submit = function() {
						$modalInstance.close();
						$scope.find();
					};

					$scope.cancel = function() {
						$modalInstance.dismiss('cancel');
					};

				},
				size: size
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	}
]);