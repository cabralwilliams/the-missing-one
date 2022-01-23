const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type Users {

    _id: ID
    first_name: String
    last_name: String
    email: String
    password: String
    contact_number: String
    # created_cases:[Cases]
    created_at: String
    registered_helper: Boolean
  },

  type Comments{
    _id: ID
    comment_text: String
    created_at: String
    case_id: String
    replies: [repliesSchema]
  },

  type Replies {
    createdAt: String
    reply_body: String
    username: String
  },

  type Auth {
    token: ID
    user: users
  },

  type Query {
    users: [Users]
    user(first_name: String!): Users
    comments(case_id: String!) :[Comments]
    comment(_id: ID!): Comments
    me: Users
  },
  

  type Mutation {
    addUser(first_name: String!, last_name: String!, email: String!, password: String! contact_number: Int registered_helper: Boolean): Auth
    updateUser(first_name: String, last_name: String, email: String, password: String): Users
    login(email: String!, password: String!): Auth
    addComment(comment_text:String!): Comments
    addReplies(commentId:Id!, reply_body:String): Comments
  }
`;

module.exports = typeDefs;
