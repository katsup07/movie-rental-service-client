/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import Joi, { log } from 'joi-browser';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from './common/form';
import auth from '../services/authService';

class loginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    console.log('loginForm doSubmit()');
    try {
      const { username: email, password } = this.state.data;
      await auth.login(email, password);
      toast.info('Logged in. Redirecting...', {
        autoClose: 2000,
      });
      const { state } = this.props.location;
      // window.location = '/' causes a full refresh, rather than a redirect with props.history.push(...). This will cause "componentDidMount()" to be called again
      setTimeout(() => {
        window.location = state ? state.from.pathname : '/';
      }, 2000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        toast.error('Invalid username or password');
        this.setState({ errors });
      }
    }
  };

  render() {
    // don't want user to see login form again once logged in
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default loginForm;

// ? Note - Could use a ref to get an element and do something with its data, but refs should be used only when necessary
// username = React.createRef();

// componentDidMount() {
//   this.username.current.focus();
// }

// ? Old validate() function
// validate = () => {

//   const { data } = this.state;
//   if (data.username.trim() === '')
//     errors.username = 'Username is required';
//   if (data.password.trim() === '')
//     errors.password = 'Password is required';

//   return Object.keys(errors).length === 0 ? null : errors;
// };

// ? Old validate() property
// validateProperty = ({ name, value }) => {
//   if (name === 'username') {
//     if (value.trim() === '') return 'Username is required';
//     // ... other rules
//   }

//   if (name === 'password') {
//     if (value.trim() === '') return 'Password is required';
//     // ... other rules
//   }
// };
