'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	items = require('../../app/controllers/items.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/items')
		.get(items.list)
		.post(users.requiresLogin, items.create);

	app.route('/items/:itemId')
		.get(items.read)
		.put(users.requiresLogin, items.hasAuthorization, items.update)
		.delete(users.requiresLogin, items.hasAuthorization, items.delete);

	app.route('/items/list/:listId')
		.get(items.read);

	// Finish by binding the structure middleware
	app.param('itemId', items.itemByID);
	app.param('listId', items.listById);
};
