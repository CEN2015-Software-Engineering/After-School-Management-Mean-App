'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var sidebars = require('../../app/controllers/sidebars.server.controller');

	// Sidebars Routes
	app.route('/sidebars')
		.get(sidebars.list)
		.post(users.requiresLogin, sidebars.create);

	app.route('/sidebars/:sidebarId')
		.get(sidebars.read)
		.put(users.requiresLogin, sidebars.hasAuthorization, sidebars.update)
		.delete(users.requiresLogin, sidebars.hasAuthorization, sidebars.delete);

	// Finish by binding the Sidebar middleware
	app.param('sidebarId', sidebars.sidebarByID);
};
