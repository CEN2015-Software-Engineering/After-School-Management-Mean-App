'use strict';

//Setting up route
angular.module('sidebars').config(['$stateProvider',
	function($stateProvider) {
		// Sidebars state routing
		$stateProvider.
		state('listSidebars', {
			url: '/sidebars',
			templateUrl: 'modules/sidebars/views/list-sidebars.client.view.html'
		}).
		state('createSidebar', {
			url: '/sidebars/create',
			templateUrl: 'modules/sidebars/views/create-sidebar.client.view.html'
		}).
		state('viewSidebar', {
			url: '/sidebars/:sidebarId',
			templateUrl: 'modules/sidebars/views/view-sidebar.client.view.html'
		}).
		state('editSidebar', {
			url: '/sidebars/:sidebarId/edit',
			templateUrl: 'modules/sidebars/views/edit-sidebar.client.view.html'
		});
	}
]);