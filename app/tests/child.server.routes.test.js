'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Child = mongoose.model('Child'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, child;

/**
 * Child routes tests
 */
describe('Child CRUD tests', function() {
	beforeEach(function(done) {
		// Save a user to the test db and create new Child
		child = {
			firstName: 'James',
			lastName: 'Sucks',
            contact: {
                email: 'james.Sucks@gmail.com'
            }
		};

		done();
	});

	it('should be able to save Child instance', function(done) {
			agent.post('/children')
				.send(child)
				.expect(200)
				.end(function(childSaveErr, childSaveRes) {
					// Handle Child save error
					if (childSaveErr) done(childSaveErr);

					// Get a list of Children
					agent.get('/children')
						.end(function(childrenGetErr, childrenGetRes) {
							// Handle Child save error
							if (childrenGetErr) done(childrenGetErr);

							// Get Children list
							var children = childrenGetRes.body;

							// Set assertions
							(children[0].lastName).should.equal(child.lastName);
							(children[0].firstName).should.match(child.firstName);

							// Call the assertion
							done();
						});
			});
	});


	it('should not be able to save Child instance if no name is provided', function(done) {
		// Invalidate name field
		child.firstName = '';

		// Save a new Child
		agent.post('/children')
			.send(child)
			.expect(400)
			.end(function(childSaveErr, childSaveRes) {
				// Set message assertion
				(childSaveRes.body.message).should.match('Please fill Child name');

				// Handle Child save error
				done(childSaveErr);
			});
	});

	it('should be able to update Child', function(done) {
            //give james his name back
            child.firstName = 'james';

            // Save a new Child
			agent.post('/children')
				.send(child)
				.expect(200)
				.end(function(childSaveErr, childSaveRes) {
					// Handle Child save error
					if (childSaveErr) done(childSaveErr);

					// Update Child name
					child.firstName = 'WHY YOU GOTTA BE SO MEAN?';

					// Update existing Child
					agent.put('/children/' + childSaveRes.body._id)
						.send(child)
						.expect(200)
						.end(function(childUpdateErr, childUpdateRes) {
							// Handle Child update error
							if (childUpdateErr) done(childUpdateErr);

							// Set assertions
							(childUpdateRes.body._id).should.equal(childSaveRes.body._id);
							(childUpdateRes.body.firstName).should.match('WHY YOU GOTTA BE SO MEAN?');

							// Call the assertion callback
							done();
						});
			});
	});

	it('should be able to get a list of Children anytime', function(done) {
		// Create new Child model instance
		var childObj = new Child(child);

		// Save the Child
		childObj.save(function() {
			// Request Children
			request(app).get('/children')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Child', function(done) {
		// Create new Child model instance
		var childObj = new Child(child);

		// Save the Child
		childObj.save(function() {
			request(app).get('/children/' + childObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('firstName', child.firstName);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Child instance', function(done) {
			// Save a new Child
			agent.post('/children')
				.send(child)
				.expect(200)
				.end(function(childSaveErr, childSaveRes) {
					// Handle Child save error
					if (childSaveErr) done(childSaveErr);

					// Delete existing Child
					agent.delete('/children/' + childSaveRes.body._id)
						.send(child)
						.expect(200)
						.end(function(childDeleteErr, childDeleteRes) {
							// Handle Child error error
							if (childDeleteErr) done(childDeleteErr);

							// Set assertions
							(childDeleteRes.body._id).should.equal(childSaveRes.body._id);

							// Call the assertion callback
							done();
						});

			});
	});


	afterEach(function(done) {
		User.remove().exec();
		Child.remove().exec();
		done();
	});
});