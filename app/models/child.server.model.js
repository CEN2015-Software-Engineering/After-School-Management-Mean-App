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
			type: Boolean,
			default: false
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
	updated: {
		type: Date,
		default: Date.now
	}
});

ChildSchema.methods.age = function() {
	//var birthday = new Date(this.dob.year, this.dob.month, this.dob.day);
	//console.log(birthday);
	return 5;
};

mongoose.model('Child', ChildSchema);