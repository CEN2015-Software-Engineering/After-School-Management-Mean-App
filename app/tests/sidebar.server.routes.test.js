'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Sidebar = mongoose.model('Sidebar'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, sidebar;

/**
 * Sidebar routes tests
 */
describe('Sidebar CRUD tests', function() {
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

		// Save a user to the test db and create new Sidebar
		user.save(function() {
			sidebar = {
				name: 'Sidebar Name'
			};

			done();
		});
	});

	it('should be able to save Sidebar instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sidebar
				agent.post('/sidebars')
					.send(sidebar)
					.expect(200)
					.end(function(sidebarSaveErr, sidebarSaveRes) {
						// Handle Sidebar save error
						if (sidebarSaveErr) done(sidebarSaveErr);

						// Get a list of Sidebars
						agent.get('/sidebars')
							.end(function(sidebarsGetErr, sidebarsGetRes) {
								// Handle Sidebar save error
								if (sidebarsGetErr) done(sidebarsGetErr);

								// Get Sidebars list
								var sidebars = sidebarsGetRes.body;

								// Set assertions
								(sidebars[0].user._id).should.equal(userId);
								(sidebars[0].name).should.match('Sidebar Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Sidebar instance if not logged in', function(done) {
		agent.post('/sidebars')
			.send(sidebar)
			.expect(401)
			.end(function(sidebarSaveErr, sidebarSaveRes) {
				// Call the assertion callback
				done(sidebarSaveErr);
			});
	});

	it('should not be able to save Sidebar instance if no name is provided', function(done) {
		// Invalidate name field
		sidebar.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sidebar
				agent.post('/sidebars')
					.send(sidebar)
					.expect(400)
					.end(function(sidebarSaveErr, sidebarSaveRes) {
						// Set message assertion
						(sidebarSaveRes.body.message).should.match('Please fill Sidebar name');
						
						// Handle Sidebar save error
						done(sidebarSaveErr);
					});
			});
	});

	it('should be able to update Sidebar instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sidebar
				agent.post('/sidebars')
					.send(sidebar)
					.expect(200)
					.end(function(sidebarSaveErr, sidebarSaveRes) {
						// Handle Sidebar save error
						if (sidebarSaveErr) done(sidebarSaveErr);

						// Update Sidebar name
						sidebar.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Sidebar
						agent.put('/sidebars/' + sidebarSaveRes.body._id)
							.send(sidebar)
							.expect(200)
							.end(function(sidebarUpdateErr, sidebarUpdateRes) {
								// Handle Sidebar update error
								if (sidebarUpdateErr) done(sidebarUpdateErr);

								// Set assertions
								(sidebarUpdateRes.body._id).should.equal(sidebarSaveRes.body._id);
								(sidebarUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Sidebars if not signed in', function(done) {
		// Create new Sidebar model instance
		var sidebarObj = new Sidebar(sidebar);

		// Save the Sidebar
		sidebarObj.save(function() {
			// Request Sidebars
			request(app).get('/sidebars')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Sidebar if not signed in', function(done) {
		// Create new Sidebar model instance
		var sidebarObj = new Sidebar(sidebar);

		// Save the Sidebar
		sidebarObj.save(function() {
			request(app).get('/sidebars/' + sidebarObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', sidebar.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Sidebar instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sidebar
				agent.post('/sidebars')
					.send(sidebar)
					.expect(200)
					.end(function(sidebarSaveErr, sidebarSaveRes) {
						// Handle Sidebar save error
						if (sidebarSaveErr) done(sidebarSaveErr);

						// Delete existing Sidebar
						agent.delete('/sidebars/' + sidebarSaveRes.body._id)
							.send(sidebar)
							.expect(200)
							.end(function(sidebarDeleteErr, sidebarDeleteRes) {
								// Handle Sidebar error error
								if (sidebarDeleteErr) done(sidebarDeleteErr);

								// Set assertions
								(sidebarDeleteRes.body._id).should.equal(sidebarSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Sidebar instance if not signed in', function(done) {
		// Set Sidebar user 
		sidebar.user = user;

		// Create new Sidebar model instance
		var sidebarObj = new Sidebar(sidebar);

		// Save the Sidebar
		sidebarObj.save(function() {
			// Try deleting Sidebar
			request(app).delete('/sidebars/' + sidebarObj._id)
			.expect(401)
			.end(function(sidebarDeleteErr, sidebarDeleteRes) {
				// Set message assertion
				(sidebarDeleteRes.body.message).should.match('User is not logged in');

				// Handle Sidebar error error
				done(sidebarDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Sidebar.remove().exec();
		done();
	});
});