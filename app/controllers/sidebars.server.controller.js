'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Sidebar = mongoose.model('Sidebar'),
	_ = require('lodash');

/**
 * Create a Sidebar
 */
exports.create = function(req, res) {
	var sidebar = new Sidebar(req.body);

	sidebar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidebar);
		}
	});
};

/**
 * Show the current Sidebar
 */
exports.read = function(req, res) {
	res.jsonp(req.sidebar);
};

/**
 * Update a Sidebar
 */
exports.update = function(req, res) {
	var sidebar = req.sidebar ;

	sidebar = _.extend(sidebar , req.body);

	sidebar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidebar);
		}
	});
};

/**
 * Delete an Sidebar
 */
exports.delete = function(req, res) {
	var sidebar = req.sidebar ;

	sidebar.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidebar);
		}
	});
};

/**
 * List of Sidebars
 */
exports.list = function(req, res) { 
	Sidebar.find().sort('-created').populate('user', 'displayName').exec(function(err, sidebars) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sidebars);
		}
	});
};

/**
 * Sidebar middleware
 */
exports.sidebarByID = function(req, res, next, id) { 
	Sidebar.findById(id).populate('user', 'displayName').exec(function(err, sidebar) {
		if (err) return next(err);
		if (! sidebar) return next(new Error('Failed to load Sidebar ' + id));
		req.sidebar = sidebar ;
		next();
	});
};

/**
 * Sidebar authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.sidebar.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
