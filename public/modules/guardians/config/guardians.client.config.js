'use strict';

// Configuring the Articles module
angular.module('guardians').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Guardians', 'guardians', 'dropdown', '/guardians(/create)?');
		Menus.addSubMenuItem('topbar', 'guardians', 'List Guardians', 'guardians');
		Menus.addSubMenuItem('topbar', 'guardians', 'New Guardian', 'guardians/create');
	}
]);