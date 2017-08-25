import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PostShow extends Component {
  render () {
    const post = this.props.post;
    const postId = this.props.post._id;
    const cityId = this.props.city._id;

    if (!this.props.showModal){
      return (
        <div>
          {/*
          <h1>{this.props.newEditTitle ? this.props.newEditTitle : post.title}<small>&nbsp;by {post.user}</small></h1>
          <p>{this.props.newEditDescription ? this.props.newEditDescription : post.description}</p>
          */}
          <h1>{post.title}<small>&nbsp;by {post.user}</small></h1>
          <p>{post.text}</p>
          <Link to={`/cities/${this.props.city._id}`} className="btn btn-primary">Return to {this.props.city.city}</Link>
          <button onClick={e=>this.props.toggleModal()} className="btn btn-default">Edit</button>
          <button onClick={e=>this.props.destroyPost(cityId, postId)} className="btn btn-default">Delete</button>
        </div>
      )
    }
    return(
      <div id='updatePostModal' className='row' >
              <div className='modal-content'>
                <form className='col s12' onSubmit={event=>this.props.handleSubmit(event, cityId, postId)} >
                  <div className='row'>
                    <div className='col s12 valign-wrapper'>
                      <div className='col s11'>
                        <h3>Update Post</h3>
                      </div>
                      <div className='col s1'>
                        <a onClick={this.props.toggleModal} className='btn-sm waves-light right'>x</a>
                      </div>
                    </div>
                  </div>
                  <div className='input-field col s12'>
                    <input
                      data-id-type='newEditTitle'
                      id='postTitle'
                      className='validate'
                      type='text'
                      onChange={this.props.onChange}
                    />
                    <label for='post_title'>Title</label>
                  </div>
                  <div className='input-field col s12'>
                    <input
                      data-id-type='newEditDescription'
                      id='postDescription'
                      className='validate'
                      type='text'
                      onChange={this.props.onChange}
                    />
                    <label for='Description'>Description</label>
                  </div>
                  <div>
                    <button
                      className='btn waves-effect waves-light right' type='submit' name='action'>Submit
                      <i className='material-icons right'/>
                    </button>
                  </div>
                </form>
              </div>
            </div>
           )
  }
}

export default PostShow;
