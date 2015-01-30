'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Child = mongoose.model('Child'),
	_ = require('lodash');

/**
 * Create a Child
 */
exports.create = function(req, res) {
	var child = new Child(req.body);

	child.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(child);
		}
	});
};

/**
 * Show the current Child
 */
exports.read = function(req, res) {
	res.jsonp(req.child);
};

/**
 * Update a Child
 */
exports.update = function(req, res) {
	var child = req.child ;

	child = _.extend(child , req.body);

	child.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(child);
		}
	});
};

/**
 * Delete an Child
 */
exports.delete = function(req, res) {
	var child = req.child ;

	child.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(child);
		}
	});
};

/**
 * List of Children
 */
exports.list = function(req, res) { 
	Child.find().sort('-created').exec(function(err, children) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(children);
		}
	});
};

/**
 * Child middleware
 */
exports.childByID = function(req, res, next, id) { 
	Child.findById(id).populate('name').exec(function(err, child) {
		if (err) return next(err);
		if (! child) return next(new Error('Failed to load Child ' + id));
		req.child = child ;
		next();
	});
};

