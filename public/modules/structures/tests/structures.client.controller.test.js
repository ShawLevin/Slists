'use strict';

(function() {
	// Articles Controller Spec
	describe('StructuresController', function() {
		// Initialize global variables
		var StructuresController,
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

			// Initialize the Articles controller.
			StructuresController = $controller('StructuresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one article object fetched from XHR', inject(function(Structures) {
			// Create sample article using the Articles service
			var sampleStructure = new Structures({
				title: 'An Article about MEAN'
			});

			// Create a sample articles array that includes the new article
			var sampleStructures = [sampleStructure];

			// Set GET response
			$httpBackend.expectGET('structures').respond(sampleStructures);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.structures).toEqualData(sampleStructures);
		}));

		it('$scope.findOne() should create an array with one article object fetched from XHR using a articleId URL parameter', inject(function(Structures) {
			// Define a sample article object
			var sampleStructure = new Structures({
				title: 'An Article about MEAN'
			});

			// Set the URL parameter
			$stateParams.structureId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/structures\/([0-9a-fA-F]{24})$/).respond(sampleStructure);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.structure).toEqualData(sampleStructure);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Structures) {
			// Create a sample article object
			var sampleStructurePostData = new Structures({
				title: 'An Article about MEAN'
			});

			// Create a sample article response
			var sampleStructureResponse = new Structures({
				_id: '525cf20451979dea2c000001',
				title: 'An Article about MEAN'
			});

			// Fixture mock form input values
			scope.title = 'An Article about MEAN';

			// Set POST response
			$httpBackend.expectPOST('structures', sampleStructurePostData).respond(sampleStructureResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');

			// Test URL redirection after the article was created
			expect($location.path()).toBe('/structures/' + sampleStructureResponse._id);
		}));

		it('$scope.update() should update a valid article', inject(function(Structures) {
			// Define a sample article put data
			var sampleStructurePutData = new Structures({
				_id: '525cf20451979dea2c000001',
				title: 'An Article about MEAN'
			});

			// Mock article in scope
			scope.structure = sampleStructurePutData;

			// Set PUT response
			$httpBackend.expectPUT(/structures\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/structures/' + sampleStructurePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid articleId and remove the article from the scope', inject(function(Structures) {
			// Create new article object
			var sampleStructure = new Structures({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new articles array and include the article
			scope.structures = [sampleStructure];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/structures\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStructure);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.structures.length).toBe(0);
		}));
	});
}());
