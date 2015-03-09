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
<<<<<<< HEAD
=======
        },
        /*Updated from here down so this can be used to track attendance to events as well*/
        adventB:{
            type: Boolean,//true means the attendance was for an event false means for class
            default: false
        },
        adventID:{
            type: String,
            default: ''
>>>>>>> 5aa84bfc1797007722e2ec9e5e81a5743393c624
        }
    },
    /*Updated from here down so this can be used to track attendance to events as well*/
    advent: {
        type: Boolean,//true means the attendance was for an event false means for class
        default: false
    },
    adventID: {
        type: String,
        default: ''
    }
});

mongoose.model('Attendance', AttendanceSchema);