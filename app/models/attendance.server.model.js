'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Attendance Schema
 */
var AttendanceSchema = new Schema({
    childID: {
        type: String,
        required: ''
    },
    childName: {
        type: String,
        required: ''
    },
    date: {
        day: {
            type: Number,
            required: ''
        },
        month: {
            type: Number,
            required: ''
        },
        year: {
            type: Number,
            required: ''
        }
    },
    absent: {
        type: Boolean,
        default: false,
        required: ''
    },
    unscheduled: {
        type: Boolean
    },
    signout: {
        timestamp: {
            type: Date
        },
        guardID: {
            type: String
        },
        override: {
            type: Boolean
        }
    },
    eventID: {
        type: String
    }
});

mongoose.model('Attendance', AttendanceSchema);