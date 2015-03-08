'use strict';

(function() {
	// Sidebars Controller Spec
	describe('Sidebars Controller Tests', function() {
		// Initialize global variables
		var SidebarsController,
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

			// Initialize the Sidebars controller.
			SidebarsController = $controller('SidebarsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Sidebar object fetched from XHR', inject(function(Sidebars) {
			// Create sample Sidebar using the Sidebars service
			var sampleSidebar = new Sidebars({
				name: 'New Sidebar'
			});

			// Create a sample Sidebars array that includes the new Sidebar
			var sampleSidebars = [sampleSidebar];

			// Set GET response
			$httpBackend.expectGET('sidebars').respond(sampleSidebars);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sidebars).toEqualData(sampleSidebars);
		}));

		it('$scope.findOne() should create an array with one Sidebar object fetched from XHR using a sidebarId URL parameter', inject(function(Sidebars) {
			// Define a sample Sidebar object
			var sampleSidebar = new Sidebars({
				name: 'New Sidebar'
			});

			// Set the URL parameter
			$stateParams.sidebarId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/sidebars\/([0-9a-fA-F]{24})$/).respond(sampleSidebar);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sidebar).toEqualData(sampleSidebar);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Sidebars) {
			// Create a sample Sidebar object
			var sampleSidebarPostData = new Sidebars({
				name: 'New Sidebar'
			});

			// Create a sample Sidebar response
			var sampleSidebarResponse = new Sidebars({
				_id: '525cf20451979dea2c000001',
				name: 'New Sidebar'
			});

			// Fixture mock form input values
			scope.name = 'New Sidebar';

			// Set POST response
			$httpBackend.expectPOST('sidebars', sampleSidebarPostData).respond(sampleSidebarResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Sidebar was created
			expect($location.path()).toBe('/sidebars/' + sampleSidebarResponse._id);
		}));

		it('$scope.update() should update a valid Sidebar', inject(function(Sidebars) {
			// Define a sample Sidebar put data
			var sampleSidebarPutData = new Sidebars({
				_id: '525cf20451979dea2c000001',
				name: 'New Sidebar'
			});

			// Mock Sidebar in scope
			scope.sidebar = sampleSidebarPutData;

			// Set PUT response
			$httpBackend.expectPUT(/sidebars\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/sidebars/' + sampleSidebarPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid sidebarId and remove the Sidebar from the scope', inject(function(Sidebars) {
			// Create new Sidebar object
			var sampleSidebar = new Sidebars({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Sidebars array and include the Sidebar
			scope.sidebars = [sampleSidebar];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/sidebars\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSidebar);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.sidebars.length).toBe(0);
		}));
	});
}());