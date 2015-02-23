'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Guardian = mongoose.model('Guardian');

/**
 * Globals
 */
var  guardian;

/**
 * Unit tests
 */
describe('Guardian Model Unit Tests:', function() {
    beforeEach(function(done) {
        this.timeout(0);

        guardian = new Guardian({
            gName: 'Susan Sucks',
            rel: 'Mother',
            num: '123-456-7890',
            childID: '525a8422f6d0f87f0e407a33'
        });
        done();
    });

    describe('Testing Guardian Model Save Function, Required Name', function() {
        it('should be able to save without problems', function(done) {
            this.timeout(0);
            return guardian.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without gName', function(done) {
            guardian.gName = '';
            this.timeout(0);

            return guardian.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    describe('Testing Guardian model, childID is correctly created and validated', function() {
        it('should be able to save without problems', function(done) {
            guardian.childID = '525a8422f6d0f87f0e407a33';
            this.timeout(0);

            return guardian.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save with incorrect email format', function(done) {
            guardian.childID = '';

            return guardian.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        Guardian.remove().exec();

        done();
    });
});