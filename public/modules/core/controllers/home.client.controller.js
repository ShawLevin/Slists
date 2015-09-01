'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication','Structures',
	function($scope, Authentication, Structures) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.structures = Structures.query();

		$scope.filterLists = function(item)
		{
			return item.privacy === false || $scope.authentication.user._id === item.user._id;
		};
	}
]);
