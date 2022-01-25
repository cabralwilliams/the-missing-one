//import gql
const { gql } = require("apollo-server-express");

//create typedefs - defines data to be returned by the query
const typeDefs = gql`
	type User {
		_id: ID
		first_name: String
		last_name: String
		email: String
		password: String
		contact_number: String
		created_cases:[Case]
		created_at: String
		registered_helper: Boolean
		donations: [Donation]
	}

	type Donation {
		user_id: ID
		amount: Int
		case_id: ID
		createdAt: String
	}
	type Comment {
		_id: ID
		comment_text: String
		created_by: String
		created_at: String
		case_id: ID
		 replies:[Reply]
	}

	type Reply {
		_id: ID
		createdAt: String
		reply_body: String
		name: String
	}

	type Auth {
		token: ID
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
		case_status: Boolean		
		comments:[Comment]
		images: [String]
		helpers: [User]
		donations: [Donation]
	}

	type Donation {
		_id: ID
		user_id: ID
		amount: Int
		case_id: ID
	}

	type Query {
		getusers: [User]
		me: User
		getuser(first_name: String!): User
		getCases: [Case]
		getCaseById(_id: ID!): Case

		searchCases(
			race: String
			gender: String
			case_status: Boolean
			ncic: String
		): [Case]


		
	}

	type Mutation {
		addUser(
			first_name: String!
			last_name: String!
			email: String!
			password: String!
			contact_number: String
			registered_helper: Boolean
		): Auth
    
		updateUser(
			_id : ID!
			first_name: String!
			last_name: String!
			email: String!
			password: String!
			contact_number: String
			registered_helper: Boolean
			): User

		login(email: String!, password: String!): Auth
		logout(email: String!, password: String!): Auth
		addComment(comment_text:String!, case_id:ID!,created_by:String! ): Comment
		addReply(commentId:ID!, reply_body:String!, name:String!): Comment

		createCase(
			firstname: String!
			lastname: String!
			address: String
			dob: String
			age: Int!
			gender: String!
			last_known_location: String!
			creator_id: ID
			biograph: String
			nationality: String
			mobile: String
			licenseId: String
			issuedState: String
			licensePlate: String
			disappearance_date: String
			ncic: String
			other_info: String
			images: [String]
			helpers: [ID!]
		): Case

		updateCase(
			_id: ID!
			firstname: String
			lastname: String
			address: String
			dob: String
			age: Int
			gender: String
			last_known_location: String
			case_status: Boolean
			creator_id: ID
			biograph: String
			nationality: String
			mobile: String
			licenseId: String
			issuedState: String
			licensePlate: String
			disappearance_date: String
			ncic: String
			other_info: String
			images: [String]
		): Case

		addDonation(case_id: ID, amount: Int): User
	}
`;
//createCase(firstname: String!, lastname: String!, address: String!): Case
//export typeDefs

module.exports = typeDefs;
