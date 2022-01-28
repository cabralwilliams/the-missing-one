import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, Redirect } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { UPDATEUSER } from '../utils/mutations';
import Auth from '../utils/auth';

function Edit() {
  const { _id: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  // console.log(user);
  const [formState, setFormState] = useState({ first_name: user.first_name, last_name: user.last_name, email: user.email, contact_number: user.contact_number });
  const [updateUser, { error }] = useMutation(UPDATEUSER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formState)
      const mutationResponse = await updateUser({
        variables: {
          first_name: formState.first_name, last_name: formState.last_name,
          email: formState.email, contact_number: formState.contact_number
          
        },
        
        
      }
      
      ) 
      //console.log(...formState)

    } catch (e) {
      console.log(e);
    };

  };
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
   
    <div className="container my-1 contact-form">
    Auth.loggedIn() ?
    <legend>Edit Profile</legend>
    <form id="contact-form" onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="first name">First Name:</label>
          <input
            className="form-control"
            placeholder={formState.first_name}
            name="first_name"
            type="first_name"
            id="first_name"
            onChange={handleChange}
          />
          <label htmlFor="Last Name">Last Name:</label>
          <input
            className="form-control"
            placeholder={formState.last_name}
            name="last_name"
            type="last_name"
            id="last_name"
            onChange={handleChange}
          />
        
        
          <label htmlFor="Email">Email:</label>
          <input
            className="form-control"
            placeholder={formState.email}
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <label htmlFor="contacNumber">Phone Number:</label>
          <input
            className="form-control"
            placeholder={formState.contact_number}
            name="contact_number"
            type="contact_number"
            id="contact_number"
            onChange={handleChange}
          />
          
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Save Changes</button>
        </div>
        </form>
        :
                <span>(log in to check out)</span>
    </div>
  )

};

export default Edit;
