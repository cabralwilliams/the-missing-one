//import gql
const { gql } = require("apollo-server-express");

//create typedefs - defines data to be returned by the query
const typeDefs = gql`
	type Thought {
		_id: ID
		thoughtText: String
		createdAt: String
		username: String
		reactionCount: Int
		reactions: [Reaction]
	}
	type Reaction {
		_id: ID
		reactionBody: String
		createdAt: String
		username: String
	}

	type User {
		_id: ID
		username: String
		email: String
		password: String
		friendCount: Int
		thoughts: [Thought]
		friends: [User]
	}

	type Auth {
		token: ID!
		user: User
	}

	input CaseInput {
		firstname: String
		lastname: String
		address: String
		dob: String
		age: Int
		race: String
		gender: String
	}

	type Case {
		_id: ID
		firstname: String
		lastname: String
		address: String
		dob: String
		age: Int
		race: String
		gender: String
		biograph: String
		nationality: String
		mobile: String
		licenseId: String
		issuedState: String
		licensePlate: String
		creator_id: String
		disappearance_date: String
		last_known_location: String
		ncic: String
		other_info: String
		case_status: String
		images: [String]
	}

	type Query {
		me: User
		users: [User]
		user(username: String!): User
		thoughts(username: String): [Thought]
		thought(_id: ID!): Thought
		getCases: [Case]
		getCaseById(_id: ID!): Case
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		addThought(thoughtText: String!): Thought
		addReaction(thoughtId: ID!, reactionBody: String!): Thought
		addFriend(friendId: ID!): User

		createCase(
			firstname: String!
			lastname: String!
			address: String!
			dob: String!
			age: Int!
			gender: String!
			last_known_location: String!
			case_status: String!
			creator_id: ID!
			biograph: String!
			nationality: String!
			mobile: String!
			licenseId: String!
			issuedState: String!
			licensePlate: String!
			disappearance_date: String!
			ncic: String!
			other_info: String!
			images: [String]!
		): Case

		updateCase(
			_id:ID!
			firstname: String!
			lastname: String!
			address: String!
			dob: String!
			age: Int!
			gender: String!
			last_known_location: String!
			case_status: String!
			creator_id: ID!
			biograph: String!
			nationality: String!
			mobile: String!
			licenseId: String!
			issuedState: String!
			licensePlate: String!
			disappearance_date: String!
			ncic: String!
			other_info: String!
			images: [String]!
		): Case
	}
`;
//createCase(firstname: String!, lastname: String!, address: String!): Case
//export typeDefs

module.exports = typeDefs;
		