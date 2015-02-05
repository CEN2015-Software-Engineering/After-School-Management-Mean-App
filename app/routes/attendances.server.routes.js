'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var attendances = require('../../app/controllers/attendances.server.controller');

	// Attendances Routes
	app.route('/attendances')
		.get(attendances.list)
		.post(attendances.create);

	app.route('/attendances/:attendanceId')
		.get(attendances.read)
		.put(attendances.update)
		.delete(attendances.delete);

	// Finish by binding the Attendance middleware
	app.param('attendanceId', attendances.attendanceByID);
};
