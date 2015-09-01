'use strict';

// Setting up route
angular.module('structures').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listStructures', {
			url: '/structures',
			templateUrl: 'modules/structures/views/list-structure.client.view.html'
		}).
		state('createStructure', {
			url: '/structures/create',
			templateUrl: 'modules/structures/views/create-structure.client.view.html'
		}).
		state('viewStructure', {
			url: '/structures/:structureId',
			templateUrl: 'modules/structures/views/view-structure.client.view.html'
		}).
		state('editStructure', {
			url: '/structures/:structureId/edit',
			templateUrl: 'modules/structures/views/edit-structure.client.view.html'
		});
	}
]);
