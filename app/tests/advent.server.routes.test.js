'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Advent = mongoose.model('Advent'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, advent;

/**
 * Advent routes tests
 */
describe('Advent CRUD tests', function() {
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

		// Save a user to the test db and create new Advent
		user.save(function() {
			advent = {
				name: 'Advent Name'
			};

			done();
		});
	});

	it('should be able to save Advent instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advent
				agent.post('/advents')
					.send(advent)
					.expect(200)
					.end(function(adventSaveErr, adventSaveRes) {
						// Handle Advent save error
						if (adventSaveErr) done(adventSaveErr);

						// Get a list of Advents
						agent.get('/advents')
							.end(function(adventsGetErr, adventsGetRes) {
								// Handle Advent save error
								if (adventsGetErr) done(adventsGetErr);

								// Get Advents list
								var advents = adventsGetRes.body;

								// Set assertions
								(advents[0].user._id).should.equal(userId);
								(advents[0].name).should.match('Advent Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Advent instance if not logged in', function(done) {
		agent.post('/advents')
			.send(advent)
			.expect(401)
			.end(function(adventSaveErr, adventSaveRes) {
				// Call the assertion callback
				done(adventSaveErr);
			});
	});

	it('should not be able to save Advent instance if no name is provided', function(done) {
		// Invalidate name field
		advent.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advent
				agent.post('/advents')
					.send(advent)
					.expect(400)
					.end(function(adventSaveErr, adventSaveRes) {
						// Set message assertion
						(adventSaveRes.body.message).should.match('Please fill Advent name');
						
						// Handle Advent save error
						done(adventSaveErr);
					});
			});
	});

	it('should be able to update Advent instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advent
				agent.post('/advents')
					.send(advent)
					.expect(200)
					.end(function(adventSaveErr, adventSaveRes) {
						// Handle Advent save error
						if (adventSaveErr) done(adventSaveErr);

						// Update Advent name
						advent.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Advent
						agent.put('/advents/' + adventSaveRes.body._id)
							.send(advent)
							.expect(200)
							.end(function(adventUpdateErr, adventUpdateRes) {
								// Handle Advent update error
								if (adventUpdateErr) done(adventUpdateErr);

								// Set assertions
								(adventUpdateRes.body._id).should.equal(adventSaveRes.body._id);
								(adventUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Advents if not signed in', function(done) {
		// Create new Advent model instance
		var adventObj = new Advent(advent);

		// Save the Advent
		adventObj.save(function() {
			// Request Advents
			request(app).get('/advents')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Advent if not signed in', function(done) {
		// Create new Advent model instance
		var adventObj = new Advent(advent);

		// Save the Advent
		adventObj.save(function() {
			request(app).get('/advents/' + adventObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', advent.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Advent instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advent
				agent.post('/advents')
					.send(advent)
					.expect(200)
					.end(function(adventSaveErr, adventSaveRes) {
						// Handle Advent save error
						if (adventSaveErr) done(adventSaveErr);

						// Delete existing Advent
						agent.delete('/advents/' + adventSaveRes.body._id)
							.send(advent)
							.expect(200)
							.end(function(adventDeleteErr, adventDeleteRes) {
								// Handle Advent error error
								if (adventDeleteErr) done(adventDeleteErr);

								// Set assertions
								(adventDeleteRes.body._id).should.equal(adventSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Advent instance if not signed in', function(done) {
		// Set Advent user 
		advent.user = user;

		// Create new Advent model instance
		var adventObj = new Advent(advent);

		// Save the Advent
		adventObj.save(function() {
			// Try deleting Advent
			request(app).delete('/advents/' + adventObj._id)
			.expect(401)
			.end(function(adventDeleteErr, adventDeleteRes) {
				// Set message assertion
				(adventDeleteRes.body.message).should.match('User is not logged in');

				// Handle Advent error error
				done(adventDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Advent.remove().exec();
		done();
	});
});