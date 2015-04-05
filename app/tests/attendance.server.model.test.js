'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Attendance = mongoose.model('Attendance');

/**
 * Globals
 */
var  attendance;

/**
 * Unit tests
 */
describe('Attendance Model Unit Tests:', function() {
	beforeEach(function(done) {
            this.timeout(0);
            attendance = new Attendance({
			    name: 'Well Named Event',
                date: {
                    day: 1,
                    month: 4,
                    year: 2015
                },
                time: {
                    hr: '6',
                    mine: '0',
                    timeSuffix: 'PM'
                },
                description: 'This is very descriptive',
                PDFDoc: {
                    iPDF: false,
                    linkToPDF: ''
                }
            });
            attendance.signout.created = new Date();
	        done();
    });

	describe('Testing attendance model Save Function, Required Name', function() {
		it('should be able to save without problems', function(done) {
			this.timeout(0);
			return attendance.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without fname', function(done) {
			attendance.name = '';
            this.timeout(0);

			return attendance.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

    

	afterEach(function(done) { 
		Attendance.remove().exec();

		done();
	});
});
