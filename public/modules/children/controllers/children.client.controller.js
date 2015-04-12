'use strict';

// Children controller

angular.module('children').controller('ChildrenController', ['$scope', '$window', '$stateParams', '$location', 'Children', 'Guardians', '$modal', '$log', '$timeout', 'instructorPerm','$http',
	function($scope, $window, $stateParams, $location, Children, Guardians, $modal, $log, $timeout, instructorPerm, $http) {

		$scope.editGuardians = instructorPerm.getEditGuardians();
		$scope.deleteGuardians = instructorPerm.getDeleteGuardians();
		$scope.addGuardians = instructorPerm.getAddGuardians();

		$scope.$watch(function (){ return instructorPerm.getEditGuardians(); }, function(newValue, oldValue){
			if(newValue !== oldValue) $scope.editGuardians = newValue;
		});
		$scope.$watch(function (){ return instructorPerm.getDeleteGuardians(); }, function(newValue, oldValue){
			if(newValue !== oldValue) $scope.deleteGuardians = newValue;
		});
		$scope.$watch(function (){ return instructorPerm.getAddGuardians(); }, function(newValue, oldValue){
			if(newValue !== oldValue) $scope.addGuardians = newValue;
		});


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
            
            console.log(this.address);
			var child = new Children ({
				firstName: this.firstName,
				lastName: this.lastName,
				enrolled: this.enrolled,
				contact: {
					email: this.email,
					home: newHome,
					work: newWork,
                    address: this.address
				},dob: {
					day: this.day,
					month: this.month,
					year: this.year
				},
				schoolName: this.schoolName,
                grade: this.grade,
				size: this.size,
				schedule: {
					mon: $scope.checkModel.mon,
					tue: $scope.checkModel.tue,
					wed: $scope.checkModel.wed,
					thu: $scope.checkModel.thu,
					fri: $scope.checkModel.fri,
					sat: $scope.checkModel.sat,
					sun: $scope.checkModel.sun
				},
                profileLink: this.profileLink
                
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
        /*jshint loopfunc:true */
		$scope.remove = function(child, guardians) {
			console.log(child);
			//Confirm childs deletion or if Karma Test, delete child. Karma Child ID = 525a8422f6d0f87f0e407a33
			var sure = $window.confirm('Are you sure you want to delete ' + child.firstName + ' ' + child.lastName + ' ?');
            if( sure || child._id === '525a8422f6d0f87f0e407a33') {
                console.log(guardians);
                console.log('BLAH');
                $http.get('/guardians/').success(function(data){
                    var lookForGuardians = data;
                    for(var g in lookForGuardians) {
                        if (lookForGuardians.hasOwnProperty(g)) {
                            if(lookForGuardians[g].childID === child._id) {
                                console.log(lookForGuardians[g].gName);
                                $http.delete('/guardians/' + lookForGuardians[g]._id).
                                    success(function (data) {
                                        console.log(data);
                                });
                            }
                        }
                    }
                });




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
			/*$scope.child = Children.get({
				childId: $stateParams.childId
			});*/
            $http.get('/children/' + $stateParams.childId).success(function(data){
                $scope.child = data;
                var ageDifMs  = Date.now() - new Date($scope.child.dob.year, $scope.child.dob.month, $scope.child.dob.day, 0, 0, 0, 0);
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                console.log(Math.abs(ageDate.getUTCFullYear() - 1970));
                $scope.child.age = Math.abs(ageDate.getUTCFullYear() - 1970);
                var ufh = $scope.child.contact.home;
                $scope.child.contact.home = ufh.substr(0,3) + '-' + ufh.substr(3,3) + '-' + ufh.substr(6);
                var ufw = $scope.child.contact.work;
                $scope.child.contact.work = ufw.substr(0,3) + '-' + ufw.substr(3,3) + '-' + ufw.substr(6);
                console.log($scope.child);

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

angular.module('children').controller('ChildrenUpdateController', ['$scope', '$stateParams', '$location', 'Children','$http',
	function($scope, $stateParams, $location, Children, $http) {
		// Update existing Child
		this.update = function(selectedChild) {
			var child = selectedChild;
            child.contact.home = ('' + child.contact.home).replace(/\D/g,'');
            child.contact.work = ('' + child.contact.work).replace(/\D/g,'');
            $http.put('/children/' + child._id, child).success(function(data){

            });
		};

	}
]);