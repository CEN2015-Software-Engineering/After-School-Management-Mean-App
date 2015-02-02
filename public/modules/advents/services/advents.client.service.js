'use strict';

//Advents service used to communicate Advents REST endpoints
angular.module('advents').factory('Advents', ['$resource',
	function($resource) {
		return $resource('advents/:adventId', { adventId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);