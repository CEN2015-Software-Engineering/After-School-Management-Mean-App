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
    desc: {
        type: String
    },
    childID: {
        type: String,
        required: 'Can\'t save a disability without a child'
    }
});

mongoose.model('Medical', MedicalSchema);