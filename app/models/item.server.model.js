'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Item Schema - hold this.
*/
var ItemSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	data: [{ title: String, value: String, category: String }],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	structure_id: { type: Schema.ObjectId }
});


//var ItemSchema = new Schema({ data: Schema.Types.Mixed });

mongoose.model('Item', ItemSchema);
