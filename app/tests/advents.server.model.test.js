'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Advents = mongoose.model('Advent');

/**
 * Globals
 */
var  advents;

/**
 * Unit tests
 */
describe('Advents Model Unit Tests:', function() {
	beforeEach(function(done) {
            this.timeout(0);
            advents = new Advents({
			    name: 'Well Named Event',
                date: {
                    day: 1,
                    month: 4,
                    year: 2015
                },
                time: {
                    hr: 6,
                    mine: 0,
                    timeSuffix: 'PM'
                },
                description: 'This is very descriptive',
                PDFDoc: {
                    iPDF: false,
                    linkToPDF: ''
                }
            });
            advents.created = new Date();
	        done();
    });

	describe('Testing advents model Save Function, Required Name', function() {
		it('should be able to save without problems', function(done) {
			this.timeout(0);
			return advents.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without fname', function(done) {
		 advents.name = '';
            this.timeout(0);

			return advents.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

    

	afterEach(function(done) { 
		Advents.remove().exec();

		done();
	});
});
