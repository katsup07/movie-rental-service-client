import React from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label('Username'),
    password: Joi.string().min(5).required().label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = async () => {
    // add some backend serverside code
    console.log('submitted to server');
    try {
      const { headers } = await userService.register(this.state.data);
      auth.loginWithJwt(headers['x-auth-token']);
      toast.info('User registered. Redirecting to home page...', {
        autoClose: 3300,
      });
      // window.location = '/' causes a full refresh, rather than a redirect with props.history.push(...). This will cause "componentDidMount()" to be called again
      setTimeout(() => (window.location = `/`), 3000);
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
