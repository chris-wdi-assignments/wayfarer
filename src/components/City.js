import React, {Component} from 'react';
import AddPostModal from './AddPostModal.js';
import {Link} from 'react-router-dom';

class City extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }
  render () {
    console.log('posts');
    console.log(this.props.city.posts);
    const postComponents = this.props.city.posts.map(post => {
      if (!post || !post.user) return;
      return (
        <Link to={`/cities/${this.props.city._id}/posts/${post._id}`} className="list-group-item" key={post._id}>
          <h4 className="list-group-item-heading">{post.user.name}</h4>
          <p className="list-group-item-text">{post.title}</p>
        </Link>
      );
      });
    return (
      <div>
        <div className="col-md-8">
          <div className="media">
            <div className="media-body">
              <h2>{this.props.city.city}</h2>
            </div>
            <div className="media-right">
              <img className="media-object"
                src={__dirname + this.props.city.image}
                alt={this.props.city.city}
                style={{
                  height: '200px',
                  width: '300px'
                }}>
              </img>
            </div>
          </div>
          <div>
            <p>{this.props.city.description}</p>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{
                  margin: '1em'
                }}
                onClick={e=>this.setState({modalIsOpen:true})}
              >
                New Post
              </button>
            <div className="list-group">
              {postComponents}
            </div>
          </div>
        </div>
        <AddPostModal
          isOpen={this.state.modalIsOpen}
          addNewPost={this.props.addNewPost}
          city={this.props.city}
          closeModal={()=>this.setState({modalIsOpen:false})}
        />
      </div>
    )
  }
}

export default City;
