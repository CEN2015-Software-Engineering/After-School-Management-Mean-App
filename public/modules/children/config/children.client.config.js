'use strict';

// Configuring the Articles module
angular.module('children').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Children', 'children', 'dropdown', '/children(/create)?');
		Menus.addSubMenuItem('topbar', 'children', 'List Children', 'children');
		Menus.addSubMenuItem('topbar', 'children', 'New Child', 'children/create');
	}
]);