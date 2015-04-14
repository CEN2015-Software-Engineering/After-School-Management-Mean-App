'use strict';

// Attendances controller

angular.module('attendances').controller('AttendancesController', ['$scope', '$stateParams', '$location', 'Children', 'Attendances', '$modal', '$log', 'instructorPerm','$http', '$timeout',
	function($scope, $stateParams, $location, Children, Attendances, $modal, $log, instructorPerm,$http, $timeout) {

        $scope.editGuardians = instructorPerm.getEditGuardians();
        $scope.deleteGuardians = instructorPerm.getDeleteGuardians();

        $scope.$watch(function (){ return instructorPerm.getEditGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.editGuardians = newValue;
        });
        $scope.$watch(function (){ return instructorPerm.getDeleteGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.deleteGuardians = newValue;
        });
        $scope.addGuardians = instructorPerm.getAddGuardians();
        $scope.$watch(function (){ return instructorPerm.getAddGuardians(); }, function(newValue, oldValue){
            if(newValue !== oldValue) $scope.addGuardians = newValue;
        });


        //Open Modal Window to Update Guardian
        this.modalUpdate = function (size, selectedAttendance) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/attendances/views/edit-attendance.client.view.html',
                controller: function ($scope, $modalInstance, $stateParams, attendance) {
                    $scope.attendance = attendance;


                    $scope.ok = function () {
                        $modalInstance.close($scope.attendance);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve: {
                    attendance: function() {
                        return selectedAttendance;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

		// Create new Attendance
		$scope.create = function() {
			// Create new Attendance object
            console.log(this.adventID);
			var attendance = new Attendances ({
				childID: this.childID,
                childName: this.childName,
                date:{
                    day: this.day,
                    month: this.month,
                    year: this.year
                },
                attended: this.attended,
                scheduledAbsent: this.scheduledAbsent,
                signout:{
                    time: this.time,
                    guardian: this.guardian
                },
                isAdvent: this.adventID,
                adventID: this.adventID
			});

			// Redirect after save
			attendance.$save(function(response) {
				$location.path('attendances/' + response._id);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Attendance
		$scope.remove = function(attendance) {
			if ( attendance ) {
				attendance.$remove();

				for (var i in $scope.attendances) {
					if ($scope.attendances [i] === attendance) {
						$scope.attendances.splice(i, 1);
					}
				}
                $location.path('attendances');
			} else {
				$scope.attendance.$remove(function() {
					$location.path('attendances');
				});
			}
		};

		// Update existing Attendance
		$scope.update = function() {
			var attendance = $scope.attendance;

			attendance.$update(function() {
				$location.path('attendances/' + attendance._id + '/edit');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Attendances
		$scope.find = function() {
			$scope.attendances = Attendances.query();
            console.log($scope.attendances);
            $scope.day = moment().date();
            console.log($scope.day);
            $scope.month = moment().month();
            console.log($scope.month);
            $scope.year = moment().year();
            console.log($scope.year);
		};

		// Find existing Attendance
		$scope.findOne = function() {
			$scope.attendance = Attendances.get({ 
				attendanceId: $stateParams.attendanceId
			});
		};

        //initialize attendances routed to sign-out-list
        $scope.initAttend = function(){
            $http.get('/sign-out-list').success(function(data){
                $scope.attendances = data;

                $http.get('/children/').success(function(data){
                    $scope.childrenTemp = data;
                }).then(function(){
                    $scope.children = [];
                    $scope.kids = 0;
                    for(var i in $scope.childrenTemp){
                        var childHasAtt = false;
                        for(var j in $scope.attendances){
                            if($scope.childrenTemp[i]._id === $scope.attendances[j].childID && ($scope.attendances[j].attended || $scope.attendances[j].signedOut || $scope.attendances[j].scheduledAbsent))
                            {
                                childHasAtt = true;
                                console.log($scope.childrenTemp[i]);
                            }
                        } 
                        if(!childHasAtt) {
                            $scope.day = moment().format('ddd').toLowerCase();
                            var enrolled = false;
                            if ($scope.day === 'sun' && $scope.childrenTemp[i].schedule.sun) {
                                enrolled = true;
                            } else if ($scope.day === 'mon' && $scope.childrenTemp[i].schedule.mon) {
                                enrolled = true;
                            } else if ($scope.day === 'tue' && $scope.childrenTemp[i].schedule.tue) {
                                enrolled = true;
                            } else if ($scope.day === 'wed' && $scope.childrenTemp[i].schedule.wed) {
                                enrolled = true;
                            } else if ($scope.day === 'thu' && $scope.childrenTemp[i].schedule.thu) {
                                enrolled = true;
                            } else if ($scope.day === 'fri' && $scope.childrenTemp[i].schedule.fri) {
                                enrolled = true;
                            } else if ($scope.day === 'sat' && $scope.childrenTemp[i].schedule.sat) {
                                enrolled = true;
                            }
                            if (enrolled) {
                                $scope.children.push($scope.childrenTemp[i]);
                                ++$scope.kids;
                            }
                        }
                    }
                    console.log($scope.children);
                    console.log($scope.kids);
                });
            });

        };
        this.getProperTime = function(fulltime) {
            $scope.time = moment(fulltime).format('HH:MM A');
            $timeout(function(){
                $location.path('/#!');
            }, 2000);


        };
        //returns todays attendance for the given child returns false if the child doesnt have one
        this.selectTodaysAttend = function(child,attendances)
        {
        	var i = 0;
			  for(i; i < attendances.length; ++i)
			  {
			  	if(attendances[i].childID === child._id && attendances[i].date.day === $scope.day && attendances[i].date.month === $scope.month+1 && attendances[i].date.year === $scope.year)
			  	{
			  		return attendances[i];
			  	}
			  }
			  return false;
        };
        //signs out the given child by either editing its attendance or creating one
        this.signOut = function(child,attendances,guardian){
        	var attend;
        	var attendance;
        	attend = this.selectTodaysAttend(child,attendances);
        	if(attend !== false){
        		//attend.signOut.time = Date.now();
        		attend.signout.guardian = guardian;
        		attend.signedOut = true;
        	}else{
        		var name = child.firstName + ' ' + child.lastName;
        		attendance = new Attendances({
        			childID: child._id,
                childName: name,
                date:{
                    day: $scope.day,
                    month: $scope.month+1,
                    year: $scope.year
                },
                attended: true,
                scheduledAbsent: false,
                signout:{
                    time: Date.now(),
                    guardian: guardian
                },
                isAdvent: false,
                signedOut: true
        		});
        		attendance.$save(function(response) {
                    $location.path('attendances/' + response._id);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        	}
        };

        $scope.findChild = function() {
            //$scope.child = Children.get({
               // childId: $stateParams.childId
           // });
            $http.get('/children/' + $stateParams.childId).success(function(child) {
                $scope.child = child;
                $http.get('/guardians').success(function (data) {
                    console.log(data);
                    $scope.guardians = [];
                    var tempG = data;
                    for (var a in tempG) {
                        console.log('here');
                        console.log(tempG);
                        if (tempG[a].childID === $scope.child._id) {
                            console.log(tempG[a].gName);
                            $scope.guardians.push(tempG[a].gName);
                        }
                    }
                });
            });
        };
        $scope.createAbsence = function() {
            // Create new Attendance object
            console.log(this.adventID);
            var attendance = new Attendances ({
                childID: $scope.child._id,
                childName: $scope.child.firstName + ' ' + $scope.child.lastName,
                date:{
                    day: this.day,
                    month: this.month,
                    year: this.year
                },
                attended: false,
                scheduledAbsent: true,
                signout:{
                    time: this.time,
                    guardian: this.guardian
                },
                isAdvent: false,
                adventID: this.adventID
            });

            // Redirect after save
            attendance.$save(function(response) {
                $location.path('attendances/' + response._id);

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

}]);


angular.module('attendances').controller('AttendancesUpdateController', ['$scope', '$stateParams', '$location', 'Attendances',
    function($scope, $stateParams, $location, Attendances) {
        // Update existing Attendance
        this.update = function(selectedAttendance) {
            var attendance = selectedAttendance;
            attendance.$update(function() {
                $location.path('attendances/' + attendance._id);
}, function(errorResponse) {
    $scope.error = errorResponse.data.message;
    });
};
}
]);

