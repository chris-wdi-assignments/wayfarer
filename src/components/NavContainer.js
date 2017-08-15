import React, {Component} from 'react';
import logo from '../logo.svg';
import NavGuestInterface from './NavGuestInterface';
import NavUserInterface from './NavUserInterface';
import {Link} from 'react-router-dom'


class NavContainer extends Component {
  constructor (props) {
    super(props);
    // this.state = {}; //?
  }
  render () {
    const currentInterface = this.props.isLoggedIn ? <NavUserInterface /> : <NavGuestInterface />;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            {
              //<img src={logo} alt="Wayfarer" />
            }
            <Link to={"/"} className="navbar-brand">Wayfarer</Link>
          </div>
          <div>
            {currentInterface}
          </div>
        </div>
      </nav>
    )
  }
};

export default NavContainer;
