'use strict';

// Attendances controller
angular.module('attendances').controller('AttendancesController', ['$scope', '$stateParams', '$location', 'Attendances',
	function($scope, $stateParams, $location, Attendances) {

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
                adventB: false,
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
        this.markedAbsent = function(childID, attendances){
        	var i = 0;
			  for(i; i < attendances.length; ++i)
			  {
			  	console.log('THIS IS YOUR ATTENDANCE!');
			  	console.log(attendances[i].childID ===childID);
			  	console.log(attendances[i].date.day === $scope.day && attendances[i].date.month === $scope.month+1 && attendances[i].date.year === $scope.year);
			  	console.log(!attendances[i].attended);
			  	console.log(attendances[i]);
			  	if(attendances[i].childID === childID && attendances[i].date.day === $scope.day && attendances[i].date.month === $scope.month+1 && attendances[i].date.year === $scope.year && !attendances[i].attended)
			  	{
			  		console.log('made it here');
			  		return true;
			  	}
			  }
			  return false;

        };
        // Test
        this.aT = function(attendance){
            return true;
        };

	}
]);