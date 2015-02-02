'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var children = require('../../app/controllers/children.server.controller');
	var guardians = require('../../app/controllers/guardians.server.controller');

	// Guardians Routes
	app.route('/guardians')
		.get(guardians.list)
		.post(guardians.create);

	//Created this route for finding parents by childID, no clue if it works
	app.route('/guardians/byChildID/:childID')
		.get(guardians.listByChildID);

	app.route('/guardians/:guardianId')
		.get(guardians.read)
		.put(guardians.update)
		.delete(guardians.delete);

	// Finish by binding the Guardian middleware
	app.param('guardianId', guardians.guardianByID);
};
