'use strict';

module.exports = function(app) {
	var sidebars = require('../../app/controllers/sidebars.server.controller');

	// Sidebars Routes
	app.route('/sidebars')
		.get(sidebars.list)
		.post(sidebars.create);

	app.route('/sidebars/:sidebarId')
		.get(sidebars.read)
		.put(sidebars.update)
		.delete(sidebars.delete);

	// Finish by binding the Sidebar middleware
	app.param('sidebarId', sidebars.sidebarByID);
};
