const { AuthenticationError } = require('apollo-server-express');
const { Users, Comments, Replies, Cases } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {

  Query: {
    me :async (parent, args, context) => {
      if (context.user) {
        const userData = await Users.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('comments')
          .populate('created_cases')
          
        return userData;
      }
      throw new AuthenticationError('Not logged in');

    },

    users: async () => {
      return Users.find()
        .select('-__v -password')
        .populate('created_cases')
        .populate('comments');
    },

    user: async (parent, { first_name }) => {
      return Users.findOne({ first_name })
        .select('-__v -password')
        .populate('created_cases')
        .populate('comments');
    },

    // Comments : async (parent, { case_id }) =>{
    //   const params = case_id ? { case_id } : {};
    //   return Comments.find(params).sort({ createdAt: -1 });
      
    // },
    // comment: async (parent, { _id }) => {
    //   return Comments.findOne({ _id });
    // },


  },


  Mutation: {
    addUser: async (parent, args) => {
      const user = await Users.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await Users.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // addComment: async (parent, { case_id, comment_text}) => {
        
    //       const updatedCase = await Cases.findOneAndUpdate(
    //         { _id: case_id },
    //         { $push: { comments: { comment_text } } },
    //         { new: true }
    //       );
      
    //       return updatedCase;
    // },






  },




};

module.exports = resolvers;
