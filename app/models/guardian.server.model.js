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
		required: 'Please fill Guardian name',
		trim: true
	},
	rel: {
		type: String
	},
	num: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	childID: {
		type: String,
        required: 'Can\'t save a guardian without a child'
	}
});


mongoose.model('Guardian', GuardianSchema);