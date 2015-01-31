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

		// Save a user to the test db and create new Child
		user.save(function() {
			child = {
				name: 'Child Name'
			};

			done();
		});
	});

	it('should be able to save Child instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Child
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
								(children[0].user._id).should.equal(userId);
								(children[0].name).should.match('Child Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Child instance if not logged in', function(done) {
		agent.post('/children')
			.send(child)
			.expect(401)
			.end(function(childSaveErr, childSaveRes) {
				// Call the assertion callback
				done(childSaveErr);
			});
	});

	it('should not be able to save Child instance if no name is provided', function(done) {
		// Invalidate name field
		child.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

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
	});

	it('should be able to update Child instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Child
				agent.post('/children')
					.send(child)
					.expect(200)
					.end(function(childSaveErr, childSaveRes) {
						// Handle Child save error
						if (childSaveErr) done(childSaveErr);

						// Update Child name
						child.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Child
						agent.put('/children/' + childSaveRes.body._id)
							.send(child)
							.expect(200)
							.end(function(childUpdateErr, childUpdateRes) {
								// Handle Child update error
								if (childUpdateErr) done(childUpdateErr);

								// Set assertions
								(childUpdateRes.body._id).should.equal(childSaveRes.body._id);
								(childUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Children if not signed in', function(done) {
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


	it('should be able to get a single Child if not signed in', function(done) {
		// Create new Child model instance
		var childObj = new Child(child);

		// Save the Child
		childObj.save(function() {
			request(app).get('/children/' + childObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', child.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Child instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

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
	});

	it('should not be able to delete Child instance if not signed in', function(done) {
		// Set Child user 
		child.user = user;

		// Create new Child model instance
		var childObj = new Child(child);

		// Save the Child
		childObj.save(function() {
			// Try deleting Child
			request(app).delete('/children/' + childObj._id)
			.expect(401)
			.end(function(childDeleteErr, childDeleteRes) {
				// Set message assertion
				(childDeleteRes.body.message).should.match('User is not logged in');

				// Handle Child error error
				done(childDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Child.remove().exec();
		done();
	});
});