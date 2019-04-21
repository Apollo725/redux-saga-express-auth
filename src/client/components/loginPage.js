import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUserAction } from '../actions/authActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAuthenticated: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.setState({ isAuthenticated: nextProps.isAuthenticated });
    }
  }

  onHandleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onHandleLogin = () => {
    const { email, password } = this.state;
    const data = { email, password };
    this.props.loginUserAction(data);
  }

  render() {
    const { isAuthenticated } = this.state;
    console.log('login frontend:', isAuthenticated);
    return (
      <div>
        <h3>Login Page</h3>
        {isAuthenticated && <Redirect to="/dashboard" />}
        <div>
          <label>
              Email
          </label>
          <input type="email" name="email" onChange={this.onHandleChange} />
        </div>
        <br />
        <div>
          <label>
              Password
          </label>
          <input type="password" name="password" onChange={this.onHandleChange} />
        </div>
        <br />
        <div>
          <button type="submit" onClick={this.onHandleLogin}>Login</button>
        </div>
        {'Don\'t have account?'}
        <br />
        <Link to="register">Register here</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('frontend login mapStateToProps:', state);
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUserAction: bindActionCreators(loginUserAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
