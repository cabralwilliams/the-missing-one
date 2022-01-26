import { gql } from '@apollo/client';

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
            firstName
            lastName
            age
            images
            disappearance_date
            last_known_location
        }
    }
 `;

 export const QUERY_ME = gql`
    {
        me {
            _id
            first_name
            last_name
            created_cases {
                _id
            }
        }
    }
 `;