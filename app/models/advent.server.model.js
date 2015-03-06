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
	date: {
		day: {
			type: Number
		},
		month: {
			type: Number
		},
		year: {
			type: Number
		}
	},
	description: {
		type: String,
		default: ''
	},
	
});

mongoose.model('Advent', AdventSchema);