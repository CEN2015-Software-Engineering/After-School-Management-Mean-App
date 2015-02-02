'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Guardian = mongoose.model('Guardian'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, guardian;

/**
 * Guardian routes tests
 */
describe('Guardian CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Guardian
		user.save(function() {
			guardian = {
				name: 'Guardian Name'
			};

			done();
		});
	});

	it('should be able to save Guardian instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Guardian
				agent.post('/guardians')
					.send(guardian)
					.expect(200)
					.end(function(guardianSaveErr, guardianSaveRes) {
						// Handle Guardian save error
						if (guardianSaveErr) done(guardianSaveErr);

						// Get a list of Guardians
						agent.get('/guardians')
							.end(function(guardiansGetErr, guardiansGetRes) {
								// Handle Guardian save error
								if (guardiansGetErr) done(guardiansGetErr);

								// Get Guardians list
								var guardians = guardiansGetRes.body;

								// Set assertions
								(guardians[0].user._id).should.equal(userId);
								(guardians[0].name).should.match('Guardian Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Guardian instance if not logged in', function(done) {
		agent.post('/guardians')
			.send(guardian)
			.expect(401)
			.end(function(guardianSaveErr, guardianSaveRes) {
				// Call the assertion callback
				done(guardianSaveErr);
			});
	});

	it('should not be able to save Guardian instance if no name is provided', function(done) {
		// Invalidate name field
		guardian.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Guardian
				agent.post('/guardians')
					.send(guardian)
					.expect(400)
					.end(function(guardianSaveErr, guardianSaveRes) {
						// Set message assertion
						(guardianSaveRes.body.message).should.match('Please fill Guardian name');
						
						// Handle Guardian save error
						done(guardianSaveErr);
					});
			});
	});

	it('should be able to update Guardian instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Guardian
				agent.post('/guardians')
					.send(guardian)
					.expect(200)
					.end(function(guardianSaveErr, guardianSaveRes) {
						// Handle Guardian save error
						if (guardianSaveErr) done(guardianSaveErr);

						// Update Guardian name
						guardian.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Guardian
						agent.put('/guardians/' + guardianSaveRes.body._id)
							.send(guardian)
							.expect(200)
							.end(function(guardianUpdateErr, guardianUpdateRes) {
								// Handle Guardian update error
								if (guardianUpdateErr) done(guardianUpdateErr);

								// Set assertions
								(guardianUpdateRes.body._id).should.equal(guardianSaveRes.body._id);
								(guardianUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Guardians if not signed in', function(done) {
		// Create new Guardian model instance
		var guardianObj = new Guardian(guardian);

		// Save the Guardian
		guardianObj.save(function() {
			// Request Guardians
			request(app).get('/guardians')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Guardian if not signed in', function(done) {
		// Create new Guardian model instance
		var guardianObj = new Guardian(guardian);

		// Save the Guardian
		guardianObj.save(function() {
			request(app).get('/guardians/' + guardianObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', guardian.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Guardian instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Guardian
				agent.post('/guardians')
					.send(guardian)
					.expect(200)
					.end(function(guardianSaveErr, guardianSaveRes) {
						// Handle Guardian save error
						if (guardianSaveErr) done(guardianSaveErr);

						// Delete existing Guardian
						agent.delete('/guardians/' + guardianSaveRes.body._id)
							.send(guardian)
							.expect(200)
							.end(function(guardianDeleteErr, guardianDeleteRes) {
								// Handle Guardian error error
								if (guardianDeleteErr) done(guardianDeleteErr);

								// Set assertions
								(guardianDeleteRes.body._id).should.equal(guardianSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Guardian instance if not signed in', function(done) {
		// Set Guardian user 
		guardian.user = user;

		// Create new Guardian model instance
		var guardianObj = new Guardian(guardian);

		// Save the Guardian
		guardianObj.save(function() {
			// Try deleting Guardian
			request(app).delete('/guardians/' + guardianObj._id)
			.expect(401)
			.end(function(guardianDeleteErr, guardianDeleteRes) {
				// Set message assertion
				(guardianDeleteRes.body.message).should.match('User is not logged in');

				// Handle Guardian error error
				done(guardianDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Guardian.remove().exec();
		done();
	});
});