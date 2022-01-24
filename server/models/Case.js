const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const dateFormat = require("../utils/dateFormat");
const caseSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
			trim: true,
		},
		lastname: {
			type: String,
			required: [true, "Last Name is the required field"],
			trim: true,
		},
		address: {
			type: String,
			trim: true,
		},
		dob: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		age: {
			type: Number,
			required: [true, "Age is the required field"],
			min: [0, "Age can not be negative"],
			max: [125, "Age must be within 0 and 125"],
		},
		images: {
			type: [String],
		},
		race: {
			type: String,
		},
		gender: {
			type: String,
      minLength: 1,
      maxLength:2
		},
		biograph: {
			type: String,
			maxLength: 500,
			trim: true,
		},
		nationality: {
			type: String,
			maxLength: 3,
			default: "USA",
		},
		mobile: {
			type: String,
			maxLength: 12,
			trim: true,
		},
		licenseId: {
			type: String,
			maxLength: 12,
			trim: true,
		},
		issuedState: {
			type: String,
			maxLength: 2,
			trim: true,
		},
		licensePlate: {
			type: String,
			maxLength: 12,
			trim: true,
		},
		creator_id: {
			type: String,
			required: [true, "User id is invalid"],
		},
		disappearance_date: {
			type: Date,
			required: ["Date of disapperance date is required field"],
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		last_known_location: {
			type: String,
			required: true,
			trim: true,
		},
		ncic: {
			type: String,
		},
		other_info: {
			type: String,
			maxLength: 500,
		},
		case_status: {
			type: String,
			maxLength: 1,
			required: [true, "Case status is the required field"],
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// set up pre-save middleware to create password

const Case = model("Case", caseSchema);

module.exports = Case;
