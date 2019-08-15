import React, { Component } from 'react';
import { Route, HashRouter, Link, Redirect, Switch } from 'react-router-dom';
import Login from '../Signin/Signin';
import Register from '../Signup/Signup';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import { logout } from '../../firebase/auths';
import { firebaseAuth } from '../../firebase/config';
import AppBar from '@material-ui/core/AppBar';
import FlatButton from '@material-ui/core/Button';


function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )}
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )}
    />
  );
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true
  };
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    const authButtons = this.state.authed ? (
      <FlatButton
        label="Logout"
        onClick={() => {
          logout();
        }}
        style={{ color: '#fff' }}
      />
    ) : (
      <span>
        <Link to="/login">
          <FlatButton label="Login" style={{ color: '#fff' }} />
        </Link>
        <Link to="/register">
          <FlatButton label="Register" style={{ color: '#fff' }} />
        </Link>
      </span>
    );

    const topbarButtons = (
      <div>
        <Link to="/">
          <FlatButton label="Home" style={{ color: '#fff' }} />
        </Link>
        <Link to="/dashboard">
          <FlatButton label="dashboard" style={{ color: '#fff' }} />
        </Link>
        {authButtons}
      </div>
    );
    return this.state.loading === true ? (
      <h1>Loading</h1>
    ) : (
      <HashRouter>
        <div>
          <AppBar
            title="My App"
            iconElementRight={topbarButtons}
            iconStyleRight={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0'
            }}
          />
          <div className="container d-flex justify-content-center mt-3">
            <div className="row">
              <Switch>
                <Route path="/" exact component={Home} />
                <PublicRoute
                  authed={this.state.authed}
                  path="/login"
                  component={Login}
                />
                <PublicRoute
                  authed={this.state.authed}
                  path="/register"
                  component={Register}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  path="/dashboard"
                  component={Dashboard}
                />*
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}
