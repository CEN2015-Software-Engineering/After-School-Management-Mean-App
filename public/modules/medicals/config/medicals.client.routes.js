'use strict';

//Setting up route
angular.module('medicals').config(['$stateProvider',
	function($stateProvider) {
		// Medicals state routing
		$stateProvider.
		state('listMedicals', {
			url: '/medicals',
			templateUrl: 'modules/medicals/views/list-medicals.client.view.html'
		}).
		state('createMedical', {
			url: '/medicals/create',
			templateUrl: 'modules/medicals/views/create-medical.client.view.html'
		}).
		state('viewMedical', {
			url: '/medicals/:medicalId',
			templateUrl: 'modules/medicals/views/view-medical.client.view.html'
		}).
		state('editMedical', {
			url: '/medicals/:medicalId/edit',
			templateUrl: 'modules/medicals/views/edit-medical.client.view.html'
		});
	}
]);