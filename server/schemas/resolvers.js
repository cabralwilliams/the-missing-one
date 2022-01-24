const { User, Thought, Case } = require("../models");
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

		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select("-__v -password")
					.populate("thoughts")
					.populate("friends");
				return userData;
			}
			throw new AuthenticationError("Not logged in");
		},
		thoughts: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Thought.find(params).sort({ createdAt: -1 });
		},
		thought: async (parent, { _id }) => {
			//get thought by id
			return Thought.findOne({ _id });
		},
		users: async () => {
			//get all users
			return User.find()
				.select("-__v -password")
				.populate("friends")
				.populate("thoughts");
		},
		user: async (parent, { username }) => {
			//get user by username
			return User.findOne({ username })
				.select("-__v -password")
				.populate("friends")
				.populate("thoughts");
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
			return updatedCase
		},

		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}
			const correctpw = await user.isCorrectPassword(password);
			if (!correctpw) {
				throw new AuthenticationError("Incorrect credentials");
			}
			const token = signToken(user);
			return { token, user };
		},

		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},

		addThought: async (parent, args, context) => {
			if (context.user) {
				const thought = await Thought.create({
					...args,
					username: context.user.username,
				});
				await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $push: { thoughts: thought._id } },
					{ new: true }
				);
				return thought;
			}
			throw new AuthenticationError("You need to be logged in!");
		},

		//addReaction(thoughtId:ID!,reactionBody:String!):Thought
		addReaction: async (parent, { thoughtId, reactionBody }, context) => {
			if (context.user) {
				const thought = await Thought.findByIdAndUpdate(
					{ _id: thoughtId },
					{
						$push: {
							reactions: { reactionBody, username: context.user.username },
						},
					},
					{ new: true }
				);
				return thought;
			}
			throw new AuthenticationError("You need to be logged in!!!");
		},

		//addFriend(friendId:ID!):User
		addFriend: async (parent, { friendId }, context) => {
			if (context.user) {
				const user = await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { friends: friendId } },
					{ new: true }
				).populate("friends");
				return user;
			}
			throw new AuthenticationError("You need to be logged in!!");
		},
	},
};
module.exports = resolvers;
