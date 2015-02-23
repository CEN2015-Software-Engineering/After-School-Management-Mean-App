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
           this.timeout(0);

			child = new Child({
				firstName: 'Tom',
				lastName: 'Jones',
                enrolled: false,
                contact: {
                    email:'tom.jones@gmail.com',
                    home:'1234561234',
                    work:'7894561234',
                    address:'202 working lane, gvill, Fl 32612'
                },
                dob: {
                    month: 10,
                    day: 10,
                    year: 1994

                },
                schoolName: 'the cool school',
                size: 'medium',
                schedule: {
                    mon: false,
                    tue: false,
                    wed: false,
                    thu: false,
                    fri: false,
                    sat: false,
                    sun: false
                }
			});
        child.created = new Date();
        child.updated = new Date();
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

		it('should be able to show an error when try to save without fname', function(done) {
			child.firstName = '';
            this.timeout(0);

			return child.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

    describe('Testing child model, email is correctly created and validated', function() {
        it('should be able to save without problems', function(done) {
            child.contact.email = 'tom.jones@gmail.com';
            this.timeout(0);

            return child.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save with incorrect email format', function(done) {
            child.contact.email = 'tom.jones.gmail.com';

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