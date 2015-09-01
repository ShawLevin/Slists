'use strict';

//Articles service used for communicating with the structures REST endpoints
angular.module('structures').factory('Structures', ['$resource',
	function($resource) {
		return $resource('structures/:structureId', {
			structureId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
