'use strict';

// Configuring the Articles module
angular.module('advents').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Advents', 'advents', 'dropdown', '/advents(/create)?');
		Menus.addSubMenuItem('topbar', 'advents', 'List Advents', 'advents');
		Menus.addSubMenuItem('topbar', 'advents', 'New Advent', 'advents/create');
	}
]);