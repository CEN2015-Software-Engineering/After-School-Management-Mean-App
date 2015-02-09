'use strict';

// Children controller
angular.module('children').controller('TodaysRosterController', ['$scope', '$window', '$stateParams', '$location', 'Children',
	function($scope, $window, $stateParams, $location, Children) {
		// Find a list of Children
		$scope.find = function() {
			$scope.children = Children.query();
			console.log($scope.children);
			$scope.day = moment().format('ddd').toLowerCase();
			console.log($scope.day);
		};
		this.theDate = function() {
			return moment().format('dddd, MMMM Do YYYY');
		};

		this.enrolledToday = function(child){
			if($scope.day === 'sun' && child.schedule.sun){
				return true;
			}else if($scope.day === 'mon' && child.schedule.mon) {
				return true;
			}else if($scope.day === 'tue' && child.schedule.tue){
					return true;
			}else if($scope.day === 'wed' && child.schedule.wed){
				return true;
			}else if($scope.day === 'thu' && child.schedule.thu){
				return true;
			}else if($scope.day === 'fri' && child.schedule.fri){
				return true;
			}else if($scope.day === 'sat' && child.schedule.sat){
				return true;
			}else {
				return false;
			}
		};

		//Is the kid in checkout yet? Function here
	}
]);