'use strict';

//Guardians service used to communicate Guardians REST endpoints
angular.module('guardians').factory('Guardians', ['$resource',
	function($resource) {
		return $resource('guardians/:guardianId', { guardianId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);