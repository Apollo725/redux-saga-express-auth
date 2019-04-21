import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUserAction } from '../actions/authActions';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ isAuthenticated: nextProps.isAuthenticated });
    }
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
  }

  onHandleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onHandleRegistration = () => {
    const { name, email, password } = this.state;
    const data = { name, email, password };
    console.log('register Data', data);
    this.props.registerUserAction(data);
  }

  render() {
    const { isAuthenticated } = this.state;
    console.log('frontend register page', isAuthenticated);
    return (
      <div>
        <h3>Register Page</h3>
        {isAuthenticated && <Redirect to="/login" />}
        <div>
          <label>
              Name
            <input type="text" name="name" onChange={this.onHandleChange} />
          </label>
        </div>
        <br />
        <div>
          <label>
              Email
            <input type="email" name="email" onChange={this.onHandleChange} />
          </label>
        </div>
        <br />
        <div>
          <label>
              Password
            <input type="password" name="password" onChange={this.onHandleChange} />
          </label>
        </div>
        <br />
        <div>
          <button type="submit" onClick={this.onHandleRegistration}>Register</button>
        </div>
        {'Already have account?'}
        <br />
        <Link to="login">Login here</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerUserAction: bindActionCreators(registerUserAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterPage));
