'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Structure = mongoose.model('Structure'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var structure = new Structure(req.body);
	structure.user = req.user;

	structure.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(structure);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.structure);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var structure = req.structure;

	structure = _.extend(structure, req.body);

	structure.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(structure);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var structure = req.structure;

	structure.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(structure);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Structure.find().sort('-created').populate('user', 'displayName').exec(function(err, structures) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(structures);
		}
	});
};

/**
 * Article middleware
 */
exports.structureByID = function(req, res, next, id) {
	Structure.findById(id).populate('user', 'displayName').exec(function(err, structure) {
		if (err) return next(err);
		if (!structure) return next(new Error('Failed to load structure ' + id));
		req.structure = structure;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.structure.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
