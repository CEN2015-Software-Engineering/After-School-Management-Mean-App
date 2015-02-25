'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Medical Schema
 */
var MedicalSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Medical name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Medical', MedicalSchema);