import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage.js';
import "./styles.scss";

import PrivateRoute from './components/privateRoute.js';

const App = (props) => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/bubble-page" component={BubblePage} />
        
      </div>
    </Router>
  );
}

export default App;
