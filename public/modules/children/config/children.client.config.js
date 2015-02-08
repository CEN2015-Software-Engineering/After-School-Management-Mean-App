'use strict';

// Configuring the Articles module
angular.module('children').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Roster', 'children', 'dropdown', '/children(/create)?');
		Menus.addSubMenuItem('topbar', 'children', 'Today\'s Roster', 'children');
		Menus.addSubMenuItem('topbar', 'children', 'List All Children', 'children');
		Menus.addSubMenuItem('topbar', 'children', 'New Child', 'children/create');
	}
]);