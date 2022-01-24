const { AuthenticationError } = require('apollo-server-express');
const { User,Case, Comment} = require('../models');
const { signToken } = require('../utils/auth');
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {

  Query: {

    me :async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          // .populate('comments')
          // .populate('created_cases')
          
        return userData;
      }
      throw new AuthenticationError('Not logged in');

    },

    getusers: async () => {
      return User.find()
        .select('-__v -password')
        // .populate('created_cases')
       
    },

    getuser: async (parent, { first_name }) => {
      return User.findOne({ first_name })
        .select('-__v -password')
        // .populate('created_cases')
      
    },

    getComments : async (parent, { case_id }) =>{
      const params = case_id ? { case_id } : {};
      return Comment.find(params).sort({ createdAt: -1 });
      
    },
    // comment: async (parent, { _id }) => {
    //   return Comments.findOne({ _id });
    // },

			getCases: async () => {
			return Case.find();
		},

		getCaseById: async (parent, { _id }) => {
			return Case.findOne({ _id });
		},
  },

  Mutation: {
     addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return {  user , token };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      

      return {  user , token };
    },

    addComment: async (parent, ...args ) => {
        
          const comment = await Comment.create( { ...args} );
            await Case.findByIdAndUpdate(
              { _id: args.case_id },
          { $push: { comments: comment._id } },
          { new: true }
            )
          return comment;
    },


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
