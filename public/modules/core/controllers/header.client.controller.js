'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Menus',
	function($scope, Menus) {
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
		$scope.doTheBack = function() {
			window.history.back();
		};

		$scope.goHome = function() {
			window.location.href = '/#!/';
		};
	}
]);
