'use strict';

angular.module('structures').controller('StructuresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Items','Structures',
function($scope, $stateParams, $location, Authentication, Items, Structures) {
	$scope.authentication = Authentication;

	$scope.cols = [];

	$scope.org = $scope.authentication.user.chapter;

	$scope.private = true;

	$scope.filterLists = function(item)
	{
		return item.privacy === false || $scope.authentication.user._id === item.user._id;
	};

	$scope.create = function() {
		var structure = new Structures({
			title: this.title,
			cols: this.cols,
			organization: this.org,
			privacy: this.private
		});
		structure.$save(function(response) {
			$location.path('structures/' + response._id);

			$scope.title = '';
			$scope.content = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.remove = function(structure) {
		console.log('removing item');
		if (structure) {
			structure.$remove();

			for (var i in $scope.structures) {
				if ($scope.structures[i] === structure) {
					$scope.structures.splice(i, 1);
				}
			}
		} else {
			$scope.structure.$remove(function() {
				$location.path('structures');
			});
		}
	};

	$scope.update = function() {
		var structure = $scope.structure;

		structure.$update(function() {
			$location.path('structures/' + structure._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.find = function() {
		$scope.structures = Structures.query();
	};

	$scope.addColumn = function()
	{
		$scope.cols.push({ title:'', category:'text'});
	};

	$scope.updateSort = function (sort)
	{
		$scope.sorter = sort;
	};

	$scope.addItem = function () {

		var itm = new Items({
		});

		itm.data = [];
		for(var i = 0; i < $scope.structure.cols.length; i++)
		{
			if($scope.structure.cols[i].category === 'checkbox')
			{
				console.log('checkbox!');
				itm.data.push({ title:$scope.structure.cols[i].title,value:document.getElementById($scope.structure.cols[i].title).checked,category:$scope.structure.cols[i].category });

			}
			else {
				itm.data.push({ title:$scope.structure.cols[i].title,value:document.getElementById($scope.structure.cols[i].title).value,category:$scope.structure.cols[i].category });

			}
			console.log(itm.data);
		}

		itm.structure_id = $scope.structure._id;

		itm.$save(function(response) {
			//$location.path('items/' + response._id);
				$scope.items = Items.query();
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
};

$scope.getValue = function(itm) {
	for(var i = 0; i < itm.data.length; i++)
	{
		if (itm.data[i].title === $scope.sorter)
		{
				return itm.data[i].value;
	}
	}
};

	$scope.findOne = function() {
		$scope.structure = Structures.get({
			structureId: $stateParams.structureId
		});

		$scope.search = function (item) {
    if (item.structure_id === $stateParams.structureId) {

			if($scope.searchQuery)
			{
			for(var i = 0; i < item.data.length; i++)
			{
				if (item.data[i].value.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) !== -1)
				{
						return true;
			}
			}
}
else {
	return true;
}
        }
        return false;
  };
		$scope.items = Items.query();

		$scope.sorter = '';


	};
}
]);
