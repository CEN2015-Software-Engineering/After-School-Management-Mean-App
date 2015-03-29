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
			required: 'Please add day',
			type: Number
		},
		month: {
			required: 'Please add month',
			type: Number
		},
		year: {
			required: 'Please add year',
			type: Number
		}
	},
    time:{
        hr: {
        	required: 'Please add hour',
            type: Number
        },
        min: {
        	required: 'Please add minute',
            type: Number
        },
        timeSuffix: {
        	required: 'Please add AM/PM',
            type: String,
            default: 'PM'
        }
    },
	description: {
		type: String,
		default: ''
	},
    PDFDoc: {
        iPDF: {
            type: Boolean,
            default: false
        },
        linkToPDF: {
            type: String,
            default: ''
        }
    }
	
});

mongoose.model('Advent', AdventSchema);