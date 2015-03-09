'use strict';

module.exports = function(app) {
	var advents = require('../../app/controllers/advents.server.controller');

	// Advents Routes
	app.route('/advents')
		.get(advents.list)
		.post(advents.create);

	app.route('/advents/:adventId')
		.get(advents.read)
		.put(advents.update)
		.delete(advents.delete);

	// Finish by binding the Advent middleware
	app.param('adventId', advents.adventByID);
};
