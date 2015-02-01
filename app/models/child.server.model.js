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
	firstName: {
		type: String,
		default: '',
		required: 'Please fill Child name',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please fill Child name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	enrolled: {
		type: Boolean,
		default: true
	},
	contact: {
		email: {
			type: String,
			trim: true,
			default: '',
			match: [/.+\@.+\..+/, 'Please fill a valid email address']
		},
		home: {
			type: Number,
			default: 0
		},
		work: {
			type: Number,
			default: 0
		},
		address: {
			street: {
				type: String
			},
			city: {
				type: String
			},
			state: {
				type: String
			},
			zip: {
				type: Number
			},
			unit: {
				type: String
			}
		}
	}
});

mongoose.model('Child', ChildSchema);