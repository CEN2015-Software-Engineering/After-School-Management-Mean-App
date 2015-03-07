'use strict';

// Configuring the Articles module
angular.module('guardians').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Guardians', 'guardians', 'dropdown', '/guardians');
		Menus.addSubMenuItem('topbar', 'guardians', 'List Guardians', 'guardians');
	}
]);