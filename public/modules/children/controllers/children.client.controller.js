'use strict';

// Children controller
angular.module('children').controller('ChildrenController', ['$scope', '$stateParams', '$location', 'Children',
	function($scope, $stateParams, $location, Children) {
		// Create new Child
		$scope.create = function() {
			// Create new Child object
			console.log(this.email);
			var child = new Children ({
				firstName: this.firstName,
				lastName: this.lastName,
				enrolled: this.enrolled,
				contact: {
					email: this.contact.email,
					home: this.contact.home,
					work: this.contact.work,
					street: this.contact.address.street
				},
				schoolName: this.schoolName,
				size: this.size,
				dob: {
					day: this.dob.day,
					month: this.dob.month,
					year: this.dob.year
				},
				schedule: {
					mon: this.schedule.mon,
					tue: this.schedule.tue,
					wed: this.schedule.wed,
					thu: this.schedule.thu,
					fri: this.schedule.fri,
					sat: this.schedule.sat,
					sun: this.schedule.sun
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
		$scope.remove = function(child) {
			if ( child ) { 
				child.$remove();

				for (var i in $scope.children) {
					if ($scope.children [i] === child) {
						$scope.children.splice(i, 1);
					}
				}
			} else {
				$scope.child.$remove(function() {
					$location.path('children');
				});
			}
		};

		// Update existing Child
		$scope.update = function() {
			var child = $scope.child;

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

	}
]);