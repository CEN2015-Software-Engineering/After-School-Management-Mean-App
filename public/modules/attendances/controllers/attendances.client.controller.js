'use strict';

// Attendances controller
angular.module('attendances').controller('AttendancesController', ['$scope', '$stateParams', '$location', 'Attendances',
	function($scope, $stateParams, $location, Attendances) {

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
                absent: this.absent,
                unscheduled: this.unscheduled,
                signout:{
                    timestamp: this.timestamp,
                    guardID: this.guardID,
                    override: this.override
                },
                eventID: this.eventID
			});

			// Redirect after save
			attendance.$save(function(response) {
				$location.path('attendances/' + response._id);

				// Clear form fields
				$scope.name = '';
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
				$location.path('attendances/' + attendance._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Attendances
		$scope.find = function() {
			$scope.attendances = Attendances.query();
		};

		// Find existing Attendance
		$scope.findOne = function() {
			$scope.attendance = Attendances.get({ 
				attendanceId: $stateParams.attendanceId
			});
		};
	}
]);