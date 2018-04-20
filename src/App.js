import React, { Component } from 'react';
// import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import { connect } from 'react-redux';


import Nav from './components/common/nav';
// import logo from './logo.svg';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
          <Nav />
      </div>
    );
  }
}

export default App;
