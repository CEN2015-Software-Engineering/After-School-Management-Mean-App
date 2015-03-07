'use strict';

//Setting up route
angular.module('guardians').config(['$stateProvider',
	function($stateProvider) {
		// Guardians state routing
		$stateProvider.
		state('listGuardians', {
			url: '/guardians',
			templateUrl: 'modules/guardians/views/list-guardians.client.view.html'
		}).
		state('viewGuardian', {
			url: '/guardians/:guardianId',
			templateUrl: 'modules/guardians/views/view-guardian.client.view.html'
		}).
		state('editGuardian', {
			url: '/guardians/:guardianId/edit',
			templateUrl: 'modules/guardians/views/edit-guardian.client.view.html'
		});
	}
]);