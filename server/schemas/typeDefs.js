//import gql
const { gql } = require("apollo-server-express");

//create typedefs - defines data to be returned by the query
const typeDefs = gql`
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
		getCases: [Case]
		getCaseById(_id: ID!): Case
	}

	type Mutation {
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
