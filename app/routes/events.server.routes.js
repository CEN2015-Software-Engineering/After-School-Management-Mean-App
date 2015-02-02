'use strict';

module.exports = function(app) {
	var events = require('../../app/controllers/events.server.controller');

	// Events Routes
	app.route('/events')
		.get(events.list)
		.post(events.create);

	app.route('/events/:eventId')
		.get(events.read)
		.put(events.update)
		.delete(events.delete);

	// Finish by binding the Event middleware
	app.param('eventId', events.eventByID);
};
