import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <header className="bg-secondary mb-4 py-2 flex-row align-center">
        <div className="container flex-row justify-space-between-lg justify-center align-center">
          <Link to="/">
            <h1>The Missing One</h1>
          </Link>
          <nav className="text-center">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
          </nav>
        </div>
      </header>
    );
  };

export default NavBar;