'use strict';

//Setting up route
angular.module('children').config(['$stateProvider',
	function($stateProvider) {
		// Children state routing
		$stateProvider.
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
		state('editChild', {
			url: '/children/:childId/edit',
			templateUrl: 'modules/children/views/edit-child.client.view.html'
		}).
		state('addGuardian', {
			url: '/children/addGuardian/:childId',
			templateUrl: 'modules/guardians/views/create-guardian-child-profile.client.view.html'
		});
	}
]);