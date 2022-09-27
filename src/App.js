import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import auth from './services/authService';
import Movies from './components/movies';
import Rentals from './components/rentals';
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/registerForm';
import Home from './components/home';
import Navbar from './components/common/navbar';
import ProtectedRoute from './components/common/protectedRoute';
import NotFound from './components/common/notFound';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {};

  componentDidMount() {
    console.log('component did mount...');
    const user = auth.getCurrentUser();
    console.log('user', user);
    this.setState({ user });
    setTimeout(() => console.log(this.state.user));
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <main className="container">
          <div className="col-12 m-3">
            {/* Can be used on all routes */}
            <Navbar user={user} />
          </div>
          <div className="content">
            <Switch>
              {/* Can use "exact" or "switch" to deal with paths that are similar */}
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              {/* ProtectedRoute is aware of the current  "user", so needn't repeate logic inside component tag */}
              {/* Prevent unauthorized users from adding movies via url "movies/new" etc. by redirecting via the following function */}
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              {/* Need to define arrow function below to pass props on route components. React will inject the props, history, match etc. */}
              <Route
                path="/movies"
                render={(props) => <Movies {...props} user={user} />}
              />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/movies/new" component={MovieForm} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/home" component={Home} />
              <Redirect from="/" to="/movies" exact />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
