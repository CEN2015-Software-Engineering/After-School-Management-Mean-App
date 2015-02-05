'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Attendance = mongoose.model('Attendance'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, attendance;

/**
 * Attendance routes tests
 */
describe('Attendance CRUD tests', function() {
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

		// Save a user to the test db and create new Attendance
		user.save(function() {
			attendance = {
				name: 'Attendance Name'
			};

			done();
		});
	});

	it('should be able to save Attendance instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Attendance
				agent.post('/attendances')
					.send(attendance)
					.expect(200)
					.end(function(attendanceSaveErr, attendanceSaveRes) {
						// Handle Attendance save error
						if (attendanceSaveErr) done(attendanceSaveErr);

						// Get a list of Attendances
						agent.get('/attendances')
							.end(function(attendancesGetErr, attendancesGetRes) {
								// Handle Attendance save error
								if (attendancesGetErr) done(attendancesGetErr);

								// Get Attendances list
								var attendances = attendancesGetRes.body;

								// Set assertions
								(attendances[0].user._id).should.equal(userId);
								(attendances[0].name).should.match('Attendance Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Attendance instance if not logged in', function(done) {
		agent.post('/attendances')
			.send(attendance)
			.expect(401)
			.end(function(attendanceSaveErr, attendanceSaveRes) {
				// Call the assertion callback
				done(attendanceSaveErr);
			});
	});

	it('should not be able to save Attendance instance if no name is provided', function(done) {
		// Invalidate name field
		attendance.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Attendance
				agent.post('/attendances')
					.send(attendance)
					.expect(400)
					.end(function(attendanceSaveErr, attendanceSaveRes) {
						// Set message assertion
						(attendanceSaveRes.body.message).should.match('Please fill Attendance name');
						
						// Handle Attendance save error
						done(attendanceSaveErr);
					});
			});
	});

	it('should be able to update Attendance instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Attendance
				agent.post('/attendances')
					.send(attendance)
					.expect(200)
					.end(function(attendanceSaveErr, attendanceSaveRes) {
						// Handle Attendance save error
						if (attendanceSaveErr) done(attendanceSaveErr);

						// Update Attendance name
						attendance.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Attendance
						agent.put('/attendances/' + attendanceSaveRes.body._id)
							.send(attendance)
							.expect(200)
							.end(function(attendanceUpdateErr, attendanceUpdateRes) {
								// Handle Attendance update error
								if (attendanceUpdateErr) done(attendanceUpdateErr);

								// Set assertions
								(attendanceUpdateRes.body._id).should.equal(attendanceSaveRes.body._id);
								(attendanceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Attendances if not signed in', function(done) {
		// Create new Attendance model instance
		var attendanceObj = new Attendance(attendance);

		// Save the Attendance
		attendanceObj.save(function() {
			// Request Attendances
			request(app).get('/attendances')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Attendance if not signed in', function(done) {
		// Create new Attendance model instance
		var attendanceObj = new Attendance(attendance);

		// Save the Attendance
		attendanceObj.save(function() {
			request(app).get('/attendances/' + attendanceObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', attendance.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Attendance instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Attendance
				agent.post('/attendances')
					.send(attendance)
					.expect(200)
					.end(function(attendanceSaveErr, attendanceSaveRes) {
						// Handle Attendance save error
						if (attendanceSaveErr) done(attendanceSaveErr);

						// Delete existing Attendance
						agent.delete('/attendances/' + attendanceSaveRes.body._id)
							.send(attendance)
							.expect(200)
							.end(function(attendanceDeleteErr, attendanceDeleteRes) {
								// Handle Attendance error error
								if (attendanceDeleteErr) done(attendanceDeleteErr);

								// Set assertions
								(attendanceDeleteRes.body._id).should.equal(attendanceSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Attendance instance if not signed in', function(done) {
		// Set Attendance user 
		attendance.user = user;

		// Create new Attendance model instance
		var attendanceObj = new Attendance(attendance);

		// Save the Attendance
		attendanceObj.save(function() {
			// Try deleting Attendance
			request(app).delete('/attendances/' + attendanceObj._id)
			.expect(401)
			.end(function(attendanceDeleteErr, attendanceDeleteRes) {
				// Set message assertion
				(attendanceDeleteRes.body.message).should.match('User is not logged in');

				// Handle Attendance error error
				done(attendanceDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Attendance.remove().exec();
		done();
	});
});