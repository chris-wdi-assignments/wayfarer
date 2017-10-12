import React, { Component } from 'react';
import {browserHistory} from 'react-router-dom';
import $ from 'jquery-ajax';
import Modal from 'react-bootstrap-modal';

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      password: '',
      hometown: ''
    };
  }

  handleUsernameChange(e){
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  render() {
    return(
      <Modal show={this.props.isSignUpOpen} onHide={this.props.closeModal}>

        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">
            Signup
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={e => {
          e.preventDefault();
          this.props.handleSignupSubmit(this.state.name, this.state.password, this.state.image, this.state.hometown);
          this.setState({name: '', password: '', image:'', hometown: ''});
          this.props.closeModal();
        }}>

        <Modal.Body>
          <div className='form-group'>
            <label htmlFor='recipient-name' className='control-label'>Username
              <input name='name' type='text'
                className='form-control'
                onChange={(e)=> this.setState({name:e.target.value})}
              />
            </label>
          </div>

        <div className='form-group'>
          <label className='control-label'>Create Password
            <input username='password' type='password'
              className='form-control'
              onChange={e=>this.setState({password: e.target.value})}
            />
          </label>
        </div>

        </Modal.Body>

        <Modal.Footer>
          <button type='submit' className='btn btn-primary'>Create Account</button>
        </Modal.Footer>

        </form>
      </Modal>
    )
  }
}

export default SignupModal;
