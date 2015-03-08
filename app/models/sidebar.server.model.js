'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sidebar Schema
 */
var SidebarSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Sidebar name',
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

mongoose.model('Sidebar', SidebarSchema);