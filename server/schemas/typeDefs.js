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
		# created_cases:[Cases]
		created_at: String
		registered_helper: Boolean
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
		case_status: String
		images: [String]
	}

	type Query {
		getusers: [User]
		me: User
		getuser(first_name: String!): User

		getCases: [Case]
		getCaseById(_id: ID!): Case
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
		#   updateUser(first_name: String, last_name: String, email: String, password: String): Users
		login(email: String!, password: String!): Auth
		#   addComment(comment_text:String!): Comments
		#   addReplies(commentId:Id!, reply_body:String): Comments

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
			_id: ID!
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
