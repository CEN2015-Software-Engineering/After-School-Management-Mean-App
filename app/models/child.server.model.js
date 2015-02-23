'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    Guardian = require('mongoose').model('Guardian').schema;


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};


/**
 * Child Schema
 */
var ChildSchema = new Schema({
	firstName: {
		type: String,
		required: 'Please fill Child name',
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
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
			//match: [/.+\@.+\..+/, 'Please fill a valid email address'],
			trim: true
		},
		home: {
			type: String
		},
		work: {
			type: String
		},
		address: {
			type: String
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
			type: Boolean,
			default: false
		},
		wed: {
			type: Boolean,
			default: false
		},
		thu: {
			type: Boolean,
			default: false
		},
		fri: {
			type: Boolean,
			default: false
		},
		sat: {
			type: Boolean,
			default: false
		},
		sun: {
			type: Boolean,
			default: false
		}
	},
	signature: {
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
