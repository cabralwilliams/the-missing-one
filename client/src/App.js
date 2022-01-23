import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer'
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';

function App() {
  return (
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
        <NavBar/>
          <div className="container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
  );
}
export default App;
