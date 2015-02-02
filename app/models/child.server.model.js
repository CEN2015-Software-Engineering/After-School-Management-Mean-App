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
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	enrolled: {
		type: Boolean,
		default: false
	},
	contact: {
		email: {
			type: String,
			default: '',
			match: [/.+\@.+\..+/, 'Please fill a valid email address'],
			trim: true
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
			}
		}
	},
	dob: {
		month: {
			type: Number
		},
		day: {
			type: Number
		},
		year: {
			type: Number
		}

	},
	schoolName: {
		type: String,
		default: 'No School Selected'
	},
	size: {
		type: String,
		default: 'No Size Selected'
	},
	schedule: {
		mon: {
			type: Boolean
		},
		tue: {
			type: Boolean
		},
		wed: {
			type: Boolean
		},
		thu: {
			type: Boolean
		},
		fri: {
			type: Boolean
		},
		sat: {
			type: Boolean
		},
		sun: {
			type: Boolean
		}
	},
	img: {
		//For adding images later
		data: Buffer,
		contentType: String
	},
	updated: {
		type: Date,
		default: Date.now
	}
});


mongoose.model('Child', ChildSchema);