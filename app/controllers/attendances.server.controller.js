'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Attendance = mongoose.model('Attendance'),
	_ = require('lodash');

/**
 * Create a Attendance
 */
exports.create = function(req, res) {
	var attendance = new Attendance(req.body);
    console.log(attendance);
	attendance.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(attendance);
		}
	});
};

/**
 * Show the current Attendance
 */
exports.read = function(req, res) {
	res.jsonp(req.attendance);
};

/**
 * Update a Attendance
 */
exports.update = function(req, res) {
	var attendance = req.attendance ;

	attendance = _.extend(attendance , req.body);

	attendance.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(attendance);
		}
	});
};

/**
 * Delete an Attendance
 */
exports.delete = function(req, res) {
	var attendance = req.attendance ;

	attendance.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(attendance);
		}
	});
};

/**
 * List of Attendances
 */
exports.list = function(req, res) { 
	Attendance.find().sort('-created').populate('user', 'displayName').exec(function(err, attendances) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(attendances);
		}
	});
};

/**
 * Attendance middleware
 */
exports.attendanceByID = function(req, res, next, id) { 
	Attendance.findById(id).populate('user', 'displayName').exec(function(err, attendance) {
		if (err) return next(err);
		if (! attendance) return next(new Error('Failed to load Attendance ' + id));
		req.attendance = attendance ;
		next();
	});
};
/**
 * More Attendance middleware
 */
 exports.attendanceByDate = function(req,res,next){
 	var d = new Date().getDate();
 	var m = new Date().getMonth();
 	m = m+1;
 	var y = new Date().getFullYear();
 	Attendance.find().where({date: {day: d, month: m, year: y}}).exec(function(err,attendances){
 		if(err){
 			return res.status(400).send({
 				message: errorHandler.getErrorMessage(err)
 			});
 		} else {
 			res.jsonp(attendances);
 		}
 	});
 };
/**
 * Attendance authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.attendance.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
