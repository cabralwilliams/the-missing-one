import { gql } from '@apollo/client';

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
