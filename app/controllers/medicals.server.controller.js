'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Medical = mongoose.model('Medical'),
	_ = require('lodash');

/**
 * Create a Medical
 */
exports.create = function(req, res) {
	var medical = new Medical(req.body);

	medical.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medical);
		}
	});
};

/**
 * Show the current Medical
 */
exports.read = function(req, res) {
	res.jsonp(req.medical);
};

/**
 * Update a Medical
 */
exports.update = function(req, res) {
	var medical = req.medical ;

	medical = _.extend(medical , req.body);

	medical.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medical);
		}
	});
};

/**
 * Delete an Medical
 */
exports.delete = function(req, res) {
	var medical = req.medical ;

	medical.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medical);
		}
	});
};

/**
 * List of Medicals
 */
exports.list = function(req, res) { 
	Medical.find().sort('-created').populate('user', 'displayName').exec(function(err, medicals) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medicals);
		}
	});
};

/**
 * Medical middleware
 */
exports.medicalByID = function(req, res, next, id) { 
	Medical.findById(id).populate('user', 'displayName').exec(function(err, medical) {
		if (err) return next(err);
		if (! medical) return next(new Error('Failed to load Medical ' + id));
		req.medical = medical ;
		next();
	});
};

/**
 * Medical authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.medical.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
