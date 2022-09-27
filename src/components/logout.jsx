import React, { Component } from 'react';
import { toast } from 'react-toastify';
import auth from '../services/authService';

class Logout extends Component {
  componentDidMount() {
    console.log('logging out');
    auth.logout();
    toast.info('Logged out. Redirecting...', { autoClose: 2000 });
    setTimeout(() => (window.location = '/'), 2000);
  }

  render() {
    return null;
    /*  <div>
        <h1>Logout</h1>
        <button type="button" onClick={this.logout}>
          Confirm
        </button>
      </div> */
  }
}

export default Logout;
