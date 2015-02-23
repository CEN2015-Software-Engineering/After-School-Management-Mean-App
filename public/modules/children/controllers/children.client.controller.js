'use strict';

// Children controller
angular.module('children').controller('ChildrenController', ['$scope', '$window', '$stateParams', '$location', 'Children', 'Guardians', '$modal', '$log', '$timeout',
	function($scope, $window, $stateParams, $location, Children, Guardians, $modal, $log, $timeout) {

		$scope.checkModel = {
			mon: false,
			tue: false,
			wed: false,
			thu: false,
			fri: false,
			sat: false,
			sun: false
		};

		// Create new Child

		$scope.create = function() {
			// Create new Child object
            var newHome = ('' + this.home).replace(/\D/g,'');
            var newWork = ('' + this.work).replace(/\D/g,'');

			var child = new Children ({
				firstName: this.firstName,
				lastName: this.lastName,
				enrolled: this.enrolled,
				contact: {
					email: this.email,
					home: newHome,
					work: newWork,
					street: this.street
				},dob: {
					day: this.day,
					month: this.month,
					year: this.year
				},
				schoolName: this.schoolName,
				size: this.size,
				schedule: {
					mon: $scope.checkModel.mon,
					tue: $scope.checkModel.tue,
					wed: $scope.checkModel.wed,
					thu: $scope.checkModel.thu,
					fri: $scope.checkModel.fri,
					sat: $scope.checkModel.sat,
					sun: $scope.checkModel.sun
				}
			});

			// Redirect after save
			child.$save(function(response) {
				$location.path('children/' + response._id);

				// Clear form fields
				//$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Child
		$scope.remove = function(child, guardians) {
			console.log(child);
			//Confirm childs deletion or if Karma Test, delete child. Karma Child ID = 525a8422f6d0f87f0e407a33
			var sure = $window.confirm('Are you sure you want to delete ' + child.firstName + ' ' + child.lastName + ' ?');
            if( sure || child._id === '525a8422f6d0f87f0e407a33') {
                $scope.guardians = Guardians.query();
                for(var g in guardians) {
                    if (guardians.hasOwnProperty(g)) {
                        if(guardians[g].childID === child._id) {
                            console.log(guardians[g].gName);
                            guardians[g].$remove();
                        }
                    }
                }


				if (child) {
					child.$remove();
					for (var i in $scope.children) {
						if ($scope.children [i] === child) {
							$scope.children.splice(i, 1);
						}
					}
                    $timeout(function(){
                        $location.path('children');
                    }, 2000);
                } else {
					$scope.child.$remove(function () {
						$location.path('children');
					});
				}
			}
		};



		// Update existing Child
		$scope.update = function() {
			var child = $scope.child;
            //child.contact.home = ('' + child.contact.home).replace(/\D/g,'');
            //child.contact.work = ('' + child.contact.work).replace(/\D/g,'');

			child.$update(function() {
				$location.path('children/' + child._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



        // Find a list of Children
		$scope.find = function() {
			$scope.children = Children.query();
		};

		// Find existing Child
		$scope.findOne = function() {
			$scope.child = Children.get({ 
				childId: $stateParams.childId
			});
		};

		//Open Modal Window to Update Guardian
		this.modalUpdate = function (size, selectedChild) {

			var modalInstance = $modal.open({
				templateUrl: '/modules/children/views/edit-child.client.view.html',
				controller: function ($scope, $modalInstance, $stateParams, child) {
					$scope.child = child;


					$scope.ok = function () {
						$modalInstance.close($scope.child);
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
	}
]);

angular.module('children').controller('ChildrenUpdateController', ['$scope', '$stateParams', '$location', 'Children',
	function($scope, $stateParams, $location, Children) {
		// Update existing Child
		this.update = function(selectedChild) {
			var child = selectedChild;
            child.contact.home = ('' + child.contact.home).replace(/\D/g,'');
            child.contact.work = ('' + child.contact.work).replace(/\D/g,'');
			child.$update(function() {
				$location.path('children/' + child._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);