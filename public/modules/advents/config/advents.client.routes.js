'use strict';

//Setting up route
angular.module('advents').config(['$stateProvider',
	function($stateProvider) {
		// Advents state routing
		$stateProvider.
		state('listAdvents', {
			url: '/advents',
			templateUrl: 'modules/advents/views/list-advents.client.view.html'
		}).
		state('createAdvent', {
			url: '/advents/create',
			templateUrl: 'modules/advents/views/create-advent.client.view.html'
		}).
		state('viewAdvent', {
			url: '/advents/:adventId',
			templateUrl: 'modules/advents/views/view-advent.client.view.html'
		}).
		state('editAdvent', {
			url: '/advents/:adventId/edit',
			templateUrl: 'modules/advents/views/edit-advent.client.view.html'
		});
	}
]);