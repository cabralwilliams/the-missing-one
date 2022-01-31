import { gql } from "@apollo/client";

export const UPDATEUSER = gql`
	mutation updateUser(
		$first_name: String
		$last_name: String
		$email: String
		$contact_number: String
		$registered_helper: Boolean
	) {
		updateUser(
			first_name: $first_name
			last_name: $last_name
			email: $email
			contact_number: $contact_number
			registered_helper: $registered_helper
		) {
			_id
			first_name
			last_name
			email
		}
	}
`;

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser(
		$first_name: String!
		$last_name: String!
		$email: String!
		$password: String!
		$contact_number: String
		$registered_helper: Boolean
	) {
		addUser(
			first_name: $first_name
			last_name: $last_name
			email: $email
			password: $password
			contact_number: $contact_number
			registered_helper: $registered_helper
		) {
			token
			user {
				_id
			}
		}
	}
`;

export const QUICK_CREATE_CASE = gql`
	mutation createCase(
		$firstname: String!
		$lastname: String!
		$age: Int!
		$gender: String!
		$last_known_location: String!
	) {
		createCase(
			firstname: $firstname
			lastname: $lastname
			age: $age
			gender: $gender
			last_known_location: $last_known_location
		) {
			_id
			firstname
			lastname
		}
	}
`;

export const CREATE_CASE = gql`
	mutation createCase(
		$firstname: String!
		$lastname: String!
		$age: Int!
		$gender: String!
		$last_known_location: String!
		$address: String
		$dob: String
		$creator_id: ID
		$biograph: String
		$nationality: String
		$mobile: String
		$licenseId: String
		$issuedState: String
		$licensePlate: String
		$disappearance_date: String
		$ncic: String
		$other_info: String
		$images: [String]
		$helpers: [ID!]
	) {
		createCase(
			firstname: $firstname
			lastname: $lastname
			address: $address
			dob: $dob
			age: $age
			gender: $gender
			last_known_location: $last_known_location
			creator_id: $creator_id
			biograph: $biograph
			nationality: $nationality
			mobile: $mobile
			licenseId: $licenseId
			issuedState: $issuedState
			licensePlate: $licensePlate
			disappearance_date: $disappearance_date
			ncic: $ncic
			other_info: $other_info
			images: $images
			helpers: $helpers
		) {
			_id
			firstname
			lastname
		}
	}
`;

export const ADD_DONATION = gql`
	mutation addDonation($amount: Float!) {
		addDonation(amount: $amount) {
			_id
			first_name
			last_name
			email
			donations {
				amount
			}
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation addComment(
		$comment_text: String!
		$case_id: ID!
		$created_by: String!
	) {
		addComment(
			comment_text: $comment_text
			case_id: $case_id
			created_by: $created_by
		) {
			_id
			comment_text
			created_by
			created_at
			case_id
		}
	}
`;
