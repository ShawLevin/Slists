'use strict';

// Configuring the Articles module
angular.module('structures').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Structures', 'structures', 'dropdown', '/structures(/create)?');
		Menus.addSubMenuItem('topbar', 'structures', 'List structures', 'structures');
		Menus.addSubMenuItem('topbar', 'structures', 'New structures', 'structures/create');
	}
]);
