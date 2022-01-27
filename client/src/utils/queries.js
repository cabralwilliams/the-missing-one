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

 