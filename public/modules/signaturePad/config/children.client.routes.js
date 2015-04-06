'use strict';

//Setting up route
angular.module('children').config(['$stateProvider',
	function($stateProvider) {
		// Children state routing
		$stateProvider.
		state('viewSignaturePad', {
			url: '/signaturePad',
			templateUrl: 'modules/signaturePad/views/test-signing.client.view.html'
		});
	}
]);