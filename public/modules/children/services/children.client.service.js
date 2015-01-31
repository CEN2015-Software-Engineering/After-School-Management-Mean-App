'use strict';

//Children service used to communicate Children REST endpoints
angular.module('children').factory('Children', ['$resource',
	function($resource) {
		return $resource('children/:childId', { childId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);