import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class NavUserInterface extends Component {
  render () {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to={"/profile"}>Profile</Link></li>
        <li><a>Get Out</a></li>
      </ul>
    )
  }
}

export default NavUserInterface;
