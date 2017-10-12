import React, {Component} from 'react';
import logo from '../logo.svg';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal'
import {Link} from 'react-router-dom'

class NavContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loginModalIsOpen: false,
      signUpModalIsOpen: false
    };
  }
  render () {
    let currentInterface;
    if (this.props.isLoggedIn) {
      currentInterface = (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to={"/profile"}>{this.props.user.name}</Link></li>
          <li><a href="#" onClick={this.props.logout}>Get Out</a></li>
        </ul>
      )
    } else {
      currentInterface = (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#" onClick={()=>this.setState({loginModalIsOpen:true})}>Log In</a></li>
          <li><a href="#" onClick={()=>this.setState({signUpModalIsOpen:true})}>Sign Up</a></li>
        </ul>
      )
    }
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to={"/"} className="navbar-brand">Wayfarer</Link>
            </div>
            <div>
              {currentInterface}
            </div>
          </div>
        </nav>
        <LoginModal
          login={this.props.login}
          closeModal={()=>this.setState({loginModalIsOpen:false})}
          isOpen={this.state.loginModalIsOpen}
        />
        <SignupModal
          isSignUpOpen={this.state.signUpModalIsOpen}
          toggleSignupModal={this.props.toggleSignupModal}
          handleSignupSubmit={this.props.handleSignupSubmit}
          handleChange={this.props.handleChange}
          closeModal={()=>this.setState({signUpModalIsOpen:false})}
        />

      </div>
    )
  }
};

export default NavContainer;
