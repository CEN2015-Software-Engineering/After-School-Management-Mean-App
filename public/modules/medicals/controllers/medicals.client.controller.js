'use strict';

// Medicals controller
angular.module('medicals').controller('MedicalsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Medicals', '$window', 'Notify', '$modal', '$log', 'instructorPerm',
	function($scope, $stateParams, $location, Authentication, Medicals, $window, Notify, $modal, $log, instructorPerm) {

        $scope.editGuardians = instructorPerm.getEditGuardians();
        $scope.deleteGuardians = instructorPerm.getDeleteGuardians();

        $scope.$watch(function (){ return instructorPerm.getEditGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.editGuardians = newValue;
        });
        $scope.$watch(function (){ return instructorPerm.getDeleteGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.deleteGuardians = newValue;
        });

        // Create new Medical
        $scope.create = function(childId) {
            // Create new Medical object
            var medical = new Medicals ({
                name: this.name,
                desc: this.desc,
                type: this.type,
                childID: '54cecdbf411751cc121f2f9f'
            });

            // Redirect after save
            medical.$save(function(response) {
                Notify.sendMsg('NewMedical', {'id': response._id});

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        //Open Modal Window to Add Medical
        this.modalCreate = function (size, selectedChild) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/medicals/views/create-medical-child-profile.client.view.html',
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
                 console.log('what');
                $scope.find();
                // this.theNewFunc();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                 console.log('it tried');
                
              
            });
        };

        //Open Modal Window to Update Guardian
        this.modalUpdate = function (size, selectedMedical) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/medicals/views/edit-medical.client.view.html',
                controller: function ($scope, $modalInstance, $stateParams, medical) {
                    $scope.medical = medical;


                    $scope.ok = function () {
                        $modalInstance.close($scope.medical);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve: {
                    medical: function() {
                        return selectedMedical;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
              //  console.log('here it tries');
               $scope.find();//read line below
                $scope.find();//there needs to be 2 of these dont delete
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

        // Remove existing Guardian
        this.remove = function(medical) {
            if($window.confirm('Are you sure you want to delete ' + medical.name + ' ?')) {
                if ( medical ) {
                    medical.$remove();

                    for (var i in $scope.medicals) {
                        if ($scope.medicals [i] === medical) {
                            $scope.medicals.splice(i, 1);
                        }
                    }
                } else {
                    $scope.medical.$remove(function() {
                        $location.path('');
                    });
                }
            }
        };

		// Find a list of Medicals
		$scope.find = function() {
			$scope.medicals = Medicals.query();
            console.log($scope);
		};

		// Find existing Medical
		$scope.findOne = function() {
			$scope.medical = Medicals.get({ 
				medicalId: $stateParams.medicalId
			});
		};
        $scope.filterFunction = function(element) {
            if(!element.type.match('Allergy') && !element.type.match('Disability')) {
                return true;
            }
        };
        $scope.medicalTypes = ['Allergy', 'Disability', 'Special Requirement', 'Other'];

    }
]);

angular.module('medicals').controller('MedicalsCreateController', ['$scope', 'Medicals', 'Notify',
    function($scope, Medicals, Notify) {
        // Create new Medical

        // Create new Medical
        this.create = function(childId) {
            // Create new Medical object
            var medical = new Medicals ({
                name: this.name,
                desc: this.desc,
                type: this.type,
                childID: childId
            });

            // Redirect after save
            medical.$save(function(response) {
                Notify.sendMsg('NewMedical', {'id': response._id});

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.medicalTypes = ['Allergy', 'Disability', 'Special Requirement', 'Other'];


    }
]);

angular.module('medicals').controller('MedicalsUpdateController', ['$scope', '$stateParams', '$location', 'Medicals',
    function($scope, $stateParams, $location, Medicals) {
        // Update existing Medical
        this.update = function(updatedMedical) {
            var medical = updatedMedical;

            medical.$update(function() {
                //this updates the medicals

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        $scope.medicals = Medicals.query();
        $scope.medicalTypes = ['Allergy', 'Disability', 'Special Requirement', 'Other'];

    }
]);

