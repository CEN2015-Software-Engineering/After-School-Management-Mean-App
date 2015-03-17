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
	isUnlocked: {
		type: Boolean,
		default: false
	},
	pin: {
		type: Number,
		default: 1234
	},
	timeChanged: {
		type: Date,
		default: null
	}
});

mongoose.model('Sidebar', SidebarSchema);