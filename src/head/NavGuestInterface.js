import React, {Component} from 'react';
import $ from 'jquery-ajax';

class NavGuestInterface extends Component {

  handleSubmit(e){
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
  }

  render () {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li onclick={this.handleSubmit}><a>Log In</a></li>
        <li onclick={this.handleSignup}><a>Sign Up</a></li>
      </ul>
    )
  }
}

export default NavGuestInterface;
