import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import NavContainer from './head/NavContainer';
import GuestContainer from './components/GuestContainer';
import CitiesContainer from './components/CitiesContainer.js';
import ProfileContainer from './components/ProfileContainer.js';
import './App.css';
import $ from 'jquery-ajax';
//import {createBrowserHistory} from 'history';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Chris',
        hometown: 'Aiea',
        image: '../images/chrisF.jpg'
      },
      signUpUserName: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpPassWord:'',
      userName: '',
      isSignInOpen: false,
      isSignUpOpen: false,
      isLoggedIn : false,
      cities: [],
      showModal: false,
      newEditTitle: "",
      newEditDescription: "",
      selectedCity: { // to prevent code breakage, create dummy properties
        city: 'default cityname',
        country: 'default country',
        image: '',
        description: 'default city description',
        posts: []
      }
    };
  }

//sign up modal
  toggleSignUpModal = () => {
    this.setState({isSignUpOpen: !this.state.isSignUpOpen})
  }

  handleSignupSubmit = (event) => {
    $.ajax({
      method: "POST",
      url: "http://localhost:3001/signup",
      data: {
        first_name: this.state.signUpFirstName,
        last_name: this.state.signUpLastName,
        password: this.state.signUpPassWord,
        username: this.state.signUpUserName
      }
    })
    .then((res) => {
      console.log(res);
      this.toggleSignUpModal()
    },
    (err) => {
      alert('User already exists')
    })
  }

  componentDidMount() {
    this.updateCities(); // after App first mounts, populate cities from db
  }

  addNewPost(cityId, formData) { // create a new post
    let newPost = {
      title: $(formData.title).val(),
      text: $(formData.text).val(),
      user: this.state.user
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
    return city || { // set default if city === null
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

  toggleModal () {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleSubmitFromEdit = (event) => {
    event.preventDefault()
    this.toggleModal()
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

  putPost(event, cityId, postId){
    event.preventDefault()
    $.ajax({
      method: 'PUT',
      url: `${this.props.apiUrl}/cities/${cityId}/posts/${postId}`,
      data: {title: this.state.newEditTitle, text: this.state.newEditDescription},
      success: (city) => {
        console.log('PUT successful. we successfully updated:', city);
        this.updateCities();
      }
    })
    this.toggleModal();
  }

  destroyPost(cityId, postId) {
    $.ajax({
      method: 'DELETE',
      url: `${this.props.apiUrl}/cities/${cityId}/posts/${postId}`,
      success: this.updateCities.bind(this)
    })
  }

  onChange(event){
    let formId = $(event.target).closest('.validate').data('id-type')
    this.setState({[formId]: event.target.value});
  }
  getPost(cityId, postId) {
    return this.getCity(cityId).posts.reduce((prev, curr) => {
      return prev || (curr._id === postId ? curr : null);
    }, null);
  }

  login(name, password) {
    $.ajax({
      method: "POST",
      url: `${this.props.apiUrl}/login`,
      data: {
        name: name,
        password: password
      },
      success: user => {
        console.log('Congrats! You\'re logged in!', user);
        this.setState({isLoggedIn: true, user: user});
        console.log(this.props);
        this.props.history.push(`/cities/${this.state.selectedCity._id}`);
      },
      error: res => {
        alert('Sorry, authentication failed!');
      }
    })
  }
  logout () {
    console.log('logging out now...');
    this.setState({user: null, isLoggedIn: false});
    this.props.history.push('/guest');
  }

  render() {
  return (
    <div className="App">
      <NavContainer
        login={this.login.bind(this)}
        isLoggedIn={this.state.isLoggedIn}
        logout={this.logout.bind(this)}
        user={this.state.user}
        toggleSignUpModal={(event) => this.toggleSignUpModal(event)}
        handleSignupSubmit={(event) => this.handleSignupSubmit(event)}
        isSignUpOpen={this.state.isSignUpOpen}
      />
      <Switch>
        <Route path="/guest" render={(props) => <GuestContainer />} />
        <Route path="/cities" exact render={() => {
          console.log('hit /cities route, when selected is:', this.state.selectedCity._id);
          return <Redirect to={`/cities/${this.state.selectedCity._id}`} />
        }} />
        <Route path="/cities/:cityId" render={(props) => {
          return (<CitiesContainer
            cities={this.state.cities}
            getCity={this.getCity.bind(this)}
            getPost={this.getPost.bind(this)}
            selectedCity={this.getCity(props.match.params.cityId)}
            addNewPost={this.addNewPost.bind(this)}
            destroyPost={this.destroyPost.bind(this)}
            toggleModal={this.toggleModal.bind(this)}
            showModal={this.state.showModal}
            handleSubmit={this.putPost.bind(this)}
            newEditDescription={this.state.newEditDescription}
            newEditTitle={this.state.newEditTitle}
            onChange={this.onChange.bind(this)}
          />)}
        }/>
        <Route exact path="/" render={props => {
          const dest = (this.state.isLoggedIn
            ? "/cities"
            : "/guest");
          return <Redirect to={dest} />;
        }} />

        <Route path="/guest" render={(props) => <GuestContainer />} />

        <Route path="/profile" render={(props) => {
          return (<ProfileContainer
            user={this.state.user}
            />)
          }}/>

        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
