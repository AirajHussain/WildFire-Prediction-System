import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reports from './pages/Reports';
import {BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";


function App() {
  return (
    
    <Router>
      <div className= "application">
  
        <Switch>
          <Route path='/'exact component={Home}/>
          <Route path ='/Reports' component ={Reports}/>
        </Switch>

      </div>
    </Router>

  );
}

export default App;
