'use strict';

module.exports = function(app) {
	var guardians = require('../../app/controllers/guardians.server.controller');
	var children = require('../../app/controllers/children.server.controller');

	// Children Routes
	app.route('/children')
		.get(children.list)
		.post(children.create);

	app.route('/todays-roster/:childId')
		.get(children.read);

	app.route('/children/:childId')
		.get(children.read)
		.put(children.update)
		.delete(children.delete);

	app.route('/children/addGuardian/:childId')
		.get(guardians.read)
		.post(guardians.create);

	// Finish by binding the Child middleware
	app.param('childId', children.childByID);
};
