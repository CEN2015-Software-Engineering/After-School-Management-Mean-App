'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Advent Schema
 */
var AdventSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Advent name',
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

mongoose.model('Advent', AdventSchema);