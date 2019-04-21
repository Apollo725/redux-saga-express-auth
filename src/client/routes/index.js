import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '../container/App';
import RegisterPage from '../components/registerPage';
import LoginPage from '../components/loginPage';
import DashboardPage from '../components/dashboardPage';
import withAuth from '../utils/withAuth';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={withAuth(DashboardPage)} />
      </Switch>
    );
  }
}
export default Routes;
