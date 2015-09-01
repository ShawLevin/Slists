'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	structures = require('../../app/controllers/structures.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/structures')
		.get(structures.list)
		.post(users.requiresLogin, structures.create);

	app.route('/structures/:structureId')
		.get(structures.read)
		.put(users.requiresLogin, structures.hasAuthorization, structures.update)
		.delete(users.requiresLogin, structures.hasAuthorization, structures.delete);

	// Finish by binding the structure middleware
	app.param('structureId', structures.structureByID);
};
