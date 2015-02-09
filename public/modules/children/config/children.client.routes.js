'use strict';

//Setting up route
angular.module('children').config(['$stateProvider',
	function($stateProvider) {
		// Children state routing
		$stateProvider.
		state('todays-roster', {
			url: '/todays-roster',
			templateUrl: 'modules/children/views/todays-roster.client.view.html'
		}).
		state('listChildren', {
			url: '/children',
			templateUrl: 'modules/children/views/list-children.client.view.html'
		}).
		state('createChild', {
			url: '/children/create',
			templateUrl: 'modules/children/views/create-child.client.view.html'
		}).
		state('viewChild', {
			url: '/children/:childId',
			templateUrl: 'modules/children/views/view-child.client.view.html'
		}).
		state('signOutChild', {
			url: '/todays-roster/:childId',
			templateUrl: 'modules/children/views/sign-out-child.client.view.html'
		}).
		state('editChild', {
			url: '/children/:childId/edit',
			templateUrl: 'modules/children/views/edit-child.client.view.html'
		});
	}
]);