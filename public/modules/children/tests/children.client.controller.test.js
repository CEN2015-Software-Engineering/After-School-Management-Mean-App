'use strict';

(function() {
	// Children Controller Spec
	describe('Children Controller Tests', function() {
		// Initialize global variables
		var ChildrenController,
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

			// Initialize the Children controller.
			ChildrenController = $controller('ChildrenController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Child object fetched from XHR', inject(function(Children) {
			// Create sample Child using the Children service
			var sampleChild = new Children({
				name: 'New Child'
			});

			// Create a sample Children array that includes the new Child
			var sampleChildren = [sampleChild];

			// Set GET response
			$httpBackend.expectGET('children').respond(sampleChildren);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.children).toEqualData(sampleChildren);
		}));

		it('$scope.findOne() should create an array with one Child object fetched from XHR using a childId URL parameter', inject(function(Children) {
			// Define a sample Child object
			var sampleChild = new Children({
				name: 'New Child'
			});

			// Set the URL parameter
			$stateParams.childId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/children\/([0-9a-fA-F]{24})$/).respond(sampleChild);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.child).toEqualData(sampleChild);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Children) {
			// Create a sample Child object
			var sampleChildPostData = new Children({
				name: 'New Child'
			});

			// Create a sample Child response
			var sampleChildResponse = new Children({
				_id: '525cf20451979dea2c000001',
				name: 'New Child'
			});

			// Fixture mock form input values
			scope.name = 'New Child';

			// Set POST response
			$httpBackend.expectPOST('children', sampleChildPostData).respond(sampleChildResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Child was created
			expect($location.path()).toBe('/children/' + sampleChildResponse._id);
		}));

		it('$scope.update() should update a valid Child', inject(function(Children) {
			// Define a sample Child put data
			var sampleChildPutData = new Children({
				_id: '525cf20451979dea2c000001',
				name: 'New Child'
			});

			// Mock Child in scope
			scope.child = sampleChildPutData;

			// Set PUT response
			$httpBackend.expectPUT(/children\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/children/' + sampleChildPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid childId and remove the Child from the scope', inject(function(Children) {
			// Create new Child object
			var sampleChild = new Children({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Children array and include the Child
			scope.children = [sampleChild];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/children\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleChild);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.children.length).toBe(0);
		}));
	});
}());