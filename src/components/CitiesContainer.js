import React, {Component} from 'react';
import CitiesList from './CitiesList.js';
import City from './City.js';
import PostShow from './PostShow.js';
import {Switch, Route} from 'react-router-dom';

class CitiesContainer extends Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <CitiesList
            cities={this.props.cities}
          />
          <Switch>
            <Route path={`/cities/:cityId`} exact render={ props => {
              const cityId = props.match.params.cityId; // get _id of city to render
              return <City addNewPost={this.props.addNewPost} city={this.props.getCity(cityId)} />
            }} />
            <Route path={"/cities/:cityId/posts/:postId"} render={ props => {
              const cityId = props.match.params.cityId,
                postId = props.match.params.postId;
              return (
                <PostShow city={this.props.getCity(cityId)} post={this.props.getPost(cityId, postId)} destroyPost={this.props.destroyPost} toggleModal={this.props.toggleModal} showModal={this.props.showModal} handleSubmit={this.props.handleSubmit} onChange={this.props.onChange} newEditTitle={this.props.newEditTitle} newEditDescription={this.props.newEditDescription}/>
              )
            }} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default CitiesContainer;
