'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Guardian = mongoose.model('Guardian'),
	_ = require('lodash');

/**
 * Create a Guardian
 */
exports.create = function(req, res) {
	var guardian = new Guardian(req.body);

	guardian.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guardian);
		}
	});
};

/**
 * Show the current Guardian
 */
exports.read = function(req, res) {
	res.jsonp(req.guardian);
};

/**
 * Update a Guardian
 */
exports.update = function(req, res) {
	var guardian = req.guardian ;

	guardian = _.extend(guardian , req.body);

	guardian.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guardian);
		}
	});
};

/**
 * Delete an Guardian
 */
exports.delete = function(req, res) {
	var guardian = req.guardian ;

	guardian.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guardian);
		}
	});
};

/**
 * List of Guardians
 */
exports.list = function(req, res) { 
	Guardian.find().sort('+gName').populate('user', 'displayName').exec(function(err, guardians) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guardians);
		}
	});
};

/**
 * List by ChildID
 */
//Method that probably doesn't do any anything
exports.listByChildID = function(req, res, childID){
	Guardian.find().sort('+gName').where({childID: childID}).exec(function(err, guardians) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guardians);
		}
	});
};

/**
 * Guardian middleware
 */
exports.guardianByID = function(req, res, next, id) {
	Guardian.findById(id).populate('user', 'displayName').exec(function(err, guardian) {
		if (err) return next(err);
		if (! guardian) return next(new Error('Failed to load Guardian ' + id));
		req.guardian = guardian ;
		next();
	});
};


/**
 * Guardian authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.guardian.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
