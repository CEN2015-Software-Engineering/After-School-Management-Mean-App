'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Advent = mongoose.model('Advent'),
	_ = require('lodash');

/**
 * Create a Advent
 */
exports.create = function(req, res) {
	var advent = new Advent(req.body);

	advent.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advent);
		}
	});
};

/**
 * Show the current Advent
 */
exports.read = function(req, res) {
	res.jsonp(req.advent);
};

/**
 * Update a Advent
 */
exports.update = function(req, res) {
	var advent = req.advent ;

	advent = _.extend(advent , req.body);

	advent.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advent);
		}
	});
};

/**
 * Delete an Advent
 */
exports.delete = function(req, res) {
	var advent = req.advent ;

	advent.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advent);
		}
	});
};

/**
 * List of Advents
 */
exports.list = function(req, res) { 
	Advent.find().sort('-created').populate('user', 'displayName').exec(function(err, advents) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advents);
		}
	});
};

/**
 * Advent middleware
 */
exports.adventByID = function(req, res, next, id) { 
	Advent.findById(id).populate('user', 'displayName').exec(function(err, advent) {
		if (err) return next(err);
		if (! advent) return next(new Error('Failed to load Advent ' + id));
		req.advent = advent ;
		next();
	});
};

/**
 * Advent authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.advent.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
