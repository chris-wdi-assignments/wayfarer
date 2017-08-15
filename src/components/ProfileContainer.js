import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class ProfileContainer extends Component {
  render(){
    return (
      <div>
        <h1>Welcome to Your Profile Page</h1>
        <h2>{this.props.user.name}</h2>
        <img src={this.props.user.image}/> 

      </div>
    )
  }
}

export default ProfileContainer;
