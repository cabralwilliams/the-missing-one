const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const replySchema = new Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},

		reply_body: {
			type: String,
		},

		name: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

module.exports = replySchema;
