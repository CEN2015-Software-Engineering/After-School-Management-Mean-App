'use strict';

module.exports = function(app) {
	var medicals = require('../../app/controllers/medicals.server.controller');

	// Medicals Routes
	app.route('/medicals')
		.get(medicals.list)
		.post(medicals.create);

	app.route('/medicals/:medicalId')
		.get(medicals.read)
		.put(medicals.update)
		.delete(medicals.delete);

	// Finish by binding the Medical middleware
	app.param('medicalId', medicals.medicalByID);
};
