import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PostShow extends Component {
  render () {
    console.log(this.props);
    const post = this.props.post;
    return (
      <div>
        <h1>{post.title}<small>&nbsp;by {post.user}</small></h1>
        <p>{post.text}</p>
        <Link to={`/cities/${this.props.city._id}`} className="btn btn-primary">Return to {this.props.city.city}</Link>
        <button className="btn btn-default">Edit</button>
      </div>
    )
  }
}

export default PostShow;
