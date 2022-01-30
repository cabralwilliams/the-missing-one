import { gql } from "@apollo/client";

export const QUERY_USER = gql`
	{
		user {
			firstName
			lastName
			email
			contact_number
			registered_helper
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
			}
			images
			helpers {
				first_name
				last_name
			}
			donations {
				case_id
				amount
			}
		}
	}
`;

export const GET_CASE_ById = gql`


	query
	getCaseById($id:ID!)
	{
		getCaseById(_id:$id){
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
          		replies{
           			 _id
            		reply_body
            		name
          		}		
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
      created_cases{
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
          replies{
            _id
            reply_body
            name
          }
        }
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