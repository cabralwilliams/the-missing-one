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
	}
	type Comment {
		_id: ID
		comment_text: String
		created_by: String
		created_at: String
		case_id: ID
		# replies:[Reply]
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
		comments:[Comment]
		images: [String]
	}

	type Query {
		getusers: [User]
		me: User
		getuser(first_name: String!): User
		getCases: [Case]
		getCaseById(_id: ID!): Case
		getComments(case_id: ID!):Comment
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
		addComment(comment_text:String! case_id:ID! ): Comment
		# addReply(commentId:Id!, reply_body:String): Comment

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
