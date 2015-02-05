'use strict';

//Attendances service used to communicate Attendances REST endpoints
angular.module('attendances').factory('Attendances', ['$resource',
	function($resource) {
		return $resource('attendances/:attendanceId', { attendanceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);