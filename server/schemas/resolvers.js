const { AuthenticationError } = require("apollo-server-express");
const { User, Case, Comment } = require("../models");
const { signToken } = require("../utils/auth");

//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select(
					"-__v -password")
					.populate('comments')
					.populate('created_cases')
				return userData;
			}
			throw new AuthenticationError("Not logged in");
		},

		getusers: async () => {
			return User.find()
				.select('-__v -password')
				.populate('created_cases')

		},

		getuser: async (parent, { _id }) => {
			const user = await User.findOne({ _id });
			if (user) {
				return User.findOne({ _id })
					.select('-__v -password')
					.populate('created_cases')
			}
			return new AuthenticationError('User not found!');

		},

		getCases: async () => {
			return Case.find()
				.populate({
					path: 'comments',
					select: '-__v'
				})
				.populate('replies')
		},

		getCases: async () => {
			return Case.find()
				.populate({
					path: "comments",
					select: "-__v",
				})
				.populate({ path: "helpers", select: "-__v" })
				.populate("replies");
		},

		getCaseById: async (parent, { _id }) => {
			return Case.findOne({ _id });
		},

		searchCases: async (parent, args) => {
			return Case.find({ ...args });
		},
	},

	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return { user, token };
		},
		updateUser: async (parent, args, context) => {
			if (context.user) {
				const updatedUser = await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ ...args },
					{ new: true }
				);
				return updatedUser;
			}
			return new AuthenticationError(
				"Please login / signup to update profile."
			);

		},


		deleteUser: async (parent, { _id }) => {
			const user = await User.findOne({ _id });
			if (user) {
				return User.findByIdAndDelete({ _id })
			}
			return new AuthenticationError('User not found!');
		},

		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);
			return { user, token };
		},


		addComment: async (parent, args) => {

			const comment = await Comment.create({ ...args });
			await Case.findByIdAndUpdate(
				{ _id: args.case_id },
				{ $push: { comments: comment._id } },

			)
			return comment;
		},
		deleteComment: async (parent, args) => {

			const deletedComment = await Case.findByIdAndUpdate(
				{ _id: args.case_id },
				{ $pull: { comments: { commentId: args.commentId } } },
			);
			return deletedComment
		},

		addReply: async (parent, args) => {

			const updatedComment = await Comment.findOneAndUpdate(
				{ _id: args.commentId },
				{ $push: { replies: { ...args } } },
			);
			return updatedComment;

		},


		createCase: async (parent, args, context) => {
			console.log(args);
			if (context.user) {

				const newCase = await Case.create({
					...args
				});

				const updatedUser = await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $push: { created_cases: newCase._id } }
				);
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
	},
};
module.exports = resolvers;
