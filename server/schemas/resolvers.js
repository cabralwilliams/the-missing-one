const { AuthenticationError } = require("apollo-server-express");
const { User, Case, Donation } = require("../models");
const { signToken } = require("../utils/auth");
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select(
					"-__v -password"
				);
				// .populate('comments')
				// .populate('created_cases')

				return userData;
			}
			throw new AuthenticationError("Not logged in");
		},

		getusers: async () => {
			return User.find().select("-__v -password");
			// .populate('created_cases')
		},

		getuser: async (parent, { first_name }) => {
			return User.findOne({ first_name }).select("-__v -password");
			// .populate('created_cases')
		},

		// Comments : async (parent, { case_id }) =>{
		//   const params = case_id ? { case_id } : {};
		//   return Comments.find(params).sort({ createdAt: -1 });

		// },
		// comment: async (parent, { _id }) => {
		//   return Comments.findOne({ _id });
		// },

		getCases: async () => {
			return Case.find().populate("helpers");
		},

		getCaseById: async (parent, { _id }) => {
			return Case.findOne({ _id });
		},

		searchCases: async (parent, args) => {
			return Case.find({ ...args });
		},

		// getDonations: async (parent, { case_id, user_id }) => {
		// 	const params = {};
		// 	if (case_id && user_id) {
		// 		params = { case_id, user_id };
		// 	} else if (case_id) {
		// 		params = { case_id };
		// 	} else if (user_id) {
		// 		params = { user_id };
		// 	}
		// 	return Donation.find(params).sort({ createdAt: -1 });
		// },
	},

	Mutation: {
		addUser: async (parent, args) => {
			console.log(args);
			const user = await User.create({ ...args });

			const token = signToken(user);
			return { user, token };
		},

		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);

			return { user, token };
		},

		// addComment: async (parent, { case_id, comment_text}) => {

		//       const updatedCase = await Cases.findOneAndUpdate(
		//         { _id: case_id },
		//         { $push: { comments: { comment_text } } },
		//         { new: true }
		//       );

		//       return updatedCase;
		// },

		createCase: async (parent, args, context) => {
			if (context.user) {
				const newCase = await Case.create({
					...args,
					creator_id: context.user._id,
				});
				return newCase;
			}
			return new AuthenticationError(
				"Please login / signup to enter the case details."
			);
		},

		updateCase: async (parent, args, context) => {
			const updatedCase = await Case.findByIdAndUpdate(
				{ _id: args._id },
				{ ...args },
				{ new: true }
			);
			return updatedCase;
		},

		addDonation: async (parent, args, context) => {
			if (context.user) {
				console.log(context.user);
				const updatedUser = await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{
						$push: {
							donations: { user_id:context.user.id,case_id: args.case_id, amount: args.amount },
						},
					},
					{ new: true }
				);
				const updatedCase = await Case.findByIdAndUpdate(
					{ _id: args.case_id },
					{
						$push: {
							donations: {user_id:context.user.id, case_id: args.case_id, amount: args.amount },
						},
					},
					{ new: true }
				);
				console.log(updatedUser.case_id);
				return updatedUser;
			}
			return new AuthenticationError("Please sign in to donate");
		},
	},
};
module.exports = resolvers;
