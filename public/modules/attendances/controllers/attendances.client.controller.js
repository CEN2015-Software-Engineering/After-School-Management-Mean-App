'use strict';

// Attendances controller
angular.module('attendances').controller('AttendancesController', ['$scope', '$stateParams', '$location', 'Attendances', '$modal', '$log',
	function($scope, $stateParams, $location, Attendances, $modal, $log) {

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

        // Find an Attendance that occurs today
        this.attendingToday = function(attendance){
            console.log(attendance.childID);
            if( (attendance.date.day === $scope.day) && (attendance.date.month === $scope.month+1) && (attendance.date.year === $scope.year) ){
                return true;
            }
            else{
                return false;
            }
        };

	}
]);

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