const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const donationSchema = new Schema(
	{
    user_id: {
      type:Schema.Types.ObjectId
    },
		amount: {
			type: Number,
			get: getAmount,
			set: setAmount,
		},
		case_id: {
			type: Schema.Types.ObjectId,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
	},
	{
		toJSON: {
			getters: true,
			virtuals: true,
		},
	}
);

function getAmount(num) {
	return (num / 100).toFixed(2);
}

function setAmount(num) {
	return num * 100;
}

module.exports = donationSchema;
