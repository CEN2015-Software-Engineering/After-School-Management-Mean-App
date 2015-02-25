'use strict';

//Medicals service used to communicate Medicals REST endpoints
angular.module('medicals').factory('Medicals', ['$resource',
	function($resource) {
		return $resource('medicals/:medicalId', { medicalId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);