'use strict';

//Articles service used for communicating with the structures REST endpoints
angular.module('items').factory('Items', ['$resource',
	function($resource) {
		return $resource('items/:itemsId', {
			itemId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
