'use strict';

module.exports = function(app) {
	var children = require('../../app/controllers/children.server.controller');
	var guardians = require('../../app/controllers/guardians.server.controller');

	// Guardians Routes
	app.route('/guardians')
		.get(guardians.list)
		.post(guardians.create);

	app.route('/children/addGuardian/:childId')
		.post(guardians.create);

	app.route('/guardians/:guardianId')
		.get(guardians.read)
		.put(guardians.update)
		.delete(guardians.delete);

	// Finish by binding the Guardian middleware
	app.param('guardianId', guardians.guardianByID);
};
