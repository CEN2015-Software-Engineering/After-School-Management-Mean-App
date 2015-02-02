'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Guardian Schema
 */
var GuardianSchema = new Schema({
	gName: {
		type: String,
		default: '',
		required: 'Please fill Guardian name',
		trim: true
	},
	rel: {
		type: String
	},
	num: {
		type: Number
	},
	created: {
		type: Date,
		default: Date.now
	},
	childID: {
		type: String
	}
});


mongoose.model('Guardian', GuardianSchema);