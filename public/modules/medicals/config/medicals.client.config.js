'use strict';

// Configuring the Articles module
angular.module('medicals').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Medicals', 'medicals', 'dropdown', '/medicals(/create)?');
		Menus.addSubMenuItem('topbar', 'medicals', 'List Medicals', 'medicals');
		Menus.addSubMenuItem('topbar', 'medicals', 'New Medical', 'medicals/create');
	}
]);