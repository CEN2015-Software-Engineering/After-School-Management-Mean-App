'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Child Schema
 */
var ChildSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Child name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Child', ChildSchema);