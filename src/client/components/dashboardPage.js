import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { logoutAction } from '../actions/authActions';

class dashboardPage extends Component {
  onHandleLogout = () => {
    this.props.logoutAction(this.props.history);
  }

  render() {
    return (
      <div>
        <h3>This is Dashboard!</h3>
        <button type="submit" onClick={this.onHandleLogout}>Log Out</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(withRouter(dashboardPage));
