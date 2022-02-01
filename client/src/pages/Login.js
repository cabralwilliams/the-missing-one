import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
  <div className="modal modal-signin position-static d-block  bg-secondary py-5" tabIndex="-1" role="dialog" id="modalSignin">
    <div className="modal-dialog" role="document">
      <div className="modal-content rounded-5 shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h2 className="fw-bold mb-0 text-centered">Login</h2>
        </div>      
        <div className="modal-body p-5 pt-0">
          <form onSubmit={handleFormSubmit}>
              <div className="form-floating mb-3">
                <input
                  className="form-control rounded-4"
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
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
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Submit</button>
        </form>
        <Link to="/signup">← Go to Signup</Link>
      </div>
    </div>
  </div>
</div>
  );
}

export default Login;
