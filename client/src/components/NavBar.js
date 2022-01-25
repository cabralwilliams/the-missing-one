import React from "react";
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';

const NavBar = () => {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item fs-5 active">
            <Link className="nav-link" aria-current="page" to="/CreateCase">
              Create Case
            </Link>
          </li>
          <li className="nav-item fs-5 active">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a className="nav-link" aria-current="page" href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
      </ul>
      );
    } else {
      return (
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item fs-5 active">
                  <Link className="nav-link" aria-current="page" to="/login">Login</Link>
         </li>                         
         <li className="nav-item fs-5">
                  <Link className="nav-link" to="/signup">Signup</Link>                         
         </li>
       </ul>  
      );
    }
  }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark mb-2">
          <Link to="/">
            <h1>The Missing One</h1>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
                {showNavigation()}
          </div>
    </nav>
  );
};

export default NavBar;