'use strict';

// Medicals controller
angular.module('medicals').controller('MedicalsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Medicals', '$modal', '$log',
	function($scope, $stateParams, $location, Authentication, Medicals, $modal, $log) {



        //Open Modal Window to Add Medical
        this.modalCreate = function (size, selectedChild) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/guardians/views/create-guardian-child-profile.client.view.html',
                controller: function ($scope, $modalInstance, $stateParams, child) {
                    $scope.child = child;

                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve: {
                    child: function() {
                        return selectedChild;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
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

angular.module('guardians').controller('MedicalsCreateController', ['$scope', 'Medicals', 'Notify',
    function($scope, Medicals, Notify) {
        // Create new Guardian

        // Create new Medical
        $scope.create = function(childId) {
            // Create new Medical object
            var medical = new Medicals ({
                name: this.name,
                desc: this.desc,
                childID: childId
            });

            // Redirect after save
            medical.$save(function(response) {
                Notify.sendMsg('NewMedical', {'id': response._id});

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);