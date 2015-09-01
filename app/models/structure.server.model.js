'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var ColSchema = new Schema({
		title: { type: String},
		category: { type:String }
	});


var ListSchema = new Schema(
	{

	}
);

var StructureSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	cols: {
		type: [ColSchema]
	},
	organization: { type: String, default: '', trim: true, required: 'Org cannot be blank.' },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	privacy: Boolean
});

mongoose.model('Structure', StructureSchema);
