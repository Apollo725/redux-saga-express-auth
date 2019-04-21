import React, { Component } from 'react';
import './app.css';
import { Link } from 'react-router-dom';

class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <h3>Authentication System</h3>
        <Link to="/login"> Login </Link>
        <br />
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default App;