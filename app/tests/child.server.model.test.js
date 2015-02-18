'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Child = mongoose.model('Child');

/**
 * Globals
 */
var  child;

/**
 * Unit tests
 */
describe('Child Model Unit Tests:', function() {
	beforeEach(function(done) {

			child = new Child({
				firstName: 'Tom',
				lastName: 'Jones'
			});
			done();
	});

	describe('Testing child model, FName is required on Method Save', function() {
		it('should be able to save without problems', function(done) {
			this.timeout(0);
			return child.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			child.firstName = '';

			return child.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Child.remove().exec();

		done();
	});
});