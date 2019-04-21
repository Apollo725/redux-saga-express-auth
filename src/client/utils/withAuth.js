import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
// import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { checkToken } from '../actions/authActions';

export default function (ComposedComponent) {
  class withAuth extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // isAuthenticated: null,
      };
    }

    componentWillMount() {
      console.log('frontend componentwillMount:', localStorage.getItem('jwtToken'));
      // this.props.checkToken();
      if (!this.props.isAuthenticated) { this.props.history.push('/login'); }
      if (localStorage.getItem('jwtToken')) { this.props.history.push('/dashboard'); }
    }

    render() {
      const { isAuthenticated } = this.props;
      console.log('frontend withAuth', isAuthenticated);
      console.log('frontend withAuth Props', this.props.isAuthenticated);
      return (
        <div>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  withAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  function mapStateToProps(state) {
    console.log('frontend withAuth mapDispatchToProps: ', state);
    return {
      isAuthenticated: state.authReducer.isAuthenticated
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      checkToken: bindActionCreators(checkToken, dispatch)
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(withRouter(withAuth));
}
