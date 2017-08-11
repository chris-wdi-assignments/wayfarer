import React, { Component } from 'react';
import NavContainer from './components/NavContainer';
import GuestContainer from './components/GuestContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : true // later should be false
    };
  }
  render() {
    return (
      <div className="App">
        <NavContainer isLoggedIn={this.state.isLoggedIn} />
        <GuestContainer/>
      </div>
    );
  }
}

export default App;
