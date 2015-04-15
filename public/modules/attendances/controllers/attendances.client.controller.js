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
        this.modalUpdate = function (size, child, selectedAttendance) {
            if( !selectedAttendance ){
                var name = child.firstName + ' ' + child.lastName;
                var attendance = new Attendances({
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
                        time:null,
                        guardian: null
                    },
                    isAdvent: false,
                    signedOut: false
                });
                attendance.$save(function(response) {
                    $location.path('/todays-roster');

                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
                selectedAttendance = attendance;
            }
            var modalInstance = $modal.open({
                templateUrl: '/modules/attendances/views/edit-attendance.client.view.html',
                controller: function ($scope, $modalInstance, $stateParams, attendance) {
                    $scope.attendance = attendance;


                    $scope.ok = function () {
                        $location.path('/todays-roster?');
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
                    // iterate through all children, add if they are able to be signed out
                    for(var i in $scope.childrenTemp){
                        // only check currently enrolled children
                        if( $scope.childrenTemp[i].enrolled) {
                            var childHasAtt = false;
                            for (var j in $scope.attendances) {
                                if ($scope.childrenTemp[i]._id === $scope.attendances[j].childID ) {
                                    childHasAtt = true;
                                    if( $scope.attendances[j].attended && !$scope.attendances[j].signedOut ){
                                        // has existing attendance and should display
                                        $scope.children.push($scope.childrenTemp[i]);
                                        ++$scope.kids;
                                    }
                                    else if( ((!$scope.attendances[j].attended && !$scope.attendances[j].scheduledAbsent ) || $scope.attendances[j].signedOut || $scope.attendances[j].scheduledAbsent) ){
                                        // has existing attendance but shouldn't display
                                        // can probably comment this if statement out
                                    }
                                }
                            }
                            if (!childHasAtt) {
                                // display children who are expected today
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
                    }
                    //these children are eligible to be signed out
                    console.log($scope.children);
                    console.log("kids" + $scope.kids);
                });
            });

        };

        this.getProperTime = function(fulltime) {
            $scope.time = moment(fulltime).format('hh:mm A');
            $timeout(function(){
                $location.path('/#!');
            }, 3000);


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
                var date = new Date;
                console.log(date.toString());
        		attend.signout.time = date.toString();
        		attend.signout.guardian = guardian;
        		attend.signedOut = true;
                $http.put('attendances/' + attend._id, attend);
                $location.path('attendances/' + attend._id);
        	}else{
        		var name = child.firstName + ' ' + child.lastName;
                var date = new Date;
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
                    time: date.toString(),
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
                    $scope.guardians = [];
                    var tempG = data;
                    for (var a in tempG) {
                        if (tempG[a].childID === $scope.child._id) {
                            $scope.guardians.push(tempG[a].gName);
                        }
                    }
                });
            });
        };
        $scope.addClassBoolean = false;
        $scope.createAbsence = function() {
            // Create new Attendance object
            console.log($scope.dt.getMonth() + 1);
            var attendance = new Attendances ({
                childID: $scope.child._id,
                childName: $scope.child.firstName + ' ' + $scope.child.lastName,
                date:{
                    day: $scope.dt.getDate(),
                    month: $scope.dt.getMonth() + 1,
                    year: $scope.dt.getFullYear()
                },
                attended: $scope.addClassBoolean ? true : false,
                scheduledAbsent: $scope.addClassBoolean ? false : true,
                signout:{
                    time: this.time,
                    guardian: this.guardian
                },
                isAdvent: false,
                adventID: this.adventID,
                extraClass: $scope.addClassBoolean ? true : false
            });

            // Redirect after save
            attendance.$save(function(response) {
                $location.path('attendances/' + response._id);

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

    //**DatePicker**//
        $scope.todayPicker = function() {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            $scope.dt = tomorrow;
            console.log("Month: " + $scope.dt.getMonth() + 1);
            console.log("Year: " + $scope.dt.getFullYear());
            console.log("Day: " + $scope.dt.getDate() + 1);
        };
        $scope.todayPicker();

        $scope.clearPicker = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabledPicker = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMinPicker = function() {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            $scope.minDate = $scope.minDate ? null : tomorrow;
        };
        $scope.toggleMinPicker();

        $scope.openPicker = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedPicker = true;
        };

        $scope.dateOptionsPicker = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['MM/dd/yyyy'];
        $scope.format = $scope.formats[0];

}]);


angular.module('attendances').controller('AttendancesUpdateController', ['$scope', '$stateParams', '$location', 'Attendances',
    function($scope, $stateParams, $location, Attendances) {
        // Update existing Attendance
        this.update = function(selectedAttendance) {
            var attendance = selectedAttendance;
            attendance.$update(function() {
                $location.path('todays-roster');
}, function(errorResponse) {
    $scope.error = errorResponse.data.message;
    });
};
}
]);

