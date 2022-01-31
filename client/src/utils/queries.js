import { gql } from "@apollo/client";

export const QUERY_USER = gql`
	{
		user {
			_id
			first_name
			last_name
			email
			contact_number
			registered_helper
			donations {
				amount
				createdAt
			}
		}
	}
`;
export const GET_CASES = gql`
	{
		getCases {
			_id
			firstname
			lastname
			address
			dob
			age
			race
			gender
			biograph
			nationality
			mobile
			licenseId
			issuedState
			licensePlate
			creator_id
			disappearance_date
			last_known_location
			ncic
			other_info
			case_status
			comments {
				comment_text
				created_by
				_id
			}
			images
			helpers {
				first_name
				last_name
			}
		}
	}
`;

export const GET_CASE_ById = gql`
	query getCaseById($id: ID!) {
		getCaseById(_id: $id) {
			_id
			firstname
			lastname
			address
			dob
			age
			race
			gender
			biograph
			nationality
			mobile
			licenseId
			issuedState
			licensePlate
			creator_id
			disappearance_date
			last_known_location
			ncic
			other_info
			case_status
			images
			comments {
				_id
				created_at
				comment_text
				created_by
			}
		}
	}
`;

export const QUERY_ME = gql`
	{
		me {
			_id
			first_name
			last_name
			email
			contact_number
			registered_helper
			created_cases {
				_id
				firstname
				lastname
				address
				disappearance_date
				last_known_location
				age
				comments {
					_id
					created_at
					comment_text
					created_by
					replies {
						_id
						reply_body
						name
					}
				}
			}
		}
	}
`;

export const SEARCH_CASES = gql`
	query searchCases($firstname: String, $lastname: String, $ncic: String) {
		searchCases(firstname: $firstname, lastname: $lastname, ncic: $ncic) {
			_id
			firstname
			lastname
			address
			dob
			age
			race
			gender
			biograph
			nationality
			mobile
			licenseId
			issuedState
			licensePlate
			creator_id
			disappearance_date
			last_known_location
			ncic
			other_info
			case_status
			comments {
				comment_text
			}
			images
			helpers {
				first_name
				last_name
			}
		}
	}
`;

export const QUERY_CHECKOUT = gql`
	query getCheckout($amount: Float!) {
		checkout(amount: $amount) {
			session
		}
	}
`;
