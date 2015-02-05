'use strict';

// Configuring the Articles module
angular.module('attendances').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Attendances', 'attendances', 'dropdown', '/attendances(/create)?');
		Menus.addSubMenuItem('topbar', 'attendances', 'List Attendances', 'attendances');
		Menus.addSubMenuItem('topbar', 'attendances', 'New Attendance', 'attendances/create');
	}
]);