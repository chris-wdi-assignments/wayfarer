import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavContainer from './components/NavContainer';
import GuestContainer from './components/GuestContainer';
import CitiesContainer from './components/CitiesContainer.js';
import './App.css';
import $ from 'jquery-ajax';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : false, // later should be false
      user: {name: 'Chris'}, // dummy, replace later
      cities: [],
      selectedCity: { // to prevent code breakage, create dummy properties
        city: 'default cityname',
        country: 'default country',
        image: '',
        description: 'default city description',
        posts: []
      }
    };
  }
  componentDidMount () {
    this.updateCities();  // after App first mounts, populate cities from db
  }
  updateCities() {
    $.ajax({
      method: 'GET',
      url: this.props.apiUrl + '/cities',
      success: cities => {
        let selectedCity = this.state.selectedCity; // default preserve existing selection
        if ((selectedCity.city === 'default cityname') && cities.length > 0) {
            // if we're at default & we read new cities...
          selectedCity = cities[0]; // ...then select 1st city we GET'd from db
          // how to re-route from js?
        }
        this.setState({
          cities: cities,
          selectedCity: selectedCity
        });
      }
    });
  }
  addNewPost(cityId, formData) { // create a new post
    let newPost = {
      title: $(formData.title).val(),
      text: $(formData.text).val(),
      user: this.state.user.name
    }
    $.ajax({
      method: 'POST',
      url: `${this.props.apiUrl}/cities/${cityId}/posts`,
      data: newPost,
      success: this.updateCities.bind(this)
    });
  }
  getCity(cityId) {
    let city = this.state.cities.reduce((prev, curr) => {
      return prev || (curr._id === cityId ? curr : null);
    }, null);
    return city || {  // set default if city === null
      city: 'default cityname',
      country: 'default country',
      image: '',
      description: 'default city description',
      posts: []
    }
  }
  getPost(cityId, postId) {
    return this.getCity(cityId).posts.reduce((prev, curr) => {
      return prev || (curr._id === postId ? curr : null);
    }, null);
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavContainer isLoggedIn={this.state.isLoggedIn} />
          <Switch>
            <Route path="/guest" render={(props) => <GuestContainer />} />
            <Route path="/cities/:cityId" render={(props) => {
              return (<CitiesContainer
                cities={this.state.cities}
                getCity={this.getCity.bind(this)}
                getPost={this.getPost.bind(this)}
                selectedCity={this.getCity(props.match.params.cityId)}
                addNewPost={this.addNewPost.bind(this)}
                isLoggedIn={this.isLoggedIn.bind(this)}
              />)}
            }/>
            <Route exact path="/" render={props => {
              const dest = (this.state.isLoggedIn
                ? `/cities/${this.state.selectedCity._id}`
                : "/guest");
              return <Redirect to={dest} />;
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
