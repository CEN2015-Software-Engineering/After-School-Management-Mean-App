

'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Medical = mongoose.model('Medical');

/**
 * Globals
 */
var  medical;

/**
 * Unit tests
 */
describe('Medical Model Unit Tests:', function() {
    beforeEach(function(done) {
        this.timeout(0);

        medical = new Medical({
            name: 'Peanut Allergy',
            type: 'Allergy',
            desc: 'Cannot get near peanuts.',
            childID: '525a8422f6d0f87f0e407a33'
        });
        done();
    });

    describe('Testing Medical Model Save Function, Required Name', function() {
        it('should be able to save without problems', function(done) {
            this.timeout(0);
            return medical.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without name', function(done) {
            medical.name = '';
            this.timeout(0);

            return medical.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    describe('Testing Medical model, childID is correctly created and validated', function() {
        it('should be able to save without problems', function(done) {
            medical.childID = '525a8422f6d0f87f0e407a33';
            this.timeout(0);

            return medical.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save with incorrect email format', function(done) {
            medical.childID = '';

            return medical.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        Medical.remove().exec();

        done();
    });
});