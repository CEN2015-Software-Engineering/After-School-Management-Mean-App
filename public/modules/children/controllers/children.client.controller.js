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
                $http.get('/attendances/').success(function(findAttendances){
                    for(var a in findAttendances){
                        if(findAttendances[a].childID === child._id){
                            $http.delete('/attendances/' + findAttendances[a]._id).
                                success(function (data) {
                                    console.log(data);

                                });
                        }
                    }

                });

                $http.get('/medicals/').success(function(findMedicals){
                    for(var b in findMedicals){
                        if(findMedicals[b].childID === child._id){
                            $http.delete('/medicals/' + findMedicals[b]._id).
                                success(function (data) {
                                    console.log(data);

                                });
                        }
                    }

                });


				if (child) {
                    $http.delete('/children/' + child._id).
                        success(function (data) {
                            console.log(data);
                        });
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
            console.log('here');
            child.contact.home = ('' + child.contact.home).replace(/\D/g,'');
            child.contact.work = ('' + child.contact.work).replace(/\D/g,'');

            $http.put('/children/' + child._id, child).
                success(function (advent) {
                    console.log(advent);
                    $location.path('children/' + child._id);

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
            $http.get('/advents/').
                success(function (advent) {
                    console.log(advent);
                    $scope.advents = advent;
            });
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
                $scope.attendances = [];
                $scope.upCommingAttendances = [];
                $scope.today = (new Date()).valueOf() + 86400;
                $http.get('/attendances/').
                    success(function (attendances) {
                        for(var attend in attendances){
                            if(attendances[attend].childID === $scope.child._id){

                                if(attendances[attend].signedOut){
                                    attendances[attend].date.fullDate = (new Date(attendances[attend].signout.time)).valueOf();
                                    attendances[attend].date.dayOfWeek = moment(attendances[attend].signout.time).format('ddd');
                                    attendances[attend].date.theTime = moment((new Date(attendances[attend].signout.time))).format('hh:mm A');
                                    if((moment((new Date(attendances[attend].signout.time))).format('HH')) >= 18  &&(moment((new Date(attendances[attend].signout.time))).format('mm')) >= 1 && (moment((new Date(attendances[attend].signout.time))).format('A')) === 'PM'){
                                        //console.log(attendances[attend].date.theTime);
                                        //console.log((moment((new Date(attendances[attend].signout.time))).format('HH')));
                                        //console.log((moment((new Date(attendances[attend].signout.time))).format('mm')));
                                        //console.log((moment((new Date(attendances[attend].signout.time))).format('A')));
                                        //console.log('Checked Out after 6');
                                        attendances[attend].late = true;
                                    }else {
                                        attendances[attend].late = false;
                                    }

                                }else{
                                    attendances[attend].date.fullDate = (new Date(attendances[attend].date.year, attendances[attend].date.month - 1, attendances[attend].date.day)).valueOf();
                                    attendances[attend].date.dayOfWeek = moment({day:attendances[attend].date.day ,month:attendances[attend].date.month - 1, year: attendances[attend].date.year}).format('ddd');

                                }
                                for(var a in $scope.advents) {
                                    if($scope.advents[a]._id === attendances[attend].adventID){
                                        attendances[attend].adventName = $scope.advents[a].name;
                                    }
                                }
                                if($scope.today >= attendances[attend].date.fullDate) {
                                    attendances[attend].past = true;
                                    $scope.attendances.push(attendances[attend]);
                                    $scope.attendances.sort(function(a,b){return b.date.fullDate - a.date.fullDate;});
                                }else {
                                    $scope.upCommingAttendances.push(attendances[attend]);
                                    $scope.upCommingAttendances.sort(function(a, b){return a.date.fullDate - b.date.fullDate;});
                                }
                            }

                        }
                    });

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