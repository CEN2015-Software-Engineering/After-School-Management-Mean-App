'use strict';

//Setting up route
angular.module('attendances').config(['$stateProvider',
	function($stateProvider) {
		// Attendances state routing
		$stateProvider.
		state('listAttendances', {
			url: '/attendances',
			templateUrl: 'modules/attendances/views/list-attendances.client.view.html'
		}).
		state('createAttendance', {
			url: '/attendances/create',
			templateUrl: 'modules/attendances/views/create-attendance.client.view.html'
		}).
		state('viewAttendance', {
			url: '/attendances/:attendanceId',
			templateUrl: 'modules/attendances/views/view-attendance.client.view.html'
		}).
		state('editAttendance', {
			url: '/attendances/:attendanceId/edit',
			templateUrl: 'modules/attendances/views/edit-attendance.client.view.html'
		});
	}
]);