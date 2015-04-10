'use strict';

module.exports = function(app) {
	var attendances = require('../../app/controllers/attendances.server.controller');

	// Attendances Routes
	app.route('/attendances')
		.get(attendances.list)
		.post(attendances.create);

	app.route('/attendances/:attendanceId')
		.get(attendances.read)
		.put(attendances.update)
		.delete(attendances.delete);

    app.route('/todays-roster/:childID')
        .get(attendances.read);
        
    app.route('/sign-out-list')
    	.get(attendances.attendanceByDate);

	// Finish by binding the Attendance middleware
	app.param('attendanceId', attendances.attendanceByID);
};
