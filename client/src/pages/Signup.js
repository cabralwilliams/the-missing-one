import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', contact_number: '' });

  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        first_name: formState.firstName,
        last_name: formState.lastName,
        contact_number: formState.contact_number
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
  <div className="modal modal-signin position-static d-block bg-secondary py-5" tabIndex="-1" role="dialog" id="modalSignin">
  <div className="modal-dialog" role="document">
    <div className="modal-content rounded-5 shadow">
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h2 className="fw-bold mb-0">Sign up for free</h2>
      </div>

      <div className="modal-body p-5 pt-0">
        <form className="" onSubmit={handleFormSubmit}>
          <div className="form-floating mb-3">
            <input 
            className="form-control rounded-4"
            placeholder="First Name"
            name="firstName"
            type="firstName"
            id="floatingInput"
            onChange={handleChange}
            required
            />
            <label htmlFor="floatingName">First Name:</label>
          </div>
          <div className="form-floating mb-3">
              <input
               className="form-control rounded-4"
               placeholder="Last Name"
               name="lastName"
               type="lastName"
               id="lastName"
               onChange={handleChange}
               required
              />
               <label htmlFor="floatingLast">Last Name:</label>
          </div>
          <div className="form-floating mb-3">
                <input
                  className="form-control rounded-4"
                  placeholder="your phone number"
                  name="contact_number"
                  type="contact_number"
                  id="contact_number"
                  onChange={handleChange}
                />
                <label htmlFor="floatingPhone">Phone:</label>
          </div>
          <div className="form-floating mb-3">
                <input
                  className="form-control rounded-4"
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingEmail">Email:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Submit</button>
          <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
        </form>
           <Link to="/login">??? Go to Login</Link>
      </div>
    </div>
  </div>
</div>
  );
}

export default Signup;
