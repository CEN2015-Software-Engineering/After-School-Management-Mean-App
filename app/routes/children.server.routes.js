'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var children = require('../../app/controllers/children.server.controller');

	// Children Routes
	app.route('/children')
		.get(children.list)
		.post(users.requiresLogin, children.create);

	app.route('/children/:childId')
		.get(children.read)
		.put(users.requiresLogin, children.hasAuthorization, children.update)
		.delete(users.requiresLogin, children.hasAuthorization, children.delete);

	// Finish by binding the Child middleware
	app.param('childId', children.childByID);
};
