'use strict';

(function() {
	// Guardians Controller Spec
	describe('Guardians Controller Tests', function() {
		// Initialize global variables
		var GuardiansController,
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

			// Initialize the Guardians controller.
			GuardiansController = $controller('GuardiansController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Guardian object fetched from XHR', inject(function(Guardians) {
			// Create sample Guardian using the Guardians service
			var sampleGuardian = new Guardians({
				name: 'New Guardian'
			});

			// Create a sample Guardians array that includes the new Guardian
			var sampleGuardians = [sampleGuardian];

			// Set GET response
			$httpBackend.expectGET('guardians').respond(sampleGuardians);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.guardians).toEqualData(sampleGuardians);
		}));

		it('$scope.findOne() should create an array with one Guardian object fetched from XHR using a guardianId URL parameter', inject(function(Guardians) {
			// Define a sample Guardian object
			var sampleGuardian = new Guardians({
				name: 'New Guardian'
			});

			// Set the URL parameter
			$stateParams.guardianId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/guardians\/([0-9a-fA-F]{24})$/).respond(sampleGuardian);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.guardian).toEqualData(sampleGuardian);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Guardians) {
			// Create a sample Guardian object
			var sampleGuardianPostData = new Guardians({
				name: 'New Guardian'
			});

			// Create a sample Guardian response
			var sampleGuardianResponse = new Guardians({
				_id: '525cf20451979dea2c000001',
				name: 'New Guardian'
			});

			// Fixture mock form input values
			scope.name = 'New Guardian';

			// Set POST response
			$httpBackend.expectPOST('guardians', sampleGuardianPostData).respond(sampleGuardianResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Guardian was created
			expect($location.path()).toBe('/guardians/' + sampleGuardianResponse._id);
		}));

		it('$scope.update() should update a valid Guardian', inject(function(Guardians) {
			// Define a sample Guardian put data
			var sampleGuardianPutData = new Guardians({
				_id: '525cf20451979dea2c000001',
				name: 'New Guardian'
			});

			// Mock Guardian in scope
			scope.guardian = sampleGuardianPutData;

			// Set PUT response
			$httpBackend.expectPUT(/guardians\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/guardians/' + sampleGuardianPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid guardianId and remove the Guardian from the scope', inject(function(Guardians) {
			// Create new Guardian object
			var sampleGuardian = new Guardians({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Guardians array and include the Guardian
			scope.guardians = [sampleGuardian];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/guardians\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGuardian);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.guardians.length).toBe(0);
		}));
	});
}());