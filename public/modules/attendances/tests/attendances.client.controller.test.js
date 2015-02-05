'use strict';

(function() {
	// Attendances Controller Spec
	describe('Attendances Controller Tests', function() {
		// Initialize global variables
		var AttendancesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Attendances controller.
			AttendancesController = $controller('AttendancesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Attendance object fetched from XHR', inject(function(Attendances) {
			// Create sample Attendance using the Attendances service
			var sampleAttendance = new Attendances({
				name: 'New Attendance'
			});

			// Create a sample Attendances array that includes the new Attendance
			var sampleAttendances = [sampleAttendance];

			// Set GET response
			$httpBackend.expectGET('attendances').respond(sampleAttendances);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.attendances).toEqualData(sampleAttendances);
		}));

		it('$scope.findOne() should create an array with one Attendance object fetched from XHR using a attendanceId URL parameter', inject(function(Attendances) {
			// Define a sample Attendance object
			var sampleAttendance = new Attendances({
				name: 'New Attendance'
			});

			// Set the URL parameter
			$stateParams.attendanceId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/attendances\/([0-9a-fA-F]{24})$/).respond(sampleAttendance);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.attendance).toEqualData(sampleAttendance);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Attendances) {
			// Create a sample Attendance object
			var sampleAttendancePostData = new Attendances({
				name: 'New Attendance'
			});

			// Create a sample Attendance response
			var sampleAttendanceResponse = new Attendances({
				_id: '525cf20451979dea2c000001',
				name: 'New Attendance'
			});

			// Fixture mock form input values
			scope.name = 'New Attendance';

			// Set POST response
			$httpBackend.expectPOST('attendances', sampleAttendancePostData).respond(sampleAttendanceResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Attendance was created
			expect($location.path()).toBe('/attendances/' + sampleAttendanceResponse._id);
		}));

		it('$scope.update() should update a valid Attendance', inject(function(Attendances) {
			// Define a sample Attendance put data
			var sampleAttendancePutData = new Attendances({
				_id: '525cf20451979dea2c000001',
				name: 'New Attendance'
			});

			// Mock Attendance in scope
			scope.attendance = sampleAttendancePutData;

			// Set PUT response
			$httpBackend.expectPUT(/attendances\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/attendances/' + sampleAttendancePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid attendanceId and remove the Attendance from the scope', inject(function(Attendances) {
			// Create new Attendance object
			var sampleAttendance = new Attendances({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Attendances array and include the Attendance
			scope.attendances = [sampleAttendance];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/attendances\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAttendance);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.attendances.length).toBe(0);
		}));
	});
}());