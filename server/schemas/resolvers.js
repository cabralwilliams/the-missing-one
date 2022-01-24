const { Case } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		getCases: async () => {
			return Case.find();
		},

		getCaseById: async (parent, { _id }) => {
			return Case.findOne({ _id });
		},
	},

	Mutation: {
		createCase: async (parent, args, context) => {
			const newCase = await Case.create({ ...args });
			return newCase;
		},

		updateCase: async (parent, args, context) => {
			const updatedCase = await Case.findByIdAndUpdate(
				{ _id: args._id },
				{ ...args },
				{ new: true }
			);
			return updatedCase;
		},
	},
};
module.exports = resolvers;
