'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var advents = require('../../app/controllers/advents.server.controller');

	// Advents Routes
	app.route('/advents')
		.get(advents.list)
		.post(users.requiresLogin, advents.create);

	app.route('/advents/:adventId')
		.get(advents.read)
		.put(users.requiresLogin, advents.hasAuthorization, advents.update)
		.delete(users.requiresLogin, advents.hasAuthorization, advents.delete);

	// Finish by binding the Advent middleware
	app.param('adventId', advents.adventByID);
};
